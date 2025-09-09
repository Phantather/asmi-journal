import { Request, Response } from "express";
import BannerService from "./bannerService";
import FileService from "../services/FileService";
import Config from "../utils/config";
import File from "../utils/file";

const FILE_BANNER_PATH = Config.FILE_BANNER_PATH;

class BannerController {
  async saveBannerController(req: Request, res: Response) {
    try {
      const { title_ru, title_ky, title_en } = req.body;

      let uploadedImage: string | null = null;

      if (req.files?.image) {
        const imageFile = Array.isArray(req.files.image)
          ? req.files.image[0]
          : req.files.image;

        const result = await FileService.saveFile({
          path: FILE_BANNER_PATH,
          fileName: imageFile.name,
          sampleFile: imageFile,
          type: "image",
        });

        if (result.error) {
          return res
            .status(400)
            .json({ message: "Ошибка загрузки изображения" });
        }

        uploadedImage = result.dbFileName;
      }

      const data = await BannerService.saveBanner(
        title_ru,
        title_ky,
        title_en,
        uploadedImage
      );
      if (!data) {
        return res.status(404).json({ message: "Ошибка создания баннера" });
      }

      return res.status(200).json({ message: "Баннер успешно создан", data });
    } catch (error) {
      console.error("Ошибка в saveBannerController: ", error.message);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async getBannerController(_req: Request, res: Response) {
    try {
      const data = await BannerService.getBanner();
      if (!data) {
        return res.status(404).json({ message: "Ошибка получения баннера" });
      }
      return res.status(200).json({ message: "Успешно", data });
    } catch (error) {
      console.error("Ошибка в getBannerController: ", error.message);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async showImage(req: Request, res: Response) {
    try {
      const fileName = req.params.fileName;
      const path = FILE_BANNER_PATH + fileName;
      const existFile = await File.exists(path);
      console.log(await File.exists(path));
      if (existFile) return res.sendFile(path);
      else return res.status(400).json({ message: "Файл не найден" });
    } catch (error) {
      console.log("error showFile: ", error.message);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async deleteBannerController(req: Request, res: Response) {
    try {
      const { id_banner } = req.query;

      const existIdGuideFiles = await BannerService.existIdBanner(
        Number(id_banner)
      );
      if (!existIdGuideFiles)
        return res.status(400).json({ message: "По такой id нет данных" });

      const data = await BannerService.deleteBanner(Number(id_banner));
      if (!data) {
        return res.status(404).json({ message: "Ошибка удаления баннера" });
      }
      return res.status(200).json({ message: "Успешно удалено" });
    } catch (error) {
      console.error("Ошибка в getBannerController: ", error.message);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async updateBannerController(req: Request, res: Response) {
    try {
      const { id_banner } = req.query;
      const { title_ru, title_ky, title_en } = req.body;
      if (!id_banner) {
        return res.status(400).json({ message: "ID обязателен" });
      }

      const existIdGuideFiles = await BannerService.existIdBanner(
        Number(id_banner)
      );
      if (!existIdGuideFiles)
        return res.status(400).json({ message: "По такой id нет данных" });

      let newImage: string | undefined = undefined;

      if (req.files?.image) {
        const imageFile = Array.isArray(req.files.image)
          ? req.files.image[0]
          : req.files.image;
        const result = await FileService.saveFile({
          path: FILE_BANNER_PATH,
          fileName: imageFile.name,
          sampleFile: imageFile,
          type: "image",
        });

        if (result.error) {
          return res
            .status(400)
            .json({ message: "Ошибка загрузки изображения" });
        }
        newImage = result.dbFileName;
      }

      const updateResult = await BannerService.updateBanner(
        Number(id_banner),
        title_ru,
        title_ky,
        title_en,
        newImage
      );

      if (!updateResult) {
        return res
          .status(400)
          .json({ message: "Ошибка обновления файлов в БД" });
      }

      return res
        .status(200)
        .json({ message: "Успешно обновлено", updateResult });
    } catch (error) {
      console.error("Ошибка в updateVehicleFilesController: ", error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
}

export default new BannerController();
