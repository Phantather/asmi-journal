import React, { FC, useCallback, useState } from 'react';

import { Button, Modal } from 'antd';

import { NewsItem } from '~entities/shared/news';
import { deleteNews } from '~features/admin/AdminNews';
import { useNotification } from '~shared/ui';

interface AdminNewsDeleteProps {
  newsItem?: any;
  reFetchNewsList?: any;
}

export const AdminNewsDelete: FC<AdminNewsDeleteProps> = ({ newsItem, reFetchNewsList }) => {
  const notification = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, []);

  const handleDetele = async () => {
    setIsLoading(true);

    try {
      await deleteNews(newsItem?.id);

      notification.openNotification({ type: 'success', message: 'Новость успешна удалена' });
      reFetchNewsList({ page: 1, offset: 12 });
      setModalOpen(false);
    } catch (error) {
      notification.openNotification({ type: 'error', message: 'Не удалось удалить новость' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {notification.contextHolder}

      <Button
        onClick={handleModal}
        size="small"
        className="w-full border-none !p-5 flex justify-center items-center text-red !hover:text-red"
      >
        Удалить
      </Button>
      <Modal
        open={modalOpen}
        onCancel={handleModal}
        centered
        footer={false}
        width={470}
        key={newsItem?.id}
      >
        <div>
          <h2 className="text-center text-[16px] font-medium mb-[40px]">
            Вы уверены, что хотите удалить новость?
          </h2>
          <div className="flex justify-center gap-[20px]">
            <Button
              className="!border !border-solid !border-primary !bg-transparent !text-primary"
              size="large"
              onClick={handleModal}
            >
              Отмена
            </Button>
            <Button
              loading={isLoading}
              className="!border !border-solid !border-red !bg-transparent !text-red"
              size="large"
              onClick={() => handleDetele()}
            >
              Удалить
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
