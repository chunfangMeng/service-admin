import { modifyStaffInfo } from '@/services/manager/staff';
import { DrawerForm, ProFormInstance, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect, useRef } from 'react';


interface StaffInfoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffinfo?: ManagerStaff.StaffUser;
}
const StaffInfo: React.FC<StaffInfoProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const modifyInfo = useRequest((values: ManagerStaff.BaseInfo) => {
    return modifyStaffInfo(props.staffinfo?.id as number, values)
  }, {
    manual: true,
    onSuccess: res => {
      if (res.code === 200) {
        message.success(res.message);
        return false;
      }
      message.error(res.message);
    }
  })
  useEffect(() => {
    if (props.staffinfo) {
      formRef.current?.resetFields();
    }
  }, [props.staffinfo])
  return (
    <DrawerForm
      {...props}
      formRef={formRef}
      title="修改个人信息"
      width={420}
      initialValues={props.staffinfo}
      onFinish={async (values: ManagerStaff.BaseInfo) => {
        modifyInfo.run(values);
      }}>
      <ProFormText
        label="昵称"
        name="nickname"
        placeholder={"请输入昵称"} />
      <ProFormText
        label="联系电话"
        name="phone"
        placeholder={"请输入联系电话"} />
      <ProFormRadio.Group
        label="性别"
        name="gender"
        options={[
          {label: '未知', value: 0},
          {label: '男', value: 1},
          {label: '女', value: 2},
          {label: '保密', value: 3}
        ]} />
      <ProFormText
        label="电子邮箱"
        name={['user', 'email']}
        placeholder="电子邮箱" />
    </DrawerForm>
  )
}

export default React.memo(StaffInfo);