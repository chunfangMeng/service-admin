import { unbindProductAttr } from '@/services/shop/product/list';
import { ActionType, ProTable, ProTableProps } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Button, Card, message, Space } from 'antd';
import { ExpandableConfig } from 'antd/es/table/interface';
import React, { useEffect, useRef, useState } from 'react';
import BindProductAttr from './BindProductAttr';


type ProductAttrProps = {
  productid?: string;
  data?: ProductAttr.AttrGroup[];
  csrftoken?: string;
  refresh: () => void;
}
const ProductAttrGroup: React.FC<ProductAttrProps> = (props) => {
  const attrAction = useRef<ActionType>();
  const [ bindVisible, setBindVisible ] = useState(false);
  const intl = useIntl()
  const unbindAttr = useRequest((attrCodeList: string[]) => {
    return unbindProductAttr(props.productid as string, attrCodeList, props.csrftoken as string)
  }, {
    manual: true,
    onSuccess: res => {
      if (res.code === 200) {
        message.success(res.message);
        props.refresh()
        return false
      }
      message.error(res.message)
    }
  })
  const expandableAttr: ExpandableConfig<ProductAttr.AttrGroup> = {
    expandedRowRender: (record) => {
      const attrValue: ProTableProps<ProductAttr.AttributeValue, []> = {
        columns: [{
          title: intl.formatMessage({id: 'pages.code'}),
          dataIndex: 'value_code'
        }, {
          title: intl.formatMessage({id: 'pages.attribute.group.value'}),
          dataIndex: 'attr_value',
        }, {
          title: intl.formatMessage({id: 'pages.actions'}),
          dataIndex: 'actions',
          render(_, attr) {
            return (
              <Space wrap>
                <Button danger type="primary" loading={unbindAttr.loading} onClick={() => unbindAttr.run([attr.value_code])}>
                  {intl.formatMessage({id: 'pages.attribute.unbind'})}
                </Button>
              </Space>
            )
          },
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
      title: intl.formatMessage({id: 'pages.attribute.group.name'}),
      dataIndex: 'name'
    }, {
      title: intl.formatMessage({id: 'pages.attribute.group.code'}),
      dataIndex: 'code'
    }, {
      title: intl.formatMessage({id: 'pages.status'}),
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
      <Button ghost key="bind_attr" type="primary" onClick={() => setBindVisible(true)}>绑定新属性</Button>
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
      <BindProductAttr
        productid={props.productid}
        csrftoken={props.csrftoken}
        open={bindVisible}
        onCancel={() => {setBindVisible(false);props.refresh()}} />
    </Card>
  )
}

export default React.memo(ProductAttrGroup);