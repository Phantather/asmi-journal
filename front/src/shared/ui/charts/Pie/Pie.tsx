import { Pie as AntPie } from '@ant-design/plots';
// import { Pie } from '@ant-design/plots';

import { FC } from 'react';

type PieChartData = {
  type: string;
  value: number;
  color: string;
};

interface PieProps {
  data?: PieChartData[];
  angleField?: string;
  colorField?: string;
}

export const Pie: FC<PieProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const config = {
    appendPadding: 10,
    data: data.filter((x) => x.value > 0),
    angleField: 'value',
    colorField: 'type',
    color: function ({ type }: any) {
      return data.filter((x) => x.type === type)[0].color;
    },
    radius: 1,
    innerRadius: 0.6,
    height: 150,
    width: 260,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 9,
      },
    },
    autoFit: false,
    pieStyle: {
      lineWidth: 0,
      shadowColor: 'rgba(0, 0, 0, 0.16)',
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      cursor: 'pointer',
    },
    statistic: {
      title: false as const,
      content: {
        style: {
          whiteSpace: 'wrap',
          overflow: 'auto',
          zIndex: '1',
          lineHeight: '18px',
          // fontSize: 18,
        },
        formatter: function formatter() {
          return `total\n134`;
        },
      },
    },
  };

  return <AntPie {...config} />;
};
