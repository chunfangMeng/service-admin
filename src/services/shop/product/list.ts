import { request } from "@umijs/max";

export async function getShopProducts() {
  return request<API.Response<API.PaginatorRes<ProductModule.ProductItem>>>('/api/v1/stock/management/product/')
}