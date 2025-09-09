import { Request, Response } from "express";
import PostService from "./postService";
import validate from "../utils/validate";
import postSchema from "./postSchema";
import FileService from "../services/FileService";
import Config from "../utils/config";
import File from "../utils/file";
import TokenService from "../utils/jwt";

const FILE_POST_PATH = Config.FILE_POST_PATH;

class PostController {
  async getPostByIdController(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const idPost = Number(id);
      const result = await PostService.getPostById(idPost);
      if (!result)
        return res
          .status(404)
          .json({ message: "Новости или акции не найдены" });
      return res.status(200).json(result);
    } catch (error) {
      console.error("error getPostByIdNewController: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAllPostsController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { page = 1, offset = 12 } = req.query;
      const idType = Number(id);
      const pageNumber = Number(page);
      const offsetNumber = Number(offset);

      if (isNaN(pageNumber) || isNaN(offsetNumber)) {
        return res.status(400).json({ message: "Некорректные параметры" });
      }

      const authHeader = req.headers.authorization;

      let isAdmin = false;

      if (authHeader) {
        const resultToken = TokenService.getTokenData(authHeader);
        if (resultToken === false) {
          return res.status(400).json({ message: "Invalid or missing token" });
        }
        const roles = resultToken.r || [];
        isAdmin = roles.some((role: any) => role.role_name === "ADMIN");
      }

      const result = await PostService.getAllPosts(
        idType,
        pageNumber,
        offsetNumber,
        isAdmin
      );

      if (!result) {
        return res.status(404).json({ message: "Новости не найдены" });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("error getAllPostsNewController: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createController(req: Request, res: Response) {
    try {
      const contents: {
        description_ru: string | null;
        description_ky: string | null;
        description_en: string | null;
        images: string[];
      }[] = [];
      const mainImages: string[] = [];

      req.body.contents = contents;

      const isValid = validate(req.body, postSchema.postNewSchema);
      if (!isValid) return res.status(400).json({ message: "Неверный формат" });

      // Сохраняем главные изображения (field name: "main_images")
      const mainFiles = req.files?.["main_images"];
      if (mainFiles) {
        const mainArray = Array.isArray(mainFiles) ? mainFiles : [mainFiles];

        for (const file of mainArray) {
          const result = await FileService.saveFile({
            path: FILE_POST_PATH,
            fileName: file.name,
            sampleFile: file,
            type: "image",
          });
          if (!result.error) mainImages.push(result.dbFileName);
        }
      }

      // Обработка contents: descriptions (по локалям) + images
      for (let i = 0; ; i++) {
        const descRuKey = `contents[${i}][description_ru]`;
        const descKyKey = `contents[${i}][description_ky]`;
        const descEnKey = `contents[${i}][description_en]`;

        if (
          !(
            descRuKey in req.body ||
            descKyKey in req.body ||
            descEnKey in req.body
          )
        )
          break;

        const description_ru = req.body[descRuKey]?.trim() || null;
        const description_ky = req.body[descKyKey]?.trim() || null;
        const description_en = req.body[descEnKey]?.trim() || null;

        if (!description_ru && !description_ky && !description_en) {
          return res
            .status(400)
            .json({ message: "Хотя бы одно описание должно быть заполнено" });
        }

        const imageKey = `images_${i}`;
        const imageFiles = req.files?.[imageKey];
        const imageList: string[] = [];

        if (Array.isArray(imageFiles)) {
          for (const file of imageFiles) {
            const result = await FileService.saveFile({
              path: FILE_POST_PATH,
              fileName: file.name,
              sampleFile: file,
              type: "image",
            });
            if (!result.error) imageList.push(result.dbFileName);
          }
        } else if (imageFiles) {
          const result = await FileService.saveFile({
            path: FILE_POST_PATH,
            fileName: imageFiles.name,
            sampleFile: imageFiles,
            type: "image",
          });
          if (!result.error) imageList.push(result.dbFileName);
        }

        contents.push({
          description_ru,
          description_ky,
          description_en,
          images: imageList,
        });
      }

      if (contents.length === 0 && mainImages.length === 0) {
        return res.status(400).json({
          message: "Нужно минимум одно описание или главное изображение",
        });
      }

      const { id_type, title_ru, title_ky, title_en, date } = req.body;

      if (!title_ru && !title_ky && !title_en) {
        return res.status(400).json({ message: "Нужно минимум одно название" });
      }

      const idType = Number(id_type);
      const idUser = Number(req.user?.id);
      if (!idUser) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }

      const postDate = date ? date : new Date().toISOString();

      const result = await PostService.create(
        idType,
        title_ru?.trim() || null,
        title_ky?.trim() || null,
        title_en?.trim() || null,
        postDate,
        contents,
        mainImages
      );

      if (!result) {
        return res.status(500).json({ message: "Ошибка создания поста" });
      }

      return res.status(200).json({ message: "Пост успешно создан", result });
    } catch (error: any) {
      console.error("Ошибка в createNewController: ", error.message);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async showImage(req: Request, res: Response) {
    try {
      const fileName = req.params.fileName;
      const path = FILE_POST_PATH + fileName;
      const existFile = await File.exists(path);
      console.log(await File.exists(path));
      if (existFile) return res.sendFile(path);
      else return res.status(400).json({ message: "Файл не найден" });
    } catch (error) {
      console.log("error showFile: ", error.message);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async deletePost(req: Request, res: Response) {
    const { id_post } = req.params;

    if (isNaN(Number(id_post))) {
      return res.status(400).json({ message: "Неверный формат ID" });
    }

    const result = await PostService.deletePostById(Number(id_post));

    if (result) {
      return res.status(200).json({ message: "Успешно удалено" });
    } else {
      return res.status(500).json({ message: "Ошибка при удалении" });
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const { id_post } = req.params;
      const data = req.body;

      if (isNaN(Number(id_post))) {
        return res.status(400).json({ message: "Неверный формат ID" });
      }

      if (
        data.contents_to_update &&
        typeof data.contents_to_update === "string"
      ) {
        try {
          data.contents_to_update = JSON.parse(data.contents_to_update);
          data.contents_to_update = PostService.parseArrayField(
            data.contents_to_update
          );
        } catch (e) {
          console.warn("⚠️ Не удалось распарсить contents_to_update:", e);
          data.contents_to_update = [];
        }
      }

      data.images_to_delete = data.images_to_delete
        ? PostService.parseArrayField(data.images_to_delete)
        : [];

      data.contents_to_delete = data.contents_to_delete
        ? PostService.parseArrayField(data.contents_to_delete)
        : [];

      data.new_contents = data.new_contents
        ? PostService.parseArrayField(data.new_contents)
        : [];

      data.main_image_to_delete = data.main_image_to_delete
        ? PostService.parseArrayField(data.main_image_to_delete)
        : [];

      if (data.date && isNaN(Date.parse(data.date))) {
        return res.status(400).json({ message: "Неверный формат даты" });
      }

      const filesMap: Record<string, any[]> = {};
      if (req.files) {
        for (const [fieldName, value] of Object.entries(req.files)) {
          const filesArray = Array.isArray(value) ? value : [value];
          filesMap[fieldName] = filesArray;
        }
      }

      const processImages = async (files: any[]) => {
        const resultImages = [];
        for (const file of files) {
          const result = await FileService.saveFile({
            path: FILE_POST_PATH,
            fileName: file.name,
            sampleFile: file,
            type: "image",
          });

          if (result.error) throw new Error("Ошибка загрузки изображения");

          resultImages.push({ image_name: result.dbFileName });
        }
        return resultImages;
      };

      // Обработка изображений для обновляемых descriptions
      if (Array.isArray(data.contents_to_update)) {
        for (let i = 0; i < data.contents_to_update.length; i++) {
          const contentKey = `update_${i}`;
          const files = filesMap[contentKey];
          if (files) {
            const images = await processImages(files);
            data.contents_to_update[i].images = images;
          }
        }
      }

      // Обработка изображений для новых descriptions
      if (Array.isArray(data.new_contents)) {
        for (let i = 0; i < data.new_contents.length; i++) {
          const contentKey = `new_${i}`;
          const files = filesMap[contentKey];
          if (files) {
            const images = await processImages(files);
            data.new_contents[i].images = images;
          }
        }
      }

      // Обработка новых главных изображений
      const uploadedMainImages: string[] = [];
      if (req.files && req.files.main_images) {
        const mainImagesArray = Array.isArray(req.files.main_images)
          ? req.files.main_images
          : [req.files.main_images];

        for (const file of mainImagesArray) {
          const result = await FileService.saveFile({
            path: FILE_POST_PATH,
            fileName: file.name,
            sampleFile: file,
            type: "image",
          });

          if (result.error) {
            return res
              .status(400)
              .json({ message: "Ошибка загрузки главного изображения" });
          }

          uploadedMainImages.push(result.dbFileName);
        }

        data.new_main_image = uploadedMainImages.map((imageNames) => ({
          image_name: imageNames,
        }));
      }

      // 🔥 Сохраняем пост и получаем возможные новые content IDs
      const result = await PostService.updatePostById(Number(id_post), data);

      if (result?.success) {
        return res.status(200).json({
          message: "Пост успешно обновлён",
          newContentIds: result.newContentIds || [],
        });
      } else {
        return res.status(500).json({ message: "Ошибка при обновлении поста" });
      }
    } catch (error) {
      console.error("Ошибка в updatePostNew:", error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
}

export default new PostController();
