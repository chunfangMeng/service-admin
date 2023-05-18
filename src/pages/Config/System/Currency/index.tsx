import { getAllCurrency } from '@/services/config/system/currency';
import { PageContainer, ParamsType, ProTable, ProTableProps } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import React from 'react';


const CurrencySetting: React.FC = () => {
  const currencyResult = useRequest(() => {
    return getAllCurrency()
  })
  const currencyTable: ProTableProps<SystemConfig.CurrencyItem, ParamsType> = {
    columns: [{
      title: '国家',
      dataIndex: ['country', 'name'],
      hideInSearch: true
    }, {
      title: '货币简称',
      dataIndex: 'abbreviation',
      hideInSearch: true
    }, {
      title: '货币符号',
      dataIndex: 'mark',
      hideInSearch: true
    }, {
      title: '货币名称',
      dataIndex: 'name',
      hideInSearch: true
    }, {
      title: '货币代码',
      dataIndex: 'code',
      hideInSearch: true
    }, {
      title: '关键词搜索',
      dataIndex: 'keyword',
      hideInTable: true
    }],
    rowKey: 'id',
    pagination: false,
    request: async () => {
      return {
        data: currencyResult.data?.data,
        success: currencyResult.data?.code === 200
      }
    }
  }
  return (
    <PageContainer>
      <ProTable
        {...currencyTable} />
    </PageContainer>
  )
}

export default CurrencySetting;