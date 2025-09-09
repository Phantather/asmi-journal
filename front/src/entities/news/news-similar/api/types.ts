export interface NewsSimilarImage {
  id: number;
  image_name: string;
}

export interface ApiNewsSimilar {
  id: number;
  id_type: number;
  type_name: string;
  title: string;
  description: string;
  date: string;
  updated_at: string;
  active: boolean;
  images: NewsSimilarImage[];
}

export interface INewsSimilarParams {
  title: string | null;
  id: number;
}

export interface ApiNewsSimilarData {
  data?: ApiNewsSimilar[];
  error?: boolean;
}
