export interface INewsDetailImage {
  id: number;
  url: string;
}

export interface INewsDetailContentImage {
  id: number;
  name: string;
  url: string;
}

export interface INewsDetailContent {
  [key: `description_${string}`]: string | null;
  id: number;
  images: INewsDetailContentImage[];
}

export interface NewsDetailItem {
  id: number;
  id_type: number;
  type_name: string;
  title: {
    ru: string | null;
    ky: string | null;
    en: string | null;
  };
  content: INewsDetailContent[];
  description: {
    ru: string | null;
    ky: string | null;
    en: string | null;
  };
  date: string;
  updated_at: string;
  active: boolean;
  main_images: INewsDetailImage[];
  is_special_offer: boolean;
}

export interface NewsDetailList extends NewsDetailItem {}
