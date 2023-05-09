import { request } from "@umijs/max";

export async function getCategory(params: any) {
  return request<API.Response<API.PaginatorRes<ProductCategory.CategoryItem>>>('/api/v1/stock/management/category/', {params: params})
}