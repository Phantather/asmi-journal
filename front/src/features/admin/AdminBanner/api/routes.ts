export const routes = {
  createBanner: () => `/banner/save`,
  updateBanner: (id: number) => `/banner/update?id_banner=${id}`,
  deleteBanner: (id: number) => `/banner/delete?id_banner=${id}`,
};
