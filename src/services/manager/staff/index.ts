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