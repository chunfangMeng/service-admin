import { getShopProducts } from '@/services/shop/product/list';
import { PlusOutlined, RightOutlined, UploadOutlined } from '@ant-design/icons';
import { EditableProTable, PageContainer, ProColumns, QueryFilter, ProFormDateRangePicker, ProFormText } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Button, Space } from 'antd';
import React, { useState } from 'react';


const ProductList: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const columns: ProColumns<ProductModule.ProductItem>[] = [{
    title: '商品编号',
    dataIndex: 'spu_number',
    readonly: true
  }, {
    title: '商品名称',
    dataIndex: 'name',
    width: '16%',
  }, {
    title: '副标题',
    dataIndex: 'sub_name',
    width: '16%',
  }, {
    title: '货号',
    dataIndex: 'item_no',
  }, {
    title: '产地',
    dataIndex: 'place_of_origin',
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
    width: '16%',
    render: (text, record, _, action) => (
      <Space wrap>
        <Button size="small" ghost type="primary" onClick={() => {action?.startEditable?.(record.id);}}>编辑</Button>
        <Button danger size="small">删除</Button>
        <Button type="link" size="small" icon={<RightOutlined />}>
          <Link to={`/shop/product/${record.id}`}>详情</Link>
        </Button>
      </Space>
    )
  }]
  return (
    <PageContainer>
      <div className='bg-white mb-4 p-0'>
        <QueryFilter
          defaultCollapsed
          split
          onFinish={async (values) => {
            console.log(values.name);
          }}
        >
          <ProFormDateRangePicker name="create" label="创建时间" />
          <ProFormText name="keyword" label="关键词搜索" placeholder={"请输入关键词"}/>
        </QueryFilter>
      </div>
      <EditableProTable<ProductModule.ProductItem> 
        columns={columns}
        rowKey="id"
        scroll={{
          x: 960,
        }}
        recordCreatorProps={false}
        toolBarRender={() => [
          <Space key={'toolbar-container'}>
            <Button ghost type="primary" icon={<UploadOutlined />}>批量上传</Button>
            <Button type="primary" icon={<PlusOutlined />}>创建商品</Button>
          </Space>
        ]}
        request={async () => {
          const result = await getShopProducts();
          return {
            data: result.data.results,
            success: result.code === 200,
            total: result.data.count
          }
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
          },
          onChange: setEditableRowKeys,
          onDelete: async (key, row) => {
            console.log(key, row)
          },
        }}/>
    </PageContainer>
  )
}

export default ProductList;