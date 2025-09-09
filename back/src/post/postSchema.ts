import { Schema } from "../utils/types";

const postSchema: Schema = {
  type: "object",
  properties: {
    id_type: { type: "string", minLength: 1, required: true },
    title: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    images: { type: "array", items: { type: "string" } },
    date: { type: ["string", "date"] },
  },
};

const postNewSchema: Schema = {
  type: "object",
  properties: {
    id_type: { type: "string", minLength: 1, required: true },
    title_ru: { type: "string", minLength: 1, required: true },
    title_ky: { type: "string", minLength: 1, required: true },
    title_en: { type: "string", minLength: 1, required: true },
    date: { type: ["string", "date"] },
    contents: {
      type: "array",
      required: true,
      items: {
        type: "object",
        properties: {
          description_ru: { type: "string", minLength: 1, required: true },
          description_ky: { type: "string", minLength: 1, required: true },
          description_en: { type: "string", minLength: 1, required: true },
          images: {
            type: "array",
            items: { type: "string" },
            required: true,
          },
        },
      },
    },
  },
};

export default {
  postSchema,
  postNewSchema,
};
