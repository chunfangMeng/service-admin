import { getProductSpecs } from "@/services/shop/product/list";
import { EditableProTable, ProColumns } from "@ant-design/pro-components";
import { useParams, useRequest } from "@umijs/max";
import { Card } from "antd";
import React from "react";


const ProductSpecs: React.FC = () => {
  const params = useParams();
  const specsList = useRequest(() => {
    return getProductSpecs(params.id as string)
  }, {
    ready: typeof params.id !== "undefined" && params.id !== ""
  })
  const specsColumns: ProColumns<ProductModule.SpecsResults, any>[] = [{
    title: 'SKU',
    dataIndex: 'sku'
  }, {
    title: 'SKU名称',
    dataIndex: 'sku_name'
  }, {
    title: '价格',
    dataIndex: 'price',
    render: (_, entity) => (
      <span>{entity.currency.mark} {entity.price}</span>
    ),
  }, {
    title: '创建时间',
    dataIndex: 'create_at',
    editable: false
  }, {
    title: '创建人',
    dataIndex: 'founder'
  }]

  return (
    <Card
      className="mt-4"
      title="商品价格配置"
      loading={specsList.loading}>
      <EditableProTable
        rowKey={'id'}
        columns={specsColumns}
        request={async () => {
          return {
            data: specsList.data?.data,
            success: specsList.data?.code === 200
          }
        }} />
    </Card>
  )
}

export default React.memo(ProductSpecs);