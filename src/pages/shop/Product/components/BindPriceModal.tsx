import { getAllCurrency } from '@/services/config/system/currency';
import { bindProductPrice } from '@/services/shop/product/list';
import { DrawerForm, ProFormDependency, ProFormMoney, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useState } from 'react';


type BindPriceModalProps = {
  csrftoken?: string;
  refresh: () => void;
}
const BindPriceModal: React.FC<BindPriceModalProps> = (props) => {
  const allCurrency = useRequest(getAllCurrency);
  const [ drawerVisible, setDrawerVisible ] = useState(false)
  const params = useParams();
  const bindSpecs = useRequest((values: ProductModule.BindSpecsBody) => {
    return bindProductPrice(parseInt(params.id as string), values, props.csrftoken as string)
  }, {
    manual: true,
    onSuccess: res => {
      if (res.code === 200) {
        message.success(res.message);
        props.refresh();
        setDrawerVisible(false)
        return false
      }
      message.error(res.message)
    }
  })
  const getCurrencyMark = (currency: number) => {
    if (currency && allCurrency.data?.data) {
      return allCurrency.data.data.filter(item => item.id === currency)[0].mark
    }
    return ''
  }
  return (
    <DrawerForm
      title="绑定新价格"
      width={400}
      open={drawerVisible}
      onOpenChange={(visible) => setDrawerVisible(visible)}
      loading={allCurrency.loading}
      trigger={<Button type="primary">绑定新价格</Button>}
      submitTimeout={500}
      onFinish={async (values: ProductModule.BindSpecsBody) => {
        bindSpecs.run(values)
      }}>
      <ProFormSelect
        name="currency"
        label="货币"
        placeholder="请选择货币"
        options={allCurrency.data?.data.map(item => ({label: `${item.country.name} - ${item.abbreviation} - ${item.mark}`, value: item.id}))}
        rules={[
          {required: true, message: '请先选择货币'}
        ]}
      />
      <ProFormText
        name="sku"
        label="SKU"
        tooltip="最长为 24 位"
        fieldProps={{maxLength: 24}}
        placeholder="请输入SKU"
        rules={[
          {required: true, message: '商品SKU不能为空'},
          {pattern: /^[A-Za-z0-9\\_]*$/, message: '只能输入英文、数字和下划线'}
        ]}
      />
      <ProFormText
        name="sku_name"
        label="SKU名称"
        tooltip="用于显示在前台，最长为 32 位"
        fieldProps={{maxLength: 32}}
        rules={[
          {required: true, message: '请输入SKU名称'}
        ]} />
      <ProFormDependency name={['currency']}>
        {({ currency }) => {
          return (
            <ProFormMoney
              label="价格"
              name="price"
              customSymbol={getCurrencyMark(currency)}
              rules={[
                {required: true, message: '请输入价格'},
                {pattern: /^((?!0[0-9])\d+(\.\d{1,2})?)$/, message: '请输入正确的价格，保留两位小数点'}
              ]} />
          );
        }}
      </ProFormDependency>
    </DrawerForm>
  )
}

export default React.memo(BindPriceModal);