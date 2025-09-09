export const routes = {
  createNews: () => `/post/create`,
  createNewNews: () => `/post/create/new`,
  updateNews: (id: number) => `/post/update/${id}`,
  deleteNews: (id: number) => `/post/delete/${id}`,
};
