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

/**商品绑定属性 */
export async function bindProductAttr(productId: number | string, attr_code: string, csrfToken: string) {
  return request<API.Response<[]>>(`/api/v1/stock/management/product/${productId}/bind/attr/`, {
    method: 'POST',
    data: {
      attr_code: attr_code
    },
    headers: {
      'X-CSRFToken': csrfToken
    }
  })
}

/**解绑商品的属性值 */
export async function unbindProductAttr(productId: number | string, attrList: string[], csrfToken: string) {
  return request<API.Response<[]>>(`/api/v1/stock/management/product/${productId}/unbind/attr/`, {
    method: 'DELETE',
    data: {
      attr_value_code: attrList
    },
    headers: {
      'X-CSRFToken': csrfToken
    }
  })
}

/**获取所有属性组和属性值 */
export async function getAllAttrGroupValue(params: ProductModule.AttrGroupParams) {
  return request<API.Response<ProductAttr.AttrGroup[]>>('/api/v1/stock/management/attribute/', {
    method: 'GET',
    params: params
  })
}

/**获取商品价格配置 */
export async function getProductSpecs(productId: string | number) {
  return request<API.Response<ProductModule.SpecsResults[]>>(`/api/v1/stock/management/product/${productId}/specs/`, {
    method: 'GET'
  })
}