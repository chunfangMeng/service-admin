import { getCsrfToken } from '@/services/common';
import { getStaffPermission, modifyPermissions } from '@/services/manager/staff';
import { ProCard, ProForm, ProFormCheckbox, ProFormInstance } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
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
    modifyPermission.run({...formatPermission(), ...values});
  }

  const onParentChange = (e: CheckboxChangeEvent) => {
    let changePermission: ManagerStaff.PermissionForm = {}
    allPermission.forEach(item => {
      item.children?.forEach(subItem => {
        changePermission[subItem.value] = e.target.checked
      })
    })
    formRef.current?.setFieldsValue(changePermission);
  }

  const onChildChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      allPermission.forEach(item => {
        let isHasAll = true;
        item.children?.forEach(subItem => {
          if (!formRef.current?.getFieldValue(subItem.value)) {
            isHasAll = false
          }
        })
        if (isHasAll) formRef.current?.setFieldsValue(Object.fromEntries([[item.value, true]]));
      })
      return false
    }
    allPermission.forEach(item => {
      let isHasAll = false;
      item.children?.forEach(subItem => {
        if (formRef.current?.getFieldValue(subItem.value)) {
          isHasAll = true
        }
      })
      if (!isHasAll) formRef.current?.setFieldsValue(Object.fromEntries([[item.value, false]]));
    })
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
                    name={item.value}
                    fieldProps={{
                      onChange: onParentChange
                    }}>
                    {item.label}
                  </ProFormCheckbox>
              }>
                {
                  item.children && item.children.map(children => {
                    return (
                      <ProFormCheckbox 
                        key={children.value} 
                        name={children.value}
                        fieldProps={{
                          onChange: onChildChange
                        }}>
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