import { deleteProductSpecs, editProductSpecs, getProductSpecs } from "@/services/shop/product/list";
import { EditableProTable, ProColumns } from "@ant-design/pro-components";
import { useParams, useRequest } from "@umijs/max";
import { Card, message, Space } from "antd";
import React, { useState } from "react";
import BindPriceModal from "./BindPriceModal";

type ProductSpecsProps = {
  csrftoken?: string;
}
const ProductSpecs: React.FC<ProductSpecsProps> = (props) => {
  const params = useParams();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const specsList = useRequest(() => {
    return getProductSpecs(params.id as string)
  }, {
    ready: typeof params.id !== "undefined" && params.id !== ""
  })
  const deleteSpecs = useRequest((specsId: number) => {
    return deleteProductSpecs(parseInt(params.id as string), specsId, props.csrftoken as string)
  }, {
    manual: true,
    ready: typeof params.id !== "undefined",
    onSuccess: res => {
      specsList.run();
      if (res.code === 200) {
        message.success(res.message);
        return false;
      }
      message.error(res.message);
    }
  })
  const editSpecs = useRequest((values: ProductModule.EditSpecs) => {
    return editProductSpecs(parseInt(params.id as string), values, props.csrftoken as string)
  }, {
    manual: true,
    ready: typeof params.id !== "undefined",
    onSuccess: res => {
      specsList.run();
      if (res.code === 200) {
        message.success(res.message);
        return false;
      }
      message.error(res.message)
    }
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
    title: '最近更新人',
    dataIndex: 'last_editor',
    readonly: true
  }, {
    title: '最近更新时间',
    dataIndex: 'last_update',
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
        editable={{
          type: 'single',
          editableKeys,
          onSave: async (key, record) => {
            editSpecs.run({id: record.id, sku_name: record.sku_name, price: record.price})
          },
          onDelete: async (_, row) => {
            deleteSpecs.run(row.id)
          },
          onChange: async (editableKeys) => {
            setEditableRowKeys(editableKeys)
          },
        }}
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