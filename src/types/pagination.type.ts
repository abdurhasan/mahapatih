import { PaginationInput } from './pagination.input';

export class PaginationResponse {
  total: number; // total
  lastPage: number; // total page
  currentPage: number; // page
  perPage: number; // limit
  from: number;
  to: number; // total

  constructor({ limit, total, page }: PaginationInput) {
    this.total = total;
    this.lastPage = Math.ceil(total / limit);
    this.currentPage = page;
    this.from = 0;
    this.to = total;
  }
}

export class PaginationOptions {
  page: number;
  limit: number;
  offset: number;
}
