import { request } from "@umijs/max";


/**获取品牌列表 */
export async function getBrandList(params: any, options?: { [key: string]: any }) {
  return request<API.Response<API.PaginatorRes<Product.BrandListItem>>>('/api/v1/stock/management/brand/', {
    method: 'GET',
    params: params,
    ...(options || {})
  })
}

/**删除品牌 */
export async function deleteBrand(brandCode: string, headers?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.Response<[]>>(`/api/v1/stock/management/brand/${brandCode}/`, {
    method: 'DELETE',
    headers: headers,
    ...(options || {})
  })
}

/**编辑品牌 */
export async function editBrand(record: Product.BrandListItem, headers?: { [key: string]: any }) {
  return request(`/api/v1/stock/management/brand/${record.brand_code}/`, {
    method: 'PATCH',
    headers: headers,
    data: record
  })
}

export async function createProductBrand(data: Product.CreateBrand, headers?: { [key: string]: any }) {
  return request('/api/v1/stock/management/brand/', {
    method: 'POST',
    data: data,
    headers: headers
  })
}

/**获取brand options */
export async function getBrandOptions() {
  return request<API.Response<Product.BrandOptions>>('/api/v1/stock/management/brand/options/')
}