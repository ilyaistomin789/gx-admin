import { useDelete } from '@refinedev/core';
import { Upload, UploadProps } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFile } from 'antd/lib';
import axios from 'axios';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MEDIA_SERVICE_URL } from '../../../app/config';
import { DefaultResponse } from '../../../data';
import { Image, Nullable } from '../../types';
import './styles.css';

export type ImageUploadProps = Omit<UploadProps, 'action'> & {
  onSuccessUpload?: (data: Nullable<Image>) => void;
};

export const ImageUpload = ({
  children,
  onSuccessUpload,
  customRequest,
  onChange,
  fileList: initialFileList,
  ...props
}: PropsWithChildren<ImageUploadProps>) => {
  const { mutate } = useDelete();

  const [fileList, setFileList] = useState<UploadFile<Image>[]>(
    initialFileList || [],
  );

  useEffect(() => {
    if (typeof initialFileList !== undefined && initialFileList !== fileList) {
      setFileList(initialFileList!);
    }
  }, [initialFileList]);

  const handleUpload = async (options: any) => {
    if (customRequest) {
      customRequest(options);
      return;
    }

    const { onProgress, onError, onSuccess, file } = options;

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event: any) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
      withCredentials: true,
    };

    const fmData = new FormData();
    fmData.set('file', file);

    try {
      const { data } = await axios.post<DefaultResponse<Image>>(
        `${MEDIA_SERVICE_URL}/images/upload`,
        fmData,
        { ...config },
      );

      onSuccessUpload?.(data?.data);
      onSuccess(data?.data);
    } catch (error) {
      onError(error);
    }
  };

  const handleChange = (info: UploadChangeParam<UploadFile<Image>>) => {
    onChange?.(info);
    setFileList(info.fileList);
  };

  const handleRemove = (file: UploadFile<Image>) => {
    console.log(fileList);
    const id = file.uid.startsWith('rc-upload') ? file.response?.id : file.uid;
    mutate({
      id: id || '',
      dataProviderName: 'media',
      resource: 'images',
    });

    onChange?.(null!);
  };

  return (
    <Upload
      {...props}
      customRequest={handleUpload}
      onChange={handleChange}
      fileList={fileList}
      onRemove={handleRemove}
    >
      {children}
    </Upload>
  );
};
