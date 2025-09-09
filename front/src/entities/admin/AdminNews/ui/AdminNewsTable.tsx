import React, { FC } from 'react';

import { Dropdown, Image, Table, TableColumnsType } from 'antd';

import { MoreFileIcon } from '~shared/ui';
import { NewsItem } from '~entities/shared/news';
import { dayjs } from '~shared/lib/time/dayjs';

export interface AdminNewsTableProps {
  list: NewsItem[];
  editSlot: React.ReactNode;
  deleteSlot: React.ReactNode;
  setNewsItem?: any;
}

export const AdminNewsTable: FC<AdminNewsTableProps> = ({
  list,
  editSlot,
  deleteSlot,
  setNewsItem,
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

  const columns: TableColumnsType<NewsItem> = [
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
            {value?.title?.ru}
          </p>
          <p className="border border-solid border-primary border-t-transparent border-l-transparent border-r-transparent py-2">
            {value?.title?.ky}
          </p>
          <p className="border border-solid border-primary border-t-transparent border-l-transparent border-r-transparent py-2">
            {value?.title?.en}
          </p>
        </>
      ),
    },
    {
      title: 'Описание',
      width: 400,
      render: (_row, value) => (
        <>
          <div
            className="border border-solid border-primary border-t-transparent border-l-transparent border-r-transparent py-2"
            dangerouslySetInnerHTML={{ __html: value?.description?.ru?.slice(0, 100) || '' }}
          />
          <div
            className="border border-solid border-primary border-t-transparent border-l-transparent border-r-transparent py-2"
            dangerouslySetInnerHTML={{ __html: value?.description?.ky?.slice(0, 100) || '' }}
          />
          <div
            className="border border-solid border-primary border-t-transparent border-l-transparent border-r-transparent py-2"
            dangerouslySetInnerHTML={{ __html: value?.description?.en?.slice(0, 100) || '' }}
          />
        </>
      ),
    },
    {
      title: 'Фотографии',
      width: 100,
      render: (_row, value) => (
        <>
          <Image width={50} src={value?.image_name} alt={value?.title?.ru || 'news image'} />
        </>
      ),
    },
    {
      title: 'Дата публикации',
      width: 100,
      render: (_row, value) => <p>{dayjs(value?.date).locale('ru').format('D MMMM, YYYY')}</p>,
    },
    {
      title: 'Дата изменения',
      width: 100,
      render: (_row, value) => (
        <p>{dayjs(value?.updated_at).locale('ru').format('D MMMM, YYYY')}</p>
      ),
    },
    {
      align: 'end',
      width: 100,
      render: (_row, value) => (
        <div onClick={() => setNewsItem(value)}>
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
      <Table
        columns={columns}
        dataSource={list}
        pagination={false}
        scroll={{ x: 'max-content', y: 135 * 5 }}
      />
    </div>
  );
};
