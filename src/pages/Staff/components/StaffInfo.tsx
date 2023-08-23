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
        props.onOpenChange(false);
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
        placeholder={"请输入昵称"}
        rules={[
          {required: true, message: '昵称不能为空'}
        ]} />
      <ProFormText
        label="联系电话"
        name="phone"
        placeholder={"请输入联系电话"}
        rules={[
          {required: true, message: '联系电话不能为空'}
        ]} />
      <ProFormRadio.Group
        label="性别"
        name="gender"
        options={[
          {label: '未知', value: 0},
          {label: '男', value: 1},
          {label: '女', value: 2},
          {label: '保密', value: 3}
        ]}
        rules={[
          {required: true, message: '请选择性别'}
        ]} />
      <ProFormText
        label="电子邮箱"
        name={['user', 'email']}
        placeholder="电子邮箱"
        rules={[
          {required: true, message: '请输入电子邮箱'},
          {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '电子邮箱格式错误'}
        ]} />
    </DrawerForm>
  )
}

export default React.memo(StaffInfo);