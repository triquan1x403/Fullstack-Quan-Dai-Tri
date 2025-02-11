export type PaginationMetadataType = {
  take: number;
  page: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  beginRange: number;
  endRange: number;
};

export type PaginationMetadataOptionType = {
  take: number;
  page: number;
};

export type PaginationMetadataInterfaceType = {
  options: PaginationMetadataOptionType;
  count: number;
};
