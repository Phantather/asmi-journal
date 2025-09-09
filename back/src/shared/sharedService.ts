import db from "../utils/db";

async function getVehicles() {
  try {
    const { rows, error } = await db.query(
      `SELECT id, vehicle_name FROM vehicle ORDER BY id;`,
      []
    );
    return error ? false : rows;
  } catch (error) {
    console.log("error getModel: ", error.message);
    return false;
  }
}

async function getGuide() {
  try {
    const { rows, error } = await db.query(
      `SELECT id_guide, guide_name FROM guide ORDER BY id_guide;`,
      []
    );
    return error ? false : rows;
  } catch (error) {
    console.log("error getGuide: ", error.message);
    return false;
  }
}

export default {
  getVehicles,
  getGuide
};
