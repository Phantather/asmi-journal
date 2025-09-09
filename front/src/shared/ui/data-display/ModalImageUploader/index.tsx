import { ReactNode, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';

import { Avatar, Button, Spin, Upload } from '~shared/ui';
import { CompressFile } from '~shared/lib/utils';

const getBase64 = (img: RcFile, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export interface ModalImageUploaderItem {
  url?: string;
  uploadText?: string;
  setFile?: any;
  onError?: ReactNode;
  label?: string;
  buttonText?: string;
  setUrl: (a: string) => void;
}

export const ModalImageUploader: React.FC<ModalImageUploaderItem> = ({
  url = '',
  setFile,
  onError,
  label,
  buttonText,
  setUrl,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const successAvatar = (data: any) => {
    setLoading(false);
    setUrl(URL.createObjectURL(data));

    setFile(data);
  };

  const handleChange = (e: any) => {
    CompressFile(e.file.originFileObj, successAvatar);

    if (e.file.status === 'uploading') {
      setLoading(true);

      return;
    }

    if (e.file.status === 'done') {
      getBase64(e.file.originFileObj, (url: string) => {
        setLoading(false);
        setUrl(url);
      });
    }
  };

  const onPreview = async (file: any) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2.5 items-center">
        <Avatar size={40} src={url} icon={onError}>
          {loading ? <Spin /> : <div onClick={onPreview} className="w-10 h-10 cursor-pointer" />}
        </Avatar>

        <p className="text-[10px]">{label}</p>
      </div>
      <ImgCrop>
        <Upload onPreview={onPreview} onChange={handleChange} itemRender={() => <div></div>}>
          <Button className="bg-gray text-[#666666]" type="primary">
            {buttonText}
          </Button>
        </Upload>
      </ImgCrop>
    </div>
  );
};
