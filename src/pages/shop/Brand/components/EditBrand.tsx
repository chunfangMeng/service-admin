import { createProductBrand, editBrand, getBrandOptions } from '@/services/shop/brand/list';
import { DrawerForm, ProForm, ProFormInstance, ProFormSelect, ProFormText, ProSkeleton } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import React, { useRef, useEffect } from 'react';


type EditBrandProps = {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  initValues?: Product.BrandListItem;
  csrfToken?: string;
  onRefresh: () => void;
}

const EditBrand: React.FC<EditBrandProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const brandOptions = useRequest(getBrandOptions);
  const editRequest = useRequest(editBrand, {manual: true})
  const createBrand = useRequest(createProductBrand, {manual: true})
  const onFinish = async (data: Product.CreateBrand) => {
    if (props.initValues) {
      editRequest.run(Object.assign(data, props.initValues), {'X-CSRFToken': props.csrfToken});
      props.onRefresh()
      return true;
    }
    createBrand.run(data, {'X-CSRFToken': props.csrfToken})
    props.onRefresh()
    return true;
  }
  useEffect(() => {
    if (props.open) {
      formRef.current?.resetFields()
      if (!props.initValues) {
        formRef.current?.setFieldsValue({
          status: brandOptions.data?.data.status_options[0].value
        })
      }
    }
  }, [props.open])
  return (
    <DrawerForm
      title="编辑品牌"
      formRef={formRef}
      open={props.open}
      onOpenChange={props.onOpenChange}
      initialValues={props.initValues}
      width={500}
      onFinish={onFinish}>
      {
        brandOptions.loading ? <ProSkeleton type="list" /> :
        <ProForm.Group labelLayout="inline">
          {
            props.initValues &&
            <ProFormText
              hidden
              name="id" />
          }
          {
            props.initValues ?
            <ProFormText
              disabled
              label="品牌代码"
              name="brand_code" /> :
            <ProFormText
              label="品牌代码"
              name="brand_code"
              tooltip="最长为 32 位"
              placeholder="请输入品牌代码"
              rules={[
                {
                  required: true,
                },
                {
                  pattern: /^[0-9a-zA-Z]*$/g,
                  message: '只能输入英文字符和数字'
                }
              ]} />
          }
          <ProFormText
            name="name"
            label="中文品牌名"
            tooltip="最长为 64 位"
            placeholder="请输入中文品牌名"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormText
            name="en_name"
            label="英文品牌名"
            tooltip="最长为 64 位"
            placeholder="请输入英文品牌名"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormSelect
            name="status"
            label="状态"
            options={brandOptions.data?.data.status_options ?? []} />
        </ProForm.Group>
      }
    </DrawerForm>
  )
}

export default React.memo(EditBrand);