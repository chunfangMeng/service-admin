import { getShopProducts } from '@/services/shop/product/list';
import { PageContainer, ParamsType, ProTable, ProTableProps } from '@ant-design/pro-components';
import React from 'react';


const ProductList: React.FC = () => {
  const productTable: ProTableProps<ProductModule.ProductItem, ParamsType> = {
    columns: [{
      title: '商品编号',
      dataIndex: 'spu_number',
      hideInSearch: true
    }, {
      title: '商品名称',
      dataIndex: 'name',
      hideInSearch: true
    }, {
      title: '副标题',
      dataIndex: 'sub_name',
      hideInSearch: true
    }, {
      title: '产地',
      dataIndex: 'place_of_origin',
      hideInSearch: true
    }, {
      title: '创建人',
      dataIndex: 'founder',
      hideInSearch: true
    }, {
      title: '创建时间',
      dataIndex: 'create_at',
      hideInSearch: true
    }, {
      title: '创建时间',
      dataIndex: 'create_at',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (values: [string, string]) => {
          return {
            create_start_date: values[0],
            create_end_date: values[1]
          }
        }
      }
    }],
    rowKey: 'id',
    request: async () => {
      const result = await getShopProducts();
      return {
        data: result.data.results,
        success: result.code === 200,
        total: result.data.count
      }
    }
  }
  return (
    <PageContainer>
      <ProTable {...productTable}/>
    </PageContainer>
  )
}

export default ProductList;