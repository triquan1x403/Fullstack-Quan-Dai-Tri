export const paginationHandler = (take: number = 10, page: number = 1) => ({
  take,
  page,
  skip: (page - 1) * take,
});
