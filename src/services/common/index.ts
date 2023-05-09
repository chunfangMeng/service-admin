import { request } from "@umijs/max";

export async function getCsrfToken() {
  return request('/api/v1/open/csrf/token/')
}