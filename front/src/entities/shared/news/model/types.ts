export interface INewsImage {
  id: number;
  image_name: string;
}

export interface NewsItem {
  active: boolean;
  date: string;
  description: {
    ru: string | null;
    ky: string | null;
    en: string | null;
    [key: string]: string | null; // Add index signature
  };
  id: number;
  id_type: number;
  image_name: string;
  title: {
    ru: string | null;
    ky: string | null;
    en: string | null;
    [key: string]: string | null; // Add index signature
  };
  type_name: string;
  updated_at: string;
}

export interface NewsList extends Array<NewsItem> {}
