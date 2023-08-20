import { getStaffDetail } from '@/services/manager/staff';
import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';
import StaffPermission from './components/StaffPermission';


const StaffDetail: React.FC = () => {
  const params = useParams();
  return (
    <PageContainer>
      <ProCard hoverable>
        <ProDescriptions
          title="员工信息"
          request={async () => {
            const results = await getStaffDetail(Number(params.id))
            return {
              success: results.code === 200,
              data: results.data
            }
          }}
          columns={[
            {
              title: '工号',
              key: 'job_number',
              dataIndex: 'job_number'
            },
            {
              title: '用户名',
              key: 'username',
              dataIndex: ['user', 'username']
            },
            {
              title: '昵称',
              key: 'nickname',
              dataIndex: 'nickname'
            },
            {
              title: '联系电话',
              key: 'phone',
              dataIndex: 'phone'
            },
            {
              title: '性别',
              key: 'gender',
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
            },
            {
              title: '注册时间',
              key: 'create_at',
              dataIndex: 'create_at'
            },
            {
              title: '邮箱',
              key: 'email',
              dataIndex: ['user', 'email']
            },
            {
              title: '操作',
              valueType: 'option',
              render: () => [
                <Button ghost key="modifyInfo" type="primary">修改个人信息</Button>,
                <Button ghost key="modifyPwd" type="primary">修改密码</Button>,
              ]
            }
          ]} />
      </ProCard>

      <StaffPermission />
    </PageContainer>
  )
}

export default StaffDetail;