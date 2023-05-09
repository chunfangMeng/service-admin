import { request } from '@umijs/max';


/** 获取验证码 */
export async function getCaptchaCode(options?: { [key: string]: any }) {
  return request<API.Response<ManagerUser.LoginCaptcha>>('/api/v1/open/captcha/', {
    method: 'GET',
    ...options
  })
}

/** 获取当前用户信息 */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request(`/api/v1/manager/user/info/`, {
    method: 'GET',
    ...(options || {})
  })
}

/**获取当前用户登录日志列表 */
export async function getUserLoginLogs() {
  return request<API.Response<API.PaginatorRes<ManagerUser.LoginLog>>>('/api/v1/manager/login/log/personal/')
}

/**获取会员列表 */
export async function getAllMember(params: ManagerUser.MemberFilter) {
  return request<API.Response<API.PaginatorRes<ManagerUser.MemberItem>>>('/api/v1/manager/member/', {params: params})
}