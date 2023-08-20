import { getCsrfToken } from '@/services/common';
import { getStaffPermission, modifyPermissions } from '@/services/manager/staff';
import { ProCard, ProForm, ProFormCheckbox, ProFormInstance } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { message } from 'antd';
import React, { useRef, useState } from 'react';


const StaffPermission: React.FC = () => {
  const params = useParams();
  const formRef = useRef<ProFormInstance>();
  const [ csrfToken, setCsrfToken ] = useState('');
  const [ initPermission, setInitPermission ] = useState<ManagerStaff.PermissionForm>();
  const [ allPermission, setAllPermission ] = useState<ManagerStaff.Permission[]>([]);
  const permissionRequest = useRequest(() => {
    return getStaffPermission(Number(params.id));
  }, {
    onSuccess: res => {
      if (res.code === 200) {
        setAllPermission(res.data.all_permission);
        setInitPermission(Object.fromEntries(res.data.has_permission.map(item => [item, true])));
      }
    }
  })

  useRequest(() => {
    return getCsrfToken()
  }, {
    onSuccess: res => {
      setCsrfToken(res.data);
    }
  })

  const modifyPermission = useRequest((values: ManagerStaff.PermissionForm) => {
    return modifyPermissions(Number(params.id), values, csrfToken)
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

  const formatPermission = () => {
    let permissionMap: ManagerStaff.PermissionForm = {};
    allPermission.forEach(item => {
      permissionMap[item.value] = false
      if (item.children && item.children.length > 0) {
        const childrenPermission = Object.fromEntries(item.children.map(item => [item.value, false]));
        permissionMap = {...permissionMap, ...childrenPermission}
      }
    })
    return permissionMap;
  }

  const onPermissionFinish = async (values: ManagerStaff.PermissionForm) => {
    console.log({...formatPermission(), ...values})
    modifyPermission.run({...formatPermission(), ...values});
  }
  return (
    <ProCard
      hoverable
      wrap
      loading={permissionRequest.loading}
      gutter={[16, 16]}
      className='mt-4'
      title="员工权限">
      <ProForm
        formRef={formRef}
        onFinish={onPermissionFinish}
        initialValues={initPermission}
        loading={modifyPermission.loading || permissionRequest.loading}>
      {
        allPermission.map(item => (
          <ProCard 
            key={item.value}
            className="mb-4"
            bordered>
            {
              <ProFormCheckbox.Group
                label={
                  <ProFormCheckbox
                    name={item.value}>
                    {item.label}
                  </ProFormCheckbox>
              }>
                {
                  item.children && item.children.map(children => {
                    return (
                      <ProFormCheckbox 
                        key={children.value} 
                        name={children.value}>
                        {children.label}
                      </ProFormCheckbox>
                    )
                  })
                }
              </ProFormCheckbox.Group>
            }
          </ProCard>
        ))
      }
      </ProForm>
    </ProCard>
  )
}

export default StaffPermission;