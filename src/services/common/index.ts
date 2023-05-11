import { request } from "@umijs/max";



export async function getCsrfToken() {
  return request<API.Response<string>>('/api/v1/open/csrf/token/')
}