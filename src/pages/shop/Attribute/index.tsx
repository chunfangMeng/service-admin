import { getCsrfToken } from '@/services/common';
import { changeAttrValueStatus, deleteAttributeValue, getAttributeGroupList } from '@/services/shop/attribute';
import { ActionType, PageContainer, ProTable, ProTableProps } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Button, message, Popconfirm, Space, Switch } from 'antd';
import { ExpandableConfig } from 'rc-table/lib/interface';
import React, { useRef, useState } from 'react';


const ProductAttribute: React.FC = () => {
  const intl = useIntl()
  const attrGroup = useRequest(getAttributeGroupList);
  const [ csrfToken, setCsrfToken ] = useState('');
  const attrRef = useRef<ActionType>();
  useRequest(() => {
    return getCsrfToken()
  }, {
    onSuccess: res => {
      setCsrfToken(res.data)
    }
  })
  const deleteValue = useRequest(deleteAttributeValue, {
    manual: true,
    onSuccess: res => {
      if (res.code === 200) {
        message.success(res.message);
        attrGroup.run()
        return false;
      }
      message.error(res.message);
    }
  })
  // 切换属性值状态
  const attrValueStatus = useRequest(changeAttrValueStatus, {
    manual: true,
    onSuccess: res => {
      if (res.code === 200) {
        message.success(res.message);
        return false;
      }
      message.error(res.message);
    }
  })
  const attributeValues: ExpandableConfig<ProductAttr.AttrGroup> = {
    expandedRowRender: (record) => {
      const groupValues: ProTableProps<ProductAttr.AttributeValue, []> = {
        columns: [{
          title: intl.formatMessage({id: 'pages.code'}),
          dataIndex: 'value_code'
        }, {
          title: intl.formatMessage({id: 'pages.attribute.group.value'}),
          dataIndex: 'attr_value',
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
        }, {
          title: intl.formatMessage({id: 'pages.founder'}),
          dataIndex: 'founder',
        }, {
          title: intl.formatMessage({id: 'pages.createAt'}),
          dataIndex: 'create_at'
        }, {
          title: intl.formatMessage({id: 'pages.last.editor'}),
          dataIndex: 'last_editor'
        }, {
          title: intl.formatMessage({id: 'pages.lastUpdate'}),
          dataIndex: 'last_update'
        }, {
          title: intl.formatMessage({id: 'pages.actions'}),
          dataIndex: 'actions',
          render(_, entity) {
            return (
              <Space>
                <Switch
                  defaultChecked={entity.status === 0}
                  checkedChildren={intl.formatMessage({id: 'pages.switch.available'})}
                  unCheckedChildren={intl.formatMessage({id: 'pages.switch.unavailable'})}
                  loading={attrValueStatus.loading}
                  onChange={(checked: boolean) => {
                    attrValueStatus.run(record.id, entity.value_code, checked ? 0 : 1, csrfToken)
                  }}/>
                <Button type="link">{intl.formatMessage({id: 'pages.edit'})}</Button>
                <Popconfirm
                  placement="leftTop"
                  title={intl.formatMessage({id: 'page.commom.delete.confirm'})}
                  onConfirm={() => deleteValue.run(record.id, entity.value_code, csrfToken)}
                  okText={intl.formatMessage({id: 'pages.yes'})}
                  cancelText={intl.formatMessage({id: 'pages.no'})}
                >
                  <Button danger type="link" loading={deleteValue.loading}>
                    {intl.formatMessage({id: 'pages.delete'})}
                  </Button>
                </Popconfirm>
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
        <ProTable {...groupValues}/>
      )
    }
  }
  const attrGroupProps: ProTableProps<ProductAttr.AttrGroup, any> = {
    columns: [{
      title: intl.formatMessage({id: 'pages.attribute.group.name'}),
      dataIndex: 'name',
      hideInSearch: true,
    }, {
      title: intl.formatMessage({id: 'pages.attribute.group.code'}),
      dataIndex: 'code',
      hideInSearch: true,
    }, {
      title: intl.formatMessage({id: 'pages.sort'}),
      dataIndex: 'priority',
      tooltip: intl.formatMessage({id: 'pages.sort.tip'}),
      hideInSearch: true
    }, {
      title: intl.formatMessage({id: 'pages.createAt'}),
      dataIndex: 'create_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: [string, string]) => {
          return {
            created_start_date: value[0],
            created_end_date: value[1],
          }
        }
      }
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
    }, {
      title: intl.formatMessage({id: 'pages.search.keyword'}),
      dataIndex: 'keyword',
      hideInTable: true
    }, {
      title: intl.formatMessage({id: 'pages.founder'}),
      dataIndex: 'founder',
      hideInSearch: true
    }, {
      title: intl.formatMessage({id: 'pages.last.editor'}),
      dataIndex: 'last_editor',
      hideInSearch: true
    }, {
      title: intl.formatMessage({id: 'pages.lastUpdate'}),
      dataIndex: 'last_update',
      hideInSearch: true
    }, {
      title: intl.formatMessage({id: 'pages.actions'}),
      dataIndex: 'actions',
      hideInSearch: true,
      render(dom, record) {
        return (
          <>
            <Button type="link">{intl.formatMessage({id: 'pages.edit'})}</Button>
            {
              record.attr_values.length === 0 &&
              <Button danger type="link">{intl.formatMessage({id: 'pages.delete'})}</Button>
            }
          </>
        )
      },
    }],
    actionRef: attrRef,
    rowKey: 'id',
    search: {
      labelWidth: 'auto'
    },
    expandable: attributeValues,
    request: async () => {
      return {
        data: attrGroup.data?.data.results,
        success: attrGroup.data?.code === 200,
        total: attrGroup.data?.data.count
      }
    }
  }
  return (
    <PageContainer>
      <ProTable
       {...attrGroupProps}/>
    </PageContainer>
  )
}

export default ProductAttribute;