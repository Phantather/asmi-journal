import Cookies from 'js-cookie';

import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiNewsData, ApiNewsRequest } from './types';

export const updateNews = async (id: number, data: ApiNewsRequest) => {
  const token = Cookies.get(`${import.meta.env.VITE_TOKEN_NAME}`);
  const formData = new FormData();

  formData.append('title_ru', data.title_ru);
  formData.append('title_ky', data.title_ky);
  formData.append('title_en', data.title_en);
  formData.append('date', data.date);

  if (data.main_image_to_delete?.length > 0) {
    formData.append('main_image_to_delete', JSON.stringify(data.main_image_to_delete));
  }

  if (data.contents_to_delete?.length > 0) {
    formData.append('contents_to_delete', JSON.stringify(data.contents_to_delete));
  }

  if (data.contents_to_update?.length > 0) {
    formData.append('contents_to_update', JSON.stringify(data.contents_to_update));
  }

  if (data.images_to_delete?.length > 0) {
    formData.append('images_to_delete', JSON.stringify(data.images_to_delete));
  }

  if (data.new_contents?.length > 0) {
    data.new_contents.forEach((content: any, index: number) => {
      // Добавляем изображения с ключами new_${index}
      if (content.images?.length > 0) {
        content.images.forEach((file: any) => {
          formData.append(`new_${index}`, file);
        });
      }

      // Удаляем ключ images из объекта
      const { images, ...contentWithoutImages } = content;

      // Добавляем описание без ключа images
      formData.append('new_contents', JSON.stringify([contentWithoutImages]));
    });
  }

  data.contents.forEach((content, index) => {
    content.images.forEach((file) => {
      formData.append(`update_${index}`, file);
    });
  });

  data.main_images.forEach((file) => {
    formData.append('main_images', file);
  });

  try {
    return await api.put<unknown, ApiResponseData<ApiNewsData>>(routes.updateNews(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const deleteNews = async (id: number) => {
  const token = Cookies.get(`${import.meta.env.VITE_TOKEN_NAME}`);

  try {
    return await api.delete<unknown, ApiResponseData<ApiNewsData>>(routes.deleteNews(id), {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const createNews = async (data: ApiNewsRequest) => {
  const token = Cookies.get(`${import.meta.env.VITE_TOKEN_NAME}`);
  const formData = new FormData();

  formData.append('id_type', String(data.id_type));
  formData.append('title_ru', data.title_ru || '');
  formData.append('title_ky', data.title_ky || '');
  formData.append('title_en', data.title_en || '');
  formData.append('date', data.date);

  // Добавляем описания и их изображения
  data.contents.forEach((content, index) => {
    formData.append(`contents[${index}][description_ru]`, content.description_ru || '');
    formData.append(`contents[${index}][description_ky]`, content.description_ky || '');
    formData.append(`contents[${index}][description_en]`, content.description_en || '');

    content.images.forEach((file, fileIndex) => {
      formData.append(`images_${index}`, file);
    });
  });

  // Добавляем основные изображения
  data.main_images.forEach((file) => {
    formData.append('main_images', file);
  });

  try {
    return await api.post<unknown, ApiResponseData<ApiNewsData>>(routes.createNews(), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
};
