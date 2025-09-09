import React, { FC } from 'react';

import { Dropdown, Image, Table, TableColumnsType } from 'antd';

import { MoreFileIcon } from '~shared/ui';
import { BannerItem } from '~entities/shared/banner';

export interface AdminBannerTableProps {
  list: BannerItem[];
  editSlot?: React.ReactNode;
  deleteSlot?: React.ReactNode;
  setBannerItem?: any;
}

export const AdminBannerTable: FC<AdminBannerTableProps> = ({
  list,
  editSlot,
  deleteSlot,
  setBannerItem,
}) => {
  const generateButtonsMenu = () => {
    return [
      {
        key: '1',
        label: <>{editSlot}</>,
      },
      {
        key: '2',
        label: <>{deleteSlot}</>,
      },
    ];
  };

  const columns: TableColumnsType<BannerItem> = [
    {
      title: '№',
      width: 50,
      render: (_row, value, idx) => <p>{idx + 1}</p>,
    },
    {
      title: 'Заголовок',
      width: 200,
      render: (_row, value) => (
        <>
          <p className="border border-solid border-primary border-t-transparent border-l-transparent border-r-transparent py-2">
            {value?.banner_title_ru}
          </p>
          <p className="border border-solid border-primary border-t-transparent border-l-transparent border-r-transparent py-2">
            {value?.banner_title_ky}
          </p>
          <p className="border border-solid border-primary border-t-transparent border-l-transparent border-r-transparent py-2">
            {value?.banner_title_en}
          </p>
        </>
      ),
    },
    {
      title: 'Баннеры',
      width: 100,
      render: (_row, value) => (
        <>
          <Image width={50} src={value?.banner_url} alt={value?.banner_title_en || 'banner'} />
        </>
      ),
    },
    {
      align: 'end',
      width: 100,
      render: (_row, value) => (
        <div onClick={() => setBannerItem(value)}>
          <Dropdown
            trigger={['click']}
            menu={{
              items: generateButtonsMenu(),
            }}
            placement="bottomRight"
            className="cursor-pointer ![&>ul>li]:p-0"
          >
            <div className="border-none !bg-none">
              <MoreFileIcon />
            </div>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div className="col-span-12">
      <Table columns={columns} dataSource={list} pagination={false} />
    </div>
  );
};
