export interface BannerItem {
  id_banner: number;
  banner_title_ru: string;
  banner_title_ky: string;
  banner_title_en: string;
  banner_url: string;
}

export interface BannerList extends Array<BannerItem> {}
