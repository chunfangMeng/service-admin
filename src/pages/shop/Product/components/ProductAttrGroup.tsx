import { ActionType, ProTable, ProTableProps } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Card } from 'antd';
import { ExpandableConfig } from 'antd/es/table/interface';
import React, { useEffect, useRef } from 'react';


type ProductAttrProps = {
  data?: ProductAttr.AttrGroup[];
}
const ProductAttrGroup: React.FC<ProductAttrProps> = (props) => {
  const attrAction = useRef<ActionType>();
  const intl = useIntl()
  const expandableAttr: ExpandableConfig<ProductAttr.AttrGroup> = {
    expandedRowRender: (record) => {
      const attrValue: ProTableProps<ProductAttr.AttributeValue, []> = {
        columns: [{
          title: intl.formatMessage({id: 'pages.code'}),
          dataIndex: 'value_code'
        }, {
          title: intl.formatMessage({id: 'pages.attribute.group.value'}),
          dataIndex: 'attr_value',
        }],
        rowKey: 'id',
        search: false,
        headerTitle: false,
        options: false,
        pagination: false,
        dataSource: record.attr_values
      }
      return (
        <ProTable {...attrValue}/>
      )
    }
  }
  const productAttr: ProTableProps<ProductAttr.AttrGroup, any> = {
    columns: [{
      title: '属性组',
      dataIndex: 'name'
    }, {
      title: '属性组代码',
      dataIndex: 'code'
    }, {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: intl.formatMessage({id: 'pages.switch.available'}),
          status: 'Success'
        },
        1: {
          text: intl.formatMessage({id: 'pages.switch.unavailable'}),
          status: 'Error'
        }
      }
    }],
    rowKey: 'id',
    search: false,
    actionRef: attrAction,
    expandable: expandableAttr,
    pagination: false,
    request: async () => {
      return {
        data: props.data,
        success: typeof props.data !== "undefined"
      }
    },
    toolBarRender: () => [
      <Button ghost key="bind_attr" type="primary">绑定新属性</Button>
    ]
  }
  useEffect(() => {
    attrAction.current?.reload();
  }, [props.data])
  return (
    <Card
      className='mt-4'
      title="商品属性">
      <ProTable 
        {...productAttr}/>
    </Card>
  )
}

export default React.memo(ProductAttrGroup);