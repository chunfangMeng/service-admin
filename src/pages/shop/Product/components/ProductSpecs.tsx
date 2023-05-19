import { getProductSpecs } from "@/services/shop/product/list";
import { EditableProTable, ProColumns } from "@ant-design/pro-components";
import { useParams, useRequest } from "@umijs/max";
import { Card, Space } from "antd";
import React from "react";
import BindPriceModal from "./BindPriceModal";

type ProductSpecsProps = {
  csrftoken?: string;
}
const ProductSpecs: React.FC<ProductSpecsProps> = (props) => {
  const params = useParams();
  const specsList = useRequest(() => {
    return getProductSpecs(params.id as string)
  }, {
    ready: typeof params.id !== "undefined" && params.id !== ""
  })
  const specsColumns: ProColumns<ProductModule.SpecsResults, any>[] = [{
    title: 'SKU',
    dataIndex: 'sku',
    readonly: true
  }, {
    title: 'SKU名称',
    dataIndex: 'sku_name'
  }, {
    title: '价格',
    dataIndex: 'price',
    render: (_, entity) => (
      <span className="text-rose-600 font-semibold">{entity.currency?.mark} {entity.price}</span>
    ),
  }, {
    title: '创建时间',
    dataIndex: 'create_at',
    readonly: true
  }, {
    title: '创建人',
    dataIndex: 'founder',
    readonly: true
  }, {
    title: '操作',
    dataIndex: 'actions',
    valueType: 'option',
    readonly: true,
    render: (text, record, _, action) => (
      <Space>
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>
      </Space>
    )
  }]

  return (
    <Card
      className="mt-4"
      title="商品价格配置"
      loading={specsList.loading}>
      <EditableProTable<ProductModule.SpecsResults>
        rowKey={'id'}
        columns={specsColumns}
        recordCreatorProps={false}
        toolBarRender={() => [
          <BindPriceModal 
            key={"bindPrice"} 
            csrftoken={props.csrftoken}
            refresh={() => specsList.run()}/>
        ]}
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