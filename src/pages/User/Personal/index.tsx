import { getUserLoginLogs } from '@/services/user/api';
import { PageContainer, ProCard, ProColumns, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';


const PersonalCenter: React.FC = () => {
  const intl = useIntl();
  const columns: ProColumns<ManagerUser.LoginLog>[] = [{
    title: intl.formatMessage({id: 'pages.personal.ip_address'}),
    dataIndex: 'ip_address'
  }, {
    title: intl.formatMessage({id: 'pages.personal.login.create_at'}),
    dataIndex: 'create_at'
  }, {
    title: intl.formatMessage({id: 'pages.personal.login.area'}),
    dataIndex: 'address'
  }, {
    title: intl.formatMessage({id: 'pages.personal.login.port'}),
    dataIndex: 'client',
    valueEnum: {
      0: {
        text: '前台登录',
        status: 'Processing'
      },
      1: {
        text: '管理端登录',
        status: 'Success'
      }
    }
  }]
  return (
    <PageContainer>
      <ProCard
        style={{ marginBlockStart: 8 }}
        gutter={[16, 16]}
        wrap
        title="登录日志"
      >
        <ProCard
          colSpan={24}
          layout="center"
          bordered
        >
        <ProTable
          className='w-full'
          columns={columns}
          rowKey="id"
          search={false}
          request={async () => {
            const res = await getUserLoginLogs()
            return {
              data: res.data.results,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: res.code === 200,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: res.data.count,
            }
          }} />
        </ProCard>
      </ProCard>
    </PageContainer>
  )
}

export default PersonalCenter;