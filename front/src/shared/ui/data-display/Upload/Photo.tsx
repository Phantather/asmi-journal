import { CSSProperties, FC, ReactNode } from 'react';

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import './photo.scss';
import { Avatar, PlusIcon, Spin } from '~shared/ui';

interface PhotoUploadProps {
  url?: string;
  uploadText?: string;
  style?: CSSProperties;
  loading?: boolean;
  onChange?: any;
  onPreview?: (file: any) => void;
  onError?: ReactNode;
}

export const ImageUpload: FC<PhotoUploadProps> = ({
  uploadText,
  onChange,
  onPreview,
  url,
  loading,
  onError,
}) => {
  return (
    <div className="imageUploadWrapper">
      <ImgCrop>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={onChange}
          onPreview={onPreview}
        >
          {loading ? (
            <div className="upload-button">
              <Spin size="large" />
            </div>
          ) : url ? (
            <Avatar src={url ? url : null} size={140} shape="square">
              {onError}
            </Avatar>
          ) : (
            <div className="upload-button">
              <PlusIcon /> {uploadText}
            </div>
          )}
        </Upload>
      </ImgCrop>
    </div>
  );
};
