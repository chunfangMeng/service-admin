import { getAllMember } from '@/services/user/api';
import { PageContainer, ProTable, ProTableProps } from '@ant-design/pro-components';
import React from 'react';


const MemberList: React.FC = () => {
  const memberProps: ProTableProps<ManagerUser.MemberItem, any> = {
    columns: [{
      title: '用户名',
      dataIndex: ['user', 'username'],
      hideInSearch: true
    }, {
      title: '昵称',
      dataIndex: 'nickname',
      hideInSearch: true
    }, {
      title: '性别',
      dataIndex: 'gender',
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
      title: '联系电话',
      dataIndex: 'phone',
      hideInSearch: true
    }, {
      title: '电子邮箱',
      dataIndex: 'email',
      order: 10
    }, {
      title: '关键词搜索',
      dataIndex: 'keyword',
      hideInTable: true,
    }, {
      title: '注册时间',
      dataIndex: 'create_at',
      hideInSearch: true
    }, {
      title: '注册时间',
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
    }],
    cardBordered: true,
    rowKey: 'id',
    request: async (params: ManagerUser.MemberFilter) => {
      params.page = params.current
      params.page_size = params.pageSize
      params.current = params.pageSize = undefined
      const results = await getAllMember(params)
      return {
        data: results.data.results,
        success: results.code === 200,
        total: results.data.count
      }
    }
  }
  return (
    <PageContainer>
      <ProTable {...memberProps}/>
    </PageContainer>
  )
}

export default MemberList;