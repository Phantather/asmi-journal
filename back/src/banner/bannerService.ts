import Config from "../utils/config";
import db from "../utils/db";
import path from "path";
import fs from "fs";

const ALLOW_HOST_FILE = Config.ALLOW_HOST_FILE;
const FILE_BANNER_URL = Config.FILE_BANNER_URL;
const FILE_BANNER_PATH = Config.FILE_BANNER_PATH;

async function saveBanner(
  title_ru: string | null,
  title_ky: string | null,
  title_en: string | null,
  image: string | null
) {
  try {
    const { error, rows } = await db.query(
      `INSERT INTO banner(title_ru, title_ky, title_en, image)
       VALUES($1, $2, $3, $4)
       RETURNING *;`,
      [title_ru, title_ky, title_en, image]
    );
    return error ? false : rows;
  } catch (error) {
    console.log("error saveBanner: ", error.message);
    return false;
  }
}

async function getBanner() {
  try {
    const { error, rows } = await db.query(
      `SELECT id_banner, title_ru, title_ky, title_en, image FROM banner ORDER BY id_banner;`,
      []
    );
    if (error) return false;

    const data = rows.map((row: any) => ({
      id_banner: row.id_banner,
      banner_title_ru: row.title_ru,
      banner_title_ky: row.title_ky,
      banner_title_en: row.title_en,
      banner_url: row.image
        ? `${ALLOW_HOST_FILE}${FILE_BANNER_URL}image-${row.image}`
        : null,
    }));
    return data;
  } catch (error) {
    console.log("error getBanner: ", error.message);
    return false;
  }
}

async function updateBanner(
  id_banner: number,
  title_ru?: string,
  title_ky?: string,
  title_en?: string,
  image?: string
) {
  try {
    const { error, rows } = await db.query(
      `SELECT title_ru, title_ky, title_en, image FROM banner WHERE id_banner = $1;`,
      [id_banner]
    );
    if (error || rows.length === 0) return false;

    const oldBanner = rows[0];

    if (image && oldBanner.image) {
      const oldImagePath = path.join(
        `${FILE_BANNER_PATH}image-${oldBanner.image}`
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedTitleRu =
      title_ru !== undefined ? title_ru : oldBanner.title_ru;
    const updatedTitleKy =
      title_ky !== undefined ? title_ky : oldBanner.title_ky;
    const updatedTitleEn =
      title_en !== undefined ? title_en : oldBanner.title_en;
    const updatedImage = image !== undefined ? image : oldBanner.image;

    const { error: updateError } = await db.query(
      `UPDATE banner SET title_ru = $1, title_ky = $2, title_en = $3, image = $4 WHERE id_banner = $5;`,
      [updatedTitleRu, updatedTitleKy, updatedTitleEn, updatedImage, id_banner]
    );
    if (updateError) return false;

    return true;
  } catch (error) {
    console.log("error updateBanner: ", error.message);
    return false;
  }
}

async function existIdBanner(id_banner: number) {
  try {
    const { error, rows } = await db.query(
      `SELECT EXISTS(SELECT * FROM banner WHERE id_banner = $1)`,
      [id_banner]
    );

    if (error) {
      return false;
    }
    return rows[0].exists;
  } catch (error) {
    console.error("Ошибка existIdBanner: ", error.message);
    return null;
  }
}

async function deleteBanner(id_banner: number) {
  try {
    const { error: selectError, rows } = await db.query(
      `SELECT image FROM banner WHERE id_banner = $1;`,
      [id_banner]
    );

    if (selectError || rows.length === 0) {
      return false;
    }

    const oldImage = rows[0].image;

    if (oldImage) {
      const oldImagePath = path.join(`${FILE_BANNER_PATH}image-${oldImage}`);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const { error: deleteError } = await db.query(
      `DELETE FROM banner WHERE id_banner = $1;`,
      [id_banner]
    );

    return deleteError ? false : true;
  } catch (error) {
    console.log("Ошибка deleteBanner: ", error.message);
    return false;
  }
}

const BannerService = {
  saveBanner,
  getBanner,
  updateBanner,
  deleteBanner,
  existIdBanner,
};

export default BannerService;
