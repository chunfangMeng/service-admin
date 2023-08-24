import { modifyLoginPwd } from '@/services/manager/staff';
import { DrawerForm, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { message } from 'antd';
import React from 'react';


interface ModifyPwdProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffinfo?: ManagerStaff.StaffUser;
}
const ModifyPwd: React.FC<ModifyPwdProps> = (props) => {
  const modify = useRequest((values: ManagerStaff.ModifyPwd) => {
    return modifyLoginPwd(props.staffinfo?.id as number, values)
  }, {
    manual: true,
    onSuccess: res => {
      if (res.code === 200) {
        message.success(res.message);
        props.onOpenChange(false)
        return false;
      }
      message.error(res.message);
    }
  })
  const onFormFinish = async (values: ManagerStaff.ModifyPwd) => {
    modify.run(values);
  }
  return (
    <DrawerForm
      {...props}
      width={300}
      title="修改登录密码"
      onFinish={onFormFinish}>
      <ProFormText.Password
        label="新密码"
        name="password"
        rules={[
          {required: true, message: '新密码不能为空'}
        ]}
         />
      <ProFormText.Password
        label="确认密码"
        name={"confirm_pwd"}
        rules={[
          {required: true, message: '确认密码不能为空'}
        ]} />
    </DrawerForm>
  )
}

export default React.memo(ModifyPwd);