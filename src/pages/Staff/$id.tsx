import { getStaffDetail } from '@/services/manager/staff';
import { PageContainer, ProCard, ProDescriptions, ProDescriptionsActionType } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import ModifyPwd from './components/ModifyPwd';
import StaffInfo from './components/StaffInfo';
import StaffPermission from './components/StaffPermission';


const StaffDetail: React.FC = () => {
  const params = useParams();
  const actionRef = useRef<ProDescriptionsActionType>();
  const [ staffVisible, setStaffVisible ] = useState(false);
  const [ pwdVisible, setPwdVisible ] = useState(false);
  const [ staffInfo, setStaffInfo ] = useState<ManagerStaff.StaffUser>();
  const staffRequest = useRequest(() => {
    return getStaffDetail(Number(params.id))
  }, {
    onSuccess: res => {
      if (res.code === 200) {
        setStaffInfo(res.data);
        actionRef.current?.reload();
      }
    }
  })
  const onInfoVisible = (open: boolean) => {
    if (!open) staffRequest.run();
    setStaffVisible(open);
  }
  return (
    <PageContainer>
      <ProCard hoverable>
        <ProDescriptions
          actionRef={actionRef}
          title="员工信息"
          loading={staffRequest.loading}
          dataSource={staffRequest.data?.data}
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
                <Button ghost key="modifyInfo" type="primary" onClick={() => setStaffVisible(true)}>修改个人信息</Button>,
                <Button danger ghost key="modifyPwd" type="primary" onClick={() => setPwdVisible(true)}>修改密码</Button>,
              ]
            }
          ]} />
      </ProCard>

      <StaffPermission />
      <StaffInfo 
        open={staffVisible}
        onOpenChange={onInfoVisible}
        staffinfo={staffInfo}/>
      <ModifyPwd
        open={pwdVisible}
        onOpenChange={(open) => setPwdVisible(open)}
        staffinfo={staffInfo} />
    </PageContainer>
  )
}

export default StaffDetail;