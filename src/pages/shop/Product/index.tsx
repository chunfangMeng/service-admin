import { getShopProducts } from '@/services/shop/product/list';
import { PageContainer, ProTable, ProTableProps } from '@ant-design/pro-components';
import React from 'react';


const ProductList: React.FC = () => {
  const productTable: ProTableProps<any, any> = {
    columns: [{
      title: '商品编号',
      dataIndex: 'spu_number'
    }, {
      title: '商品名称',
      dataIndex: 'name'
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