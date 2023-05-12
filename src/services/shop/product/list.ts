import { request } from "@umijs/max";

export async function getShopProducts() {
  return request<API.Response<API.PaginatorRes<any>>>('/api/v1/stock/management/product/')
}