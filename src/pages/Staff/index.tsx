import { getAllManagerStaff } from '@/services/manager/staff';
import { PageContainer, ProTable, ProTableProps } from '@ant-design/pro-components';
import React from 'react';


const StaffList: React.FC = () => {
  const staffTableProps: ProTableProps<ManagerStaff.StaffUser, any> = {
    columns: [{
      title: '工号',
      dataIndex: 'job_number',
      hideInSearch: true
    }, {
      title: '用户名',
      dataIndex: ['user', 'username'],
      hideInSearch: true
    }, {
      title: '性别',
      dataIndex: 'gender',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '未知'
        },
        1: {
          text: '男'
        },
        2: {
          text: '女'
        },
        3: {
          text: '保密'
        }
      }
    }, {
      title: '昵称',
      dataIndex: 'nickname',
      hideInSearch: true
    }, {
      title: '邮箱',
      dataIndex: ['user', 'email'],
      hideInSearch: true
    }, {
      title: '联系电话',
      dataIndex: 'phone',
      hideInSearch: true
    }, {
      title: '注册时间',
      dataIndex: 'create_at',
      hideInSearch: true
    }, {
      title: '创建时间',
      dataIndex: 'create_at',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: [string, string]) => {
          return {
            create_start_date: value[0],
            create_end_date: value[1],
          };
        },
      },
    }, {
      title: '最近更新时间',
      dataIndex: 'last_update',
      hideInSearch: true
    }, {
      title: '关键词搜索',
      dataIndex: 'keyword',
      hideInTable: true,
      fieldProps: {
        placeholder: '工号、用户名、昵称'
      }
    }],
    rowKey: 'id',
    search: {
      labelWidth: 'auto'
    },
    pagination: {
      defaultPageSize: 20,
    },
    request: async (params) => {
      params.page = params.current
      params.page_size = params.pageSize
      params.current = params.pageSize = undefined
      const results = await getAllManagerStaff(params)
      return {
        success: results.code === 200,
        data: results.data.results,
        total: results.data.count
      }
    }
  }
  return (
    <PageContainer>
      <ProTable {...staffTableProps}/>
    </PageContainer>
  )
}

export default StaffList;