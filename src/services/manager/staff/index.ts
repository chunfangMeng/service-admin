import { request } from '@umijs/max';


export async function getAllManagerStaff(params?: ManagerStaff.StaffFilter) {
  return request<API.Response<API.PaginatorRes<ManagerStaff.StaffUser>>>('/api/v1/manager/staff/', {
    method: 'GET',
    params: params
  })
}