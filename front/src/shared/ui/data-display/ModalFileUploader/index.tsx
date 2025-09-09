/* eslint-disable react-extra/no-inline-styles */
import { ReactNode, useState } from 'react';
import { RcFile } from 'antd/es/upload';

import { Avatar, Button, Spin, Upload, UploadCertificateIcon } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n';

const getBase64 = (img: RcFile, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export interface ModalFileUploaderItem {
  url?: string;
  uploadText?: string;
  setFile?: any;
  onError?: ReactNode;
  label?: string;
  buttonText?: string;
  setUrl: (a: string) => void;
}

export const ModalFileUploader: React.FC<ModalFileUploaderItem> = ({
  url = '',
  setFile,
  onError,
  label,
  buttonText,
  setUrl,
}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);

  const successFile = (data: any) => {
    setLoading(false);
    setUrl(URL.createObjectURL(data));

    setFile(data);
  };

  const handleChange = (e: any) => {
    successFile(e.file.originFileObj);

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
        {!url ? (
          <div className="w-[40px] h-[40px] p-[0_0_0_5px]">
            <UploadCertificateIcon />
          </div>
        ) : (
          <Avatar size={40} src={url} icon={onError} shape="square">
            {loading ? <Spin /> : <div onClick={onPreview} className="w-10 h-10 cursor-pointer" />}
          </Avatar>
        )}

        <p className="text-[10px]">{label}</p>
      </div>
      <Upload onPreview={onPreview} onChange={handleChange} itemRender={() => <div></div>}>
        <Button className="bg-gray text-[#666666]" type="primary">
          {buttonText}
        </Button>
      </Upload>
    </div>
  );
};
