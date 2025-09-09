import { FC } from 'react';
import { Link } from 'react-router-dom';

import { EmailsIcon, MapsIcon, PhonesIcon, WhatsAppIcon } from '~shared/ui';
import { RoutesUrls } from '~shared/lib/router';

export interface SiteFooterProps extends Partial<ComponentWithChild> {}

export const SiteFooter: FC<SiteFooterProps> = () => {
  return (
    <div className="w-full bg-primary">
      <div className="max-w-[1024px] mx-auto py-12 px-5">
        <div className="grid grid-cols-12 sm:grid-cols-8 xs:grid-cols-4 md:gap-10 items-start">
          <div className="col-span-3 sm:col-span-4 xs:col-span-4">
            <ul className="list-none p-0 grid gap-5">
              <li>
                <a
                  href="https://go.2gis.com/uFHt4"
                  target="_blank"
                  className="text-white text-[14px] font-normal flex items-center gap-[8px]"
                  rel="noreferrer"
                >
                  <MapsIcon />
                  г. Бишкек, Анкара 6/1
                </a>
              </li>
              <li>
                <a
                  href="mailto:office@asiamotors.kg"
                  target="_blank"
                  className="text-white text-[14px] font-normal flex items-center gap-[8px]"
                  rel="noreferrer"
                >
                  <EmailsIcon />
                  office@asiamotors.kg
                </a>
              </li>

              <li>
                <a
                  href="tel:+996221230003"
                  target="_blank"
                  className="text-white text-[14px] font-normal flex items-center gap-[8px]"
                  rel="noreferrer"
                >
                  <PhonesIcon />
                  +996 (221) 230 003
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/996775530003"
                  target="_blank"
                  className="text-white text-[14px] font-normal flex items-center gap-[8px]"
                  rel="noreferrer"
                >
                  <WhatsAppIcon />
                  +996 (775) 530 003
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-3 sm:col-span-4 xs:col-span-4 flex justify-end md:justify-start">
            <ul className="list-none p-0 grid gap-5">
              <li>
                <Link to={RoutesUrls.service} className="text-white text-[14px] font-normal">
                  Обслуживание
                </Link>
              </li>
              <li>
                <Link to={RoutesUrls.guarantee} className="text-white text-[14px] font-normal">
                  Гарантия
                </Link>
              </li>
              <li>
                <Link to={RoutesUrls.manual} className="text-white text-[14px] font-normal">
                  Руководства и каталоги
                </Link>
              </li>
              <li>
                <Link to={RoutesUrls.serviceSigning} className="text-white text-[14px] font-normal">
                  Запись на сервис
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-3 sm:col-span-4 xs:col-span-4 flex justify-center md:justify-start">
            <ul className="list-none p-0 grid gap-5">
              <li>
                <Link to={RoutesUrls.spareParts} className="text-white text-[14px] font-normal">
                  Оригинальные запасные части
                </Link>
              </li>
              <li>
                <Link to={RoutesUrls.accessories} className="text-white text-[14px] font-normal">
                  Оригинальные аксессуары
                </Link>
              </li>
              <li>
                <Link to={RoutesUrls.specialOffer} className="text-white text-[14px] font-normal">
                  Спецпредложения
                </Link>
              </li>
              {/*<li>*/}
              {/*  <Link to="/service-offers" className="text-white text-[14px] font-normal">*/}
              {/*    О бренде*/}
              {/*  </Link>*/}
              {/*</li>*/}
            </ul>
          </div>
          <div className="col-span-3 sm:col-span-4 xs:col-span-4 flex justify-end md:justify-start">
            <ul className="list-none p-0 grid gap-5">
              <li>
                <a
                  href="tel:+996704530003"
                  target="_blank"
                  className="text-white text-[14px] font-normal flex items-center gap-[8px]"
                  rel="noreferrer"
                >
                  <PhonesIcon />
                  +996 (704) 530 003
                </a>
              </li>
              <li>
                <a
                  href="tel:+996556530003"
                  target="_blank"
                  className="text-white text-[14px] font-normal flex items-center gap-[8px]"
                  rel="noreferrer"
                >
                  <PhonesIcon />
                  +996 (556) 530 003
                </a>
              </li>
              <li>
                <a
                  href="tel:+996775530003"
                  target="_blank"
                  className="text-white text-[14px] font-normal flex items-center gap-[8px]"
                  rel="noreferrer"
                >
                  <PhonesIcon />
                  +996 (775) 530 003
                </a>
              </li>
              <li>
                <a
                  href="tel:+996778530003"
                  target="_blank"
                  className="text-white text-[14px] font-normal flex items-center gap-[8px]"
                  rel="noreferrer"
                >
                  <PhonesIcon />
                  +996 (778) 530 003
                </a>
              </li>
              <li>
                <a
                  href="tel:+996312530003"
                  target="_blank"
                  className="text-white text-[14px] font-normal flex items-center gap-[8px]"
                  rel="noreferrer"
                >
                  <PhonesIcon />
                  +996 (312) 530 003
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[85px]">
          <p className="text-[12px] text-secondGray font-normal">
            Представленные на изображениях автомобили могут отличаться от серийных моделей. Любая
            информация, содержащаяся на настоящем сайте, носит исключительно справочный характер и
            ни при каких обстоятельствах не может быть расценена как предложение заключить договор
            (публичная оферта). ОсОО Азиямоторс не дает гарантий по поводу своевременности, точности
            и полноты информации на веб- сайте, а также по поводу беспрепятственного доступа к нему
            в любое время. Технические характеристики и оборудование автомобилей, условия
            приобретения автомобилей, цены, спецпредложения и комплектации автомобилей, указанные на
            сайте, приведены для примера и могут быть изменены в любое время без предварительного
            уведомления.
          </p>
          <p className="mt-[30px] text-[12px] text-secondGray font-normal">
            Copyright 2024 Hyundai Motor Company. Все права защищены.
          </p>
        </div>
      </div>
    </div>
  );
};
