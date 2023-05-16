import { request } from "@umijs/max";

/**获取商城商品列表 */
export async function getShopProducts() {
  return request<API.Response<API.PaginatorRes<ProductModule.ProductItem>>>('/api/v1/stock/management/product/')
}

/**获取商城商品详情 */
export async function getShopProductInfo(productId: number) {
  return request<API.Response<ProductModule.ProductItem>>(`/api/v1/stock/management/product/${productId}/`)
}

/**获取商品图片 */
export async function getProductImages(productId: number | string) {
  return request<API.Response<ProductModule.ProductImage[]>>(`/api/v1/stock/management/product/${productId}/image/`, {
    method: 'GET'
  })
}