import { request } from '@umijs/max';


export async function getAllManagerStaff(params?: ManagerStaff.StaffFilter) {
  return request<API.Response<API.PaginatorRes<ManagerStaff.StaffUser>>>('/api/v1/manager/staff/', {
    method: 'GET',
    params: params
  })
}

export async function getStaffDetail(staffId: number) {
  return request<API.Response<ManagerStaff.StaffUser>>(`/api/v1/manager/staff/${staffId}/`, {
    method: 'GET'
  })
}

/**获取员工权限 */
export async function getStaffPermission(staffId: number) {
  return request<API.Response<ManagerStaff.StaffPermission>>(`/api/v1/manager/staff/${staffId}/user/permission/`, {
    method: 'GET'
  })
}

/**设置员工权限 */
export async function modifyPermissions(staffId: number, values: ManagerStaff.PermissionForm, csrfToken: string) {
  return request<API.Response<[]>>(`/api/v1/manager/staff/${staffId}/permission/modify/`, {
    method: 'put',
    data: {
      permissions: values
    },
    headers: {
      'X-CSRFToken': csrfToken
    }
  })
}

/**修改个人信息 */
export async function modifyStaffInfo(staffId: number, values: ManagerStaff.BaseInfo) {
  return request<API.Response<[]>>(`/api/v1/manager/staff/${staffId}/modify/info/`, {
    method: 'patch',
    data: values
  })
}

/**修改员工登录密码 */
export async function modifyLoginPwd(staffId: number, values: ManagerStaff.ModifyPwd) {
  return request<API.Response<[]>>(`/api/v1/manager/staff/${staffId}/modify/pwd/`, {
    method: 'post',
    data: values
  })
}