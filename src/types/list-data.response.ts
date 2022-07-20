import { PaginationResponse } from './pagination.type';

export interface IListDataResponse<T> {
  data: T[];
  pagination?: PaginationResponse;
}
