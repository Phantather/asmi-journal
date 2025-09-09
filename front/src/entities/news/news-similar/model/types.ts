export interface INewsSimilarImage {
  id: number;
  image_name: string;
}

export interface NewsSimilarItem {
  active: boolean;
  date: string;
  description: string | null;
  id: number;
  id_type: number;
  image_name: string;
  title: string;
  type_name: string;
  updated_at: string;
}

export interface NewsSimilarList extends Array<NewsSimilarItem> {}
