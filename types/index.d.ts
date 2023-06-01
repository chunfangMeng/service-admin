declare namespace API {
  type Response<T> = {
    code: number;
    data: T;
    message: string;
  }

  type PaginatorRes<T> = {
    next: string | null;
    previous: string | null;
    count: number;
    results: T[];
  }

  type PaginatorParams = {
    page?: number;
    page_size?: number;
  }

  type ResultListFilter = {
    current?: number;
    pageSize?: number;
  } & Pick<PaginatorParams, 'page' | 'page_size'>
}
