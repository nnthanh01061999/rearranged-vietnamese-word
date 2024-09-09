export interface IMainResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface IDataSource<T> {
  items: T[];
  total: number;
  loading?: boolean;
}

export interface IMainResponseAffected {
  rows_affected: number;
}

export interface IMainUpdatePayload<T> {
  id: number | string;
  payload: T;
}

export interface IPaginationParams {
  page: number;
  size: number;
}

export interface IItemIds {
  item_ids: number[];
}

export type IApiResponse<T> = IMainResponse<IDataSource<T>>;
export type IApiDetailResponse<T> = IMainResponse<T>;
