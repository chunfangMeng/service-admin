import { request } from "@umijs/max";

/**获取货币配置列表 */
export async function getAllCurrency(params?: {keyword?: string} & API.ResultListFilter) {
  return request<API.Response<SystemConfig.CurrencyItem[]>>('/api/v1/open/config/currency/', {
    method: 'GET',
    params: params
  })
}