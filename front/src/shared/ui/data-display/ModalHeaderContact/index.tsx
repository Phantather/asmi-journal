import React, { useState } from 'react';

import { Modal, PhonesIcon, WhatsAppIcon } from '~shared/ui';

export const ModalHeaderContact = () => {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal((prevState) => !prevState);
  };

  return (
    <>
      <button
        onClick={handleModal}
        className="bg-primary p-[10px_25px] text-white cursor-pointer border-none"
      >
        СВЯЗАТЬСЯ
      </button>
      <Modal
        open={modal}
        onCancel={handleModal}
        centered
        width={540}
        footer={false}
        className="modal"
      >
        <h2 className="text-center text-[30px] font-medium mb-[40px]">Выберите удобный вариант</h2>
        <div className="grid gap-[24px]">
          <a
            href="https://wa.me/996775530003"
            className="w-full bg-primary p-[10px_25px] text-white hover:text-white cursor-pointer border-none flex justify-center items-center gap-[7px]"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon /> Написать в WhatsApp
          </a>
          <a
            href="tel:+996221230003"
            className="w-full bg-primary p-[10px_25px] text-white hover:text-white cursor-pointer border-none flex justify-center items-center gap-[7px]"
          >
            <PhonesIcon />
            Позвонить напрямую
          </a>
        </div>
      </Modal>
    </>
  );
};
