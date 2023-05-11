import { request } from "@umijs/max";

/**获取属性组 */
export async function getAttributeGroupList() {
  return request<API.Response<API.PaginatorRes<ProductAttr.AttrGroup>>>('/api/v1/stock/management/attribute/', {
    method: 'GET'
  })
}

/** 删除属性组中的值 */
export async function deleteAttributeValue(attrGroupId: number, valueCode: string, csrfToken: string) {
  return request<API.Response<[]>>(`/api/v1/stock/management/attribute/${attrGroupId}/delete/value/`, {
    method: 'DELETE', 
    data: {attr_value_code: valueCode},
    headers: {
      'X-CSRFToken': csrfToken
    }
  })
}

export async function changeAttrValueStatus(attrGroupId: number, valueCode: string, status: number, csrfToken: string) {
  return request<API.Response<[]>>(`/api/v1/stock/management/attribute/${attrGroupId}/value/status/`, {
    method: 'PATCH',
    data: {
      attr_value_code: valueCode,
      status: status
    },
    headers: {
      'X-CSRFToken': csrfToken
    }
  })
}