import path from "path";
import Config from "../utils/config";
import db from "../utils/db";
import fs from "fs";

const ALLOW_HOST_FILE = Config.ALLOW_HOST_FILE;
const FILE_POST_URL = Config.FILE_POST_URL;
const FILE_POST_PATH = Config.FILE_POST_PATH;

async function getPostById(id_post: number) {
  try {
    const { error, rows } = await db.query(
      `SELECT 
         p.id AS post_id, 
         p.id_type, 
         pt.type_name,

         p.title_ru,
         p.title_ky,
         p.title_en,

         p.description_ru AS post_description_ru,
         p.description_ky AS post_description_ky,
         p.description_en AS post_description_en,

         p.date, 
         p.updated_at, 
         p.active,

         pc.id AS content_id,
         pc.description_ru AS content_description_ru,
         pc.description_ky AS content_description_ky,
         pc.description_en AS content_description_en,

         pci.id AS content_image_id, 
         pci.image_name AS content_image_name,

         img.id_image AS main_image_id,
         img.image_name AS main_image_name

       FROM post p
       JOIN post_type pt ON pt.id_post_type = p.id_type
       LEFT JOIN post_content pc ON pc.id_post = p.id
       LEFT JOIN post_content_image pci ON pci.id_post_content = pc.id
       LEFT JOIN image img ON img.id_post = p.id
       WHERE p.id = $1;`,
      [id_post]
    );

    if (error || rows.length === 0) {
      return false;
    }

    // Контент: группировка по content_id
    const contentMap: {
      [key: string]: {
        id: number;
        description: { ru: string | null; ky: string | null; en: string | null };
        images: { id: number; name: string; url: string }[];
      };
    } = {};

    const mainImageMap = new Map<number, { id: number; url: string }>();

    rows.forEach((row) => {
      // Контент
      if (row.content_id) {
        if (!contentMap[row.content_id]) {
          contentMap[row.content_id] = {
            id: row.content_id,
            description: {
              ru: row.content_description_ru,
              ky: row.content_description_ky,
              en: row.content_description_en,
            },
            images: [],
          };
        }

        if (row.content_image_id && row.content_image_name) {
          const alreadyExists = contentMap[row.content_id].images.some(
            (img) => img.id === row.content_image_id
          );

          if (!alreadyExists) {
            contentMap[row.content_id].images.push({
              id: row.content_image_id,
              name: row.content_image_name,
              url: `${ALLOW_HOST_FILE}${FILE_POST_URL}image-${row.content_image_name}`,
            });
          }
        }
      }

      // Главные изображения
      if (row.main_image_id && row.main_image_name) {
        if (!mainImageMap.has(row.main_image_id)) {
          mainImageMap.set(row.main_image_id, {
            id: row.main_image_id,
            url: `${ALLOW_HOST_FILE}${FILE_POST_URL}image-${row.main_image_name}`,
          });
        }
      }
    });

    const content = Object.values(contentMap);
    const main_images = Array.from(mainImageMap.values());

    // Финальный объект поста
    const post = {
      id: rows[0].post_id,
      id_type: rows[0].id_type,
      type_name: rows[0].type_name,

      title: {
        ru: rows[0].title_ru,
        ky: rows[0].title_ky,
        en: rows[0].title_en,
      },
      description: {
        ru: rows[0].post_description_ru,
        ky: rows[0].post_description_ky,
        en: rows[0].post_description_en,
      },

      date: rows[0].date,
      updated_at: rows[0].updated_at,
      active: rows[0].active,

      main_images,
      content,
    };

    return post;
  } catch (error: any) {
    console.error("error getPostById:", error.message);
    return false;
  }
}

async function getAllPosts(
  id_type: number,
  page: number,
  offset: number,
  isAdmin: boolean
) {
  try {
    const limit = offset;
    const offsetValue = (page - 1) * offset;

    // Считаем общее количество
    const { error: countError, rows: countRows } = await db.query(
      `SELECT COUNT(*) AS total
       FROM post 
       WHERE id_type = $1
         ${isAdmin ? "" : "AND active = true"};`,
      [id_type]
    );

    if (countError || countRows.length === 0) {
      return false;
    }

    const total = parseInt(countRows[0].total, 10);

    // Достаём посты
    const { error, rows } = await db.query(
      `SELECT 
          p.id, 
          p.id_type, 
          pt.type_name,
          p.title_ru,
          p.title_ky,
          p.title_en,
          p.description_ru,
          p.description_ky,
          p.description_en,
          p."date", 
          p.updated_at, 
          p.active,
          (SELECT i.image_name 
           FROM image i 
           WHERE i.id_post = p.id 
           ORDER BY i.id_image ASC 
           LIMIT 1) AS image_name
        FROM post p
        LEFT JOIN post_type pt ON pt.id_post_type = p.id_type
        WHERE p.id_type = $1
          ${isAdmin ? "" : "AND p.active = true"}  
        ORDER BY p.updated_at DESC
        LIMIT $2 OFFSET $3;`,
      [id_type, limit, offsetValue]
    );

    if (error) {
      return false;
    }

    // Формируем красивый ответ
    const posts = rows.map((post: any) => ({
      id: post.id,
      id_type: post.id_type,
      type_name: post.type_name,
      title: {
        ru: post.title_ru,
        ky: post.title_ky,
        en: post.title_en,
      },
      description: {
        ru: post.description_ru,
        ky: post.description_ky,
        en: post.description_en,
      },
      date: post.date,
      updated_at: post.updated_at,
      active: post.active,
      image_name: post.image_name
        ? `${ALLOW_HOST_FILE}${FILE_POST_URL}image-${post.image_name}`
        : null,
    }));

    return {
      data: posts,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error: any) {
    console.log("error getAllPosts: ", error.message);
    return false;
  }
}

async function create(
  id_type: number,
  title_ru: string,
  title_ky: string,
  title_en: string,
  date: string,
  contents: {
    description_ru: string | null;
    description_ky: string | null;
    description_en: string | null;
    images: string[];
  }[],
  main_images: string[]
) {
  try {
    const { error, rows } = await db.query(
      `CALL p_insert_post($1::int, $2::varchar, $3::varchar, $4::varchar, $5::timestamp, $6::jsonb, $7::text[]);`,
      [
        id_type,
        title_ru,
        title_ky,
        title_en,
        date,
        JSON.stringify(contents),
        main_images,
      ]
    );

    if (error) {
      console.error("Ошибка при создании поста:", error);
      return false;
    }

    return rows;
  } catch (error: any) {
    console.error("Ошибка в create:", error.message);
    return false;
  }
}

async function deletePostById(id_post: number) {
  try {
    // Получаем изображения из post_content_image
    const { rows: contentImages } = await db.query(
      `SELECT image_name FROM post_content_image WHERE id_post_content IN 
       (SELECT id FROM post_content WHERE id_post = $1)`,
      [id_post]
    );

    // Получаем главные изображения из image
    const { rows: mainImages } = await db.query(
      `SELECT image_name FROM image WHERE id_post = $1`,
      [id_post]
    );

    const allImages = [...contentImages, ...mainImages];

    // Удаляем физические файлы
    await Promise.all(
      allImages.map(async (image: any) => {
        const imagePath = path.join(
          `${FILE_POST_PATH}image-${image.image_name}`
        );
        if (fs.existsSync(imagePath)) {
          try {
            await fs.promises.unlink(imagePath);
          } catch (err) {
            console.error(`Ошибка удаления файла ${image.image_name}:`, err);
          }
        }
      })
    );

    // Удаляем записи из image
    await db.query(`DELETE FROM image WHERE id_post = $1`, [id_post]);

    // Удаляем записи из post_content_image
    await db.query(
      `DELETE FROM post_content_image WHERE id_post_content IN 
       (SELECT id FROM post_content WHERE id_post = $1)`,
      [id_post]
    );

    // Удаляем записи из post_content
    await db.query(`DELETE FROM post_content WHERE id_post = $1`, [id_post]);

    // Удаляем сам пост
    await db.query(`DELETE FROM post WHERE id = $1`, [id_post]);

    return true;
  } catch (error: any) {
    console.error("Ошибка при удалении поста и изображений:", error.message);
    return false;
  }
}

async function updatePostById(id_post: number, data: any) {
  try {
    const {
      title_ru,
      title_ky,
      title_en,
      id_type,
      date,
      active,
      images_to_delete,
      main_image_to_delete,
      new_main_image,
      contents_to_update,
      contents_to_delete,
      new_contents,
    } = data;

    const updateFields: string[] = [];
    const updateValues: any[] = [];

    // Обновление заголовка, типа и даты
    if (title_ru !== undefined) {
      updateFields.push(`title_ru = $${updateValues.length + 1}`);
      updateValues.push(title_ru);
    }

    if (title_ky !== undefined) {
      updateFields.push(`title_ky = $${updateValues.length + 1}`);
      updateValues.push(title_ky);
    }

    if (title_en !== undefined) {
      updateFields.push(`title_en = $${updateValues.length + 1}`);
      updateValues.push(title_en);
    }

    if (id_type !== undefined) {
      updateFields.push(`id_type = $${updateValues.length + 1}`);
      updateValues.push(id_type);
    }

    if (date !== undefined) {
      updateFields.push(`"date" = $${updateValues.length + 1}`);
      updateValues.push(date);
    }

    // Обновление флага активности
    const activeValue = active === "false" ? false : active || true;
    updateFields.push(`active = $${updateValues.length + 1}`);
    updateValues.push(activeValue);

    if (updateFields.length > 0) {
      await db.query(
        `UPDATE post SET ${updateFields.join(", ")} WHERE id = $${
          updateValues.length + 1
        }`,
        [...updateValues, id_post]
      );
    }

    // Удаление изображений из описаний
    if (images_to_delete && images_to_delete.length > 0) {
      const result = await db.query(
        `SELECT image_name FROM post_content_image WHERE id = ANY($1)`,
        [images_to_delete]
      );

      for (const img of result.rows) {
        const imgPath = path.join(`${FILE_POST_PATH}image-${img.image_name}`);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }

      await db.query(`DELETE FROM post_content_image WHERE id = ANY($1)`, [
        images_to_delete,
      ]);
    }

    // Удаление главных изображений
    if (main_image_to_delete && main_image_to_delete.length > 0) {
      const { rows } = await db.query(
        `SELECT image_name FROM image WHERE id_image = ANY($1) AND id_post = $2`,
        [main_image_to_delete, id_post]
      );

      for (const row of rows) {
        const imgPath = path.join(`${FILE_POST_PATH}image-${row.image_name}`);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }

      await db.query(
        `DELETE FROM image WHERE id_image = ANY($1) AND id_post = $2`,
        [main_image_to_delete, id_post]
      );
    }

    // Добавление новых главных изображений
    if (new_main_image && Array.isArray(new_main_image)) {
      const insertQueries = new_main_image.map((img: any) =>
        db.query(`INSERT INTO image (id_post, image_name) VALUES ($1, $2)`, [
          id_post,
          img.image_name,
        ])
      );
      await Promise.all(insertQueries);
    }

    // // Обновление описаний
    // if (contents_to_update && contents_to_update.length > 0) {
    //   for (const content of contents_to_update) {
    //     const { id_content, description, images } = content;

    //     if (description !== undefined) {
    //       await db.query(
    //         `UPDATE post_content SET description = $1 WHERE id = $2 AND id_post = $3`,
    //         [description, id_content, id_post]
    //       );
    //     }

    //     if (images && images.length > 0) {
    //       const insertImageQueries = images.map((img: any) =>
    //         db.query(
    //           `INSERT INTO post_content_image (id_post_content, image_name) VALUES ($1, $2)`,
    //           [id_content, img.image_name]
    //         )
    //       );
    //       await Promise.all(insertImageQueries);
    //     }
    //   }
    // }

    // Удаление описаний и всех их картинок
    if (contents_to_update && contents_to_update.length > 0) {
      for (const content of contents_to_update) {
        const {
          id_content,
          description_ru,
          description_ky,
          description_en,
          images,
        } = content;

        const updateFields: string[] = [];
        const updateValues: any[] = [];

        if (description_ru !== undefined) {
          updateFields.push(`description_ru = $${updateValues.length + 1}`);
          updateValues.push(description_ru);
        }
        if (description_ky !== undefined) {
          updateFields.push(`description_ky = $${updateValues.length + 1}`);
          updateValues.push(description_ky);
        }
        if (description_en !== undefined) {
          updateFields.push(`description_en = $${updateValues.length + 1}`);
          updateValues.push(description_en);
        }

        if (updateFields.length > 0) {
          updateValues.push(id_content, id_post);
          await db.query(
            `UPDATE post_content SET ${updateFields.join(", ")} WHERE id = $${
              updateValues.length - 1
            } AND id_post = $${updateValues.length}`,
            updateValues
          );
        }

        if (images && images.length > 0) {
          const insertImageQueries = images.map((img: any) =>
            db.query(
              `INSERT INTO post_content_image (id_post_content, image_name) VALUES ($1, $2)`,
              [id_content, img.image_name]
            )
          );
          await Promise.all(insertImageQueries);
        }
      }
    }

    // Удаление описаний и всех их картинок остаётся без изменений
    if (contents_to_delete && contents_to_delete.length > 0) {
      for (const id_content of contents_to_delete) {
        const result = await db.query(
          `SELECT image_name FROM post_content_image WHERE id_post_content = $1`,
          [id_content]
        );

        for (const img of result.rows) {
          const imgPath = path.join(`${FILE_POST_PATH}image-${img.image_name}`);
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }

        await db.query(
          `DELETE FROM post_content_image WHERE id_post_content = $1`,
          [id_content]
        );

        await db.query(
          `DELETE FROM post_content WHERE id = $1 AND id_post = $2`,
          [id_content, id_post]
        );
      }
    }

    // Список новых content id по индексам
    const newContentIds: { index: number; id_post_content: number }[] = [];

    // Добавление новых описаний с локализацией
    if (new_contents && new_contents.length > 0) {
      for (const [index, content] of new_contents.entries()) {
        const { description_ru, description_ky, description_en, images } =
          content;

        const result = await db.query(
          `INSERT INTO post_content (id_post, description_ru, description_ky, description_en, content_order) 
           VALUES ($1, $2, $3, $4, $5) RETURNING id`,
          [
            id_post,
            description_ru || "",
            description_ky || "",
            description_en || "",
            index,
          ]
        );

        const id_post_content = result.rows[0].id;
        newContentIds.push({ index, id_post_content });

        if (images && images.length > 0) {
          const insertImageQueries = images.map((img: any) =>
            db.query(
              `INSERT INTO post_content_image (id_post_content, image_name) 
               VALUES ($1, $2)`,
              [id_post_content, img.image_name]
            )
          );
          await Promise.all(insertImageQueries);
        }
      }
    }

    // Синхронизация первого описания с post.description
    const { rows: firstContentRows } = await db.query(
      `SELECT description_ru, description_ky, description_en
        FROM post_content
        WHERE id_post = $1
        ORDER BY id ASC
        LIMIT 1`,
      [id_post]
    );

    if (firstContentRows.length > 0) {
      const firstContent = firstContentRows[0];
      await db.query(
        `UPDATE post 
          SET description_ru = $1, description_ky = $2, description_en = $3
          WHERE id = $4`,
        [
          firstContent.description_ru,
          firstContent.description_ky,
          firstContent.description_en,
          id_post,
        ]
      );
    }

    // Возвращаем не просто успех, но и id новых описаний
    return { success: true, newContentIds };
  } catch (error) {
    console.error("Error updating post:", error);
    return { success: false };
  }
}

function parseArrayField<T = any>(field: any): T[] {
  if (!field) return [];

  if (Array.isArray(field)) {
    return field;
  }

  if (typeof field === "string") {
    if (field.trim().startsWith("[")) {
      try {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error("Ошибка парсинга JSON:", e);
        return [];
      }
    }

    // Если строка без скобок — значит, скорее всего числа через запятую
    return field
      .split(",")
      .map((el) => Number(el.trim()))
      .filter((el) => !isNaN(el)) as any[];
  }

  return [];
}

const PostService = {
  getPostById,
  getAllPosts,
  create,
  deletePostById,
  updatePostById,
  parseArrayField,
};

export default PostService;
