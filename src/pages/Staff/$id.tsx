import { getStaffDetail } from '@/services/manager/staff';
import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import React from 'react';
import StaffPermission from './components/StaffPermission';


const StaffDetail: React.FC = () => {
  const params = useParams();
  return (
    <PageContainer>
      <ProCard hoverable>
        <ProDescriptions
          request={async () => {
            const results = await getStaffDetail(Number(params.id))
            return {
              success: results.code === 200,
              data: results.data
            }
          }}>
          <ProDescriptions.Item 
            label="工号" 
            dataIndex={'job_number'} />
          <ProDescriptions.Item 
            label="用户名" 
            dataIndex={['user', 'username']} />
          <ProDescriptions.Item 
            label="昵称"
            dataIndex={'nickname'} />
          <ProDescriptions.Item 
            label="联系电话" 
            dataIndex={'phone'} />
          <ProDescriptions.Item 
            label="性别" 
            dataIndex={'gender'}
            valueEnum={{
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
            }} />
          <ProDescriptions.Item 
            label="注册时间" 
            dataIndex={'create_at'} />
          <ProDescriptions.Item 
            label="邮箱" 
            dataIndex={['user', 'email']} />
        </ProDescriptions>
      </ProCard>

      <StaffPermission />
    </PageContainer>
  )
}

export default StaffDetail;