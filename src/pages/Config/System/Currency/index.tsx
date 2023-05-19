import { getAllCurrency } from '@/services/config/system/currency';
import { PageContainer, ParamsType, ProTable, ProTableProps } from '@ant-design/pro-components';
import React from 'react';


const CurrencySetting: React.FC = () => {
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
      hideInTable: true,
      fieldProps: {
        placeholder: '货币简称、货币名称、货币代码'
      }
    }],
    rowKey: 'id',
    pagination: false,
    request: async (params) => {
      const results = await getAllCurrency(params)
      return {
        data: results.data,
        success: results.code === 200
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