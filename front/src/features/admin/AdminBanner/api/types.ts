export interface ApiBanner {
  id_banner: number;
  banner_title: string;
  banner_url: string;
  image: string;
}

export interface ApiBannerRequest {
  id_banner: number;
  banner_title: string;
  banner_url: string;
  image: string;
}

export interface ApiBannerData extends Array<ApiBanner> {}
