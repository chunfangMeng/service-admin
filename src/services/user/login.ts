import { request } from "@umijs/max";


/** 登录接口 POST /api/v1/manager/user/login/ */
export async function login(body: ManagerUser.LoginParams, options?: { [key: string]: any }) {
  return request<API.Response<ManagerUser.LoginResult>>('/api/v1/manager/user/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function outLogin() {
  
}

