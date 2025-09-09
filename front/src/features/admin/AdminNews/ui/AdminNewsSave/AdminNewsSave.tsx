import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Image, Input, List, Modal, Segmented, Upload } from 'antd';
import ReactQuill from 'react-quill';

import { ApiNewsRequest, createNews, updateNews } from '~features/admin/AdminNews';
import { DatePicker, Loader, UploadIcon, useNotification } from '~shared/ui';
import { dayjs } from '~shared/lib/time/dayjs';
import 'react-quill/dist/quill.snow.css';
import { useNewsDetail, useSetNewsDetail } from '~entities/news';

const Quill = ReactQuill.Quill;
const FontAttributor = Quill.import('attributors/class/font');
const SizeAttributor = Quill.import('attributors/class/size');

FontAttributor.whitelist = [
  'inter',
  'arial',
  'times-new-roman',
  'courier-new',
  'georgia',
  'verdana',
  'sofia',
  'roboto',
];

Quill.register(FontAttributor, true);
SizeAttributor.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
Quill.register(SizeAttributor, true);

interface Description {
  id: number;
  values: {
    ru: string;
    ky: string;
    en: string;
  };
  fileList: {
    uid: number;
    name: string;
    url: string;
    status: string;
  }[];
}

export interface AdminNewsSaveProps {
  type: 'add' | 'edit';
  reFetchNewsList?: any;
  newsItem?: any;
}

const modules = {
  toolbar: [
    [{ header: [false, 2, 3, 4, 5, 6] }],
    [{ font: FontAttributor.whitelist }],
    [{ size: SizeAttributor.whitelist }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
];

export const AdminNewsSave: FC<AdminNewsSaveProps> = ({
  type = 'add',
  newsItem,
  reFetchNewsList,
}) => {
  const [modal, setModal] = useState(false);
  const [form] = Form.useForm();
  const notification = useNotification();
  const [fileList, setFileList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [descriptions, setDescriptions] = useState([
    {
      id: 1,
      values: { ru: '', ky: '', en: '' },
      fileList: [],
    },
  ]);

  const [contentsToDelete, setContentsToDelete] = useState<number[]>([]);
  const [mainImagesToDelete, setMainImagesToDelete] = useState<number[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('ru');
  const [isLoadingData, setIsLoadingData] = useState(false);

  const newDetail = useNewsDetail();
  const setNewsDetail = useSetNewsDetail();

  useEffect(() => {
    if (type === 'edit' && modal && newsItem) {
      setIsLoadingData(true);
      setNewsDetail({ id: newsItem?.id });
    }
  }, [type, modal, newsItem, setNewsDetail]);

  useEffect(() => {
    if (newDetail && type === 'edit' && modal) {
      setIsLoadingData(false);

      // ВЕСЬ КОД ОБРАБОТКИ ДАННЫХ ПЕРЕНЕСИТЕ СЮДА:
      // Безопасное получение значений заголовка
      const titleValues = {
        ru: newDetail.title?.ru || '',
        ky: newDetail.title?.ky || '',
        en: newDetail.title?.en || '',
      };

      form.setFieldsValue({
        title_ru: titleValues.ru,
        title_ky: titleValues.ky,
        title_en: titleValues.en,
        date: dayjs(newDetail.date),
      });

      const mainFileList =
        newDetail.main_images?.map((image: any) => ({
          uid: image.id,
          name: `main_${image.id}`,
          url: image.url,
          status: 'done',
        })) || [];

      setFileList(mainFileList);

      // Безопасная обработка контента
      if (newDetail.content?.length > 0) {
        const contentDescriptions = newDetail.content.map((content: any, index: number) => ({
          id: content.id || index + 1,
          values: {
            ru: content.description_ru || '',
            ky: content.description_ky || '',
            en: content.description_en || '',
          },
          fileList:
            content.images?.map((img: any) => ({
              uid: img.id,
              name: img.name || `image_${img.id}`,
              url: img.url,
              status: 'done',
            })) || [],
        }));

        setDescriptions(contentDescriptions as any);
      } else {
        setDescriptions([{ id: 1, values: { ru: '', ky: '', en: '' }, fileList: [] }]);
      }
    } else if (type === 'add' && modal) {
      form.resetFields();
      setFileList([]);
      setDescriptions([{ id: 1, values: { ru: '', ky: '', en: '' }, fileList: [] }]);
      setSelectedLanguage('ru');
    }
  }, [newDetail, type, modal, form]);

  const onFinish = async (values: any) => {
    setIsLoading(true);

    try {
      const newMainFiles = fileList
        .filter((file: any) => file.originFileObj)
        .map((file: any) => file.originFileObj);

      const contents = descriptions.map((desc) => {
        const contentFiles = desc.fileList
          .filter((file: any) => file.originFileObj)
          .map((file: any) => file.originFileObj);

        return {
          id: desc.id,
          description_ru: desc.values.ru || '',
          description_ky: desc.values.ky || '',
          description_en: desc.values.en || '',
          images: contentFiles,
        };
      });

      const contentsToUpdate =
        type === 'edit' && newDetail
          ? descriptions
              .filter((desc) => {
                const originalContent = newDetail.content?.find((c: any) => c.id === desc.id);

                return desc.id && originalContent;
              })
              .map((desc) => ({
                id_content: desc.id,
                description_ru: desc.values.ru || '',
                description_ky: desc.values.ky || '',
                description_en: desc.values.en || '',
              }))
          : [];

      const newContents =
        type === 'edit'
          ? descriptions
              .filter((desc) => !newDetail?.content?.some((c) => c.id === desc.id))
              .map((desc) => ({
                description_ru: desc.values.ru || '',
                description_ky: desc.values.ky || '',
                description_en: desc.values.en || '',
                images: desc.fileList
                  .filter((file: any) => file.originFileObj)
                  .map((file: any) => file.originFileObj),
              }))
          : [];

      const formData: ApiNewsRequest = {
        title_ru: values.title_ru || '',
        title_ky: values.title_ky || '',
        title_en: values.title_en || '',
        contents,
        main_images: newMainFiles,
        date: dayjs(values.date).format('YYYY-MM-DD'),
        id_type: 1,
        is_special_offer: values.is_special_offer || false,
      };

      if (type === 'edit') {
        formData.main_image_to_delete = mainImagesToDelete;
        formData.images_to_delete = imagesToDelete;
        formData.contents_to_delete = contentsToDelete;
        formData.contents_to_update = contentsToUpdate;
        formData.new_contents = newContents;
      }

      if (type === 'edit' && newsItem) {
        await updateNews(newsItem?.id, formData);
      } else {
        await createNews(formData);
      }

      notification.openNotification({
        type: 'success',
        message: 'Новость успешно сохранена',
      });

      handleModal();
      setContentsToDelete([]);
      setMainImagesToDelete([]);
      setImagesToDelete([]);
      reFetchNewsList({ page: 1, offset: 12 });
    } catch (error) {
      console.error('Error saving news:', error);

      notification.openNotification({
        type: 'error',
        message: 'Ошибка при сохранении',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      notification.openNotification({
        type: 'error',
        message: 'Можно загружать только JPG/PNG файлы!',
      });

      return false;
    }

    const isLt20M = file.size / 1024 / 1024 < 20;

    if (!isLt20M) {
      notification.openNotification({
        type: 'error',
        message: 'Размер изображения должен быть меньше 20MB!',
      });

      return false;
    }

    return true;
  };

  const handleChange = useCallback(({ fileList }: any) => {
    const updatedFileList = fileList.map((file: any) => {
      if (!file.thumbUrl && file.originFileObj) {
        file.thumbUrl = URL.createObjectURL(file.originFileObj);
      }

      return file;
    });

    setFileList(updatedFileList);
  }, []);

  const handleModal = useCallback(() => {
    setModal((prev) => !prev);
    form.resetFields();
    setFileList([]);
    setContentsToDelete([]);
    setMainImagesToDelete([]);
    setImagesToDelete([]);
    setSelectedLanguage('ru');
  }, [form]);

  const handleRemoveMainImage = (uid: number) => {
    setMainImagesToDelete((prev: number[]) => [...prev, uid]);
    setFileList((prev: any[]) => prev.filter((file: any) => file.uid !== uid));
  };

  const handleQuillChange = useCallback((content: string, id: number, lang: string) => {
    setDescriptions((prev) =>
      prev.map((desc) =>
        desc.id === id ? { ...desc, values: { ...desc.values, [lang]: content } } : desc
      )
    );
  }, []);

  const handleDescriptionFileChange = useCallback((fileList: any, id: number) => {
    setDescriptions((prev) => prev.map((desc) => (desc.id === id ? { ...desc, fileList } : desc)));
  }, []);

  const handleDescriptionFileRemove = (file: any, id: number) => {
    setImagesToDelete((prev) => [...prev, file.uid]);

    setDescriptions((prev) =>
      prev.map((desc) =>
        desc.id === id
          ? { ...desc, fileList: desc.fileList.filter((item: any) => item.uid !== file.uid) }
          : desc
      )
    );
  };

  const addDescription = useCallback(() => {
    setDescriptions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        values: { ru: '', ky: '', en: '' },
        fileList: [],
      },
    ]);
  }, []);

  const removeDescription = (id: number) => {
    setContentsToDelete((prev) => [...prev, id]);
    setDescriptions((prev) => prev.filter((desc) => desc.id !== id));
  };

  console.log(form.getFieldsValue());

  return (
    <>
      {notification.contextHolder}
      {type === 'add' ? (
        <Button
          className="!border !border-solid !border-primary mb-[32px]"
          type="primary"
          size="large"
          onClick={handleModal}
        >
          Добавить новость
        </Button>
      ) : (
        <Button
          onClick={handleModal}
          size="small"
          className="w-full border-none !p-5 flex justify-center items-center"
        >
          Изменить
        </Button>
      )}
      <Modal open={modal} onCancel={handleModal} footer={false} width={1200}>
        <div className="p-[16px_12px] grid gap-[20px]">
          {isLoadingData ? (
            <Loader />
          ) : (
            <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off">
              <h2 className="text-primary text-[30px] mb-5">
                {type === 'add' ? 'Добавление новости' : 'Изменение новости'}
              </h2>

              {/* Сегмент выбора языка */}
              <div className="mb-5">
                <label className="block mb-2 font-bold">Язык заполнения</label>
                <Segmented
                  options={[
                    { label: 'Русский', value: 'ru' },
                    { label: 'Кыргызча', value: 'ky' },
                    { label: 'English', value: 'en' },
                  ]}
                  onChange={setSelectedLanguage}
                  value={selectedLanguage}
                  className="w-full sm:w-1/2 h-[36px] mb-[0] [&>div]:justify-between [&>div>label]:w-full"
                />
              </div>

              {/* Заголовки для всех языков - ВСЕ ОДНОВРЕМЕННО */}
              <Form.Item
                label="Заголовок (Русский)"
                name="title_ru"
                rules={[
                  {
                    required: selectedLanguage === 'ru',
                    message: 'Пожалуйста, введите заголовок на русском',
                  },
                  { min: 7, message: 'Минимальная длина заголовка - 7 символов' },
                ]}
                style={{ display: selectedLanguage === 'ru' ? 'block' : 'none' }}
              >
                <Input placeholder="Русский заголовок" size="large" />
              </Form.Item>

              <Form.Item
                label="Заголовок (Кыргызча)"
                name="title_ky"
                rules={[
                  {
                    required: selectedLanguage === 'ky',
                    message: 'Пожалуйста, введите заголовок на кыргызском',
                  },
                  { min: 7, message: 'Минимальная длина заголовка - 7 символов' },
                ]}
                style={{ display: selectedLanguage === 'ky' ? 'block' : 'none' }}
              >
                <Input placeholder="Кыргызча заголовок" size="large" />
              </Form.Item>

              <Form.Item
                label="Заголовок (English)"
                name="title_en"
                rules={[
                  {
                    required: selectedLanguage === 'en',
                    message: 'Пожалуйста, введите заголовок на английском',
                  },
                  { min: 7, message: 'Минимальная длина заголовка - 7 символов' },
                ]}
                style={{ display: selectedLanguage === 'en' ? 'block' : 'none' }}
              >
                <Input placeholder="English title" size="large" />
              </Form.Item>

              <Form.Item label="Изображения" name="main_images">
                <Upload
                  listType="picture"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  multiple
                  itemRender={() => <div></div>}
                >
                  <Button className="p-5 flex items-center">
                    <UploadIcon />
                    Загрузить изображения
                  </Button>
                </Upload>
                {fileList?.length > 0 && (
                  <List
                    className="mt-[16px]"
                    size="small"
                    bordered
                    dataSource={fileList}
                    renderItem={(file: any) => (
                      <List.Item key={file.uid || file.name} className="!flex !justify-between">
                        <div className="flex gap-5 items-center">
                          <Image
                            width={50}
                            height={50}
                            src={file.thumbUrl || file.url}
                            alt={file.name}
                          />
                          {file.name}
                        </div>
                        <Button
                          onClick={() => handleRemoveMainImage(file.uid)}
                          className="text-red border-red"
                        >
                          Удалить
                        </Button>
                      </List.Item>
                    )}
                  />
                )}
              </Form.Item>

              {descriptions.map((desc) => (
                <div
                  key={desc.id}
                  className="border border-solid border-[#E5E5E5] rounded-[8px] p-5 relative"
                >
                  <button
                    type="button"
                    className="absolute top-2 right-2"
                    onClick={() => removeDescription(desc.id)}
                  >
                    X
                  </button>

                  {/* Описания для всех языков */}
                  <div className="mb-4">
                    <label className="block mb-2 font-bold">Описания</label>

                    <div style={{ display: selectedLanguage === 'ru' ? 'block' : 'none' }}>
                      <label className="block mb-2">Русский</label>
                      <ReactQuill
                        theme="snow"
                        value={desc.values.ru}
                        onChange={(content) => handleQuillChange(content, desc.id, 'ru')}
                        modules={modules}
                        formats={formats}
                        className="custom-quill mb-4"
                      />
                    </div>

                    <div style={{ display: selectedLanguage === 'ky' ? 'block' : 'none' }}>
                      <label className="block mb-2">Кыргызча</label>
                      <ReactQuill
                        theme="snow"
                        value={desc.values.ky}
                        onChange={(content) => handleQuillChange(content, desc.id, 'ky')}
                        modules={modules}
                        formats={formats}
                        className="custom-quill mb-4"
                      />
                    </div>

                    <div style={{ display: selectedLanguage === 'en' ? 'block' : 'none' }}>
                      <label className="block mb-2">English</label>
                      <ReactQuill
                        theme="snow"
                        value={desc.values.en}
                        onChange={(content) => handleQuillChange(content, desc.id, 'en')}
                        modules={modules}
                        formats={formats}
                        className="custom-quill mb-4"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-bold">Изображения</label>
                    <Upload
                      listType="picture"
                      fileList={desc.fileList}
                      beforeUpload={beforeUpload}
                      onChange={({ fileList }) => handleDescriptionFileChange(fileList, desc.id)}
                      multiple
                      itemRender={() => <div></div>}
                    >
                      <Button className="p-5 flex items-center">
                        <UploadIcon />
                        Загрузить изображения
                      </Button>
                    </Upload>
                    {desc.fileList?.length > 0 && (
                      <List
                        className="mt-[16px]"
                        size="small"
                        bordered
                        dataSource={desc.fileList}
                        renderItem={(file: any) => (
                          <List.Item key={file.uid || file.name} className="!flex !justify-between">
                            <div className="flex gap-5 items-center">
                              <Image
                                width={50}
                                height={50}
                                src={file.thumbUrl || file.url}
                                alt={file.name}
                              />
                              {file.name}
                            </div>
                            <Button
                              onClick={() => handleDescriptionFileRemove(file, desc.id)}
                              className="text-red border-red"
                            >
                              Удалить
                            </Button>
                          </List.Item>
                        )}
                      />
                    )}
                  </div>
                </div>
              ))}

              <Button type="dashed" onClick={addDescription} className="w-full mb-5">
                Добавить еще описание
              </Button>

              <Form.Item label="Дата" name="date" rules={[{ required: true }]}>
                <DatePicker placeholder="Укажите дату" size="large" className="w-full" />
              </Form.Item>

              <Button
                type="primary"
                size="large"
                className="px-5"
                htmlType="submit"
                loading={isLoading}
              >
                Сохранить
              </Button>
            </Form>
          )}
        </div>
      </Modal>
    </>
  );
};
