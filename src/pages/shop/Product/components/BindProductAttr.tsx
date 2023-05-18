import { bindProductAttr, getAllAttrGroupValue } from '@/services/shop/product/list';
import useRequest from '@ahooksjs/use-request';
import { ModalForm, ProForm, ProFormDependency, ProFormInstance, ProFormSelect } from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useRef } from 'react';


type BindAttrProps = {
  open: boolean;
  onCancel: () => void;
  csrftoken?: string;
  productid?: string;
}

type BindAttrData = {
  attr_group: string;
  attr_code: string;
}

const BindProductAttr: React.FC<BindAttrProps> = (props) => {
  const bindRef = useRef<ProFormInstance>()
  const allAttribute = useRequest(() => {
    return getAllAttrGroupValue({is_show_all: true})
  })
  const bindAttribute = useRequest((attrCode: string) => {
    return bindProductAttr(props.productid as string, attrCode, props.csrftoken as string)
  }, {
    manual: true,
    onSuccess: res => {
      if (res.code === 200) {
        message.success(res.message);
        props.onCancel();
        return false;
      }
      message.error(res.message);
    }
  })
  const getAttrByGroup = (attr_group: string) => {
    const matchValue = allAttribute.data?.data.filter(item => item.code === attr_group);
    if (matchValue && matchValue.length > 0) {
      return matchValue[0].attr_values.map(item => ({label: item.attr_value, value: item.value_code}))
    }
    return []
  }
  return (
    <ModalForm
      {...props}
      title="商品绑定属性"
      width={500}
      modalProps={{getContainer: false}}
      formRef={bindRef}
      loading={allAttribute.loading || bindAttribute.loading}
      onFinish={async (values: BindAttrData) => {
        bindAttribute.run(values.attr_code)
      }}>
      <ProForm.Group>
        <ProFormSelect
          label="属性组"
          fieldProps={{
            onChange() {
              bindRef.current?.setFieldsValue({attr_code: ''})
            }
          }}
          name="attr_group"
          options={allAttribute.data?.data.map(item => ({label: item.name, value: item.code}))}
          rules={[
            {required: true, message: '请选择属性组'}
          ]} />
        <ProFormDependency name={['attr_group']}>
          {({ attr_group }) => {
            return (
              <ProFormSelect
                options={getAttrByGroup(attr_group)}
                name="attr_code"
                label="属性"
                rules={[
                  {required: true, message: '请选择属性'}
                ]}
              />
            );
          }}
        </ProFormDependency>
      </ProForm.Group>
    </ModalForm>
  )
}

export default React.memo(BindProductAttr);