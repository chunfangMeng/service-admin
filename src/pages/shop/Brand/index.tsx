import React, { useRef, useState } from 'react';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { deleteBrand, getBrandList } from '@/services/shop/brand/list';
import { Button, message, Popconfirm } from 'antd';
import EditBrand from './components/EditBrand';
import { useIntl, useRequest } from '@umijs/max';
import { getCsrfToken } from '@/services/common';
import BatchUpload from './components/BatchUpload';


const BrandList: React.FC = () => {
  const [ editOpen, setEditOpen ] = useState(false)
  const [ uploadVisible, setUploadVisible ] = useState(false)
  const [ csrfToken, setCsrfToken ] = useState<string | undefined>()
  const [ editBrand, setEditBrand ] = useState<Product.BrandListItem | undefined>()
  const brandRef = useRef<ActionType>()
  useRequest(() => {
    return getCsrfToken()
  }, {
    onSuccess: res => {
      setCsrfToken(res.data)
    }
  })
  const onRefresh = () => {
    brandRef.current?.reload()
  }
  const deleteBrandItem = useRequest((brandCode: string) => {
    return deleteBrand(brandCode, {'X-CSRFToken': csrfToken})
  }, {
    manual: true,
    onSuccess() {
      message.success('删除成功');
      brandRef.current?.reload()
    },
  })
  const onOpenEdit = (record?: Product.BrandListItem) => {
    setEditBrand(record)
    setEditOpen(true)
  }
  const intl = useIntl();
  const columns: ProColumns<Product.BrandListItem>[] = [{
    title: intl.formatMessage({id: 'pages.brandCode'}),
    dataIndex: 'brand_code',
  }, {
    title: intl.formatMessage({id: 'pages.brand.zh-name'}),
    dataIndex: 'name',
  }, {
    title: intl.formatMessage({id: 'pages.brand.en-name'}),
    dataIndex: 'en_name',
  }, {
    title: intl.formatMessage({id: 'pages.status'}),
    dataIndex: 'status',
    valueEnum: {
      0: {
        text: '初始化',
        status: 'Processing'
      },
      1: {
        text: '草稿',
        status: 'Error'
      },
      2: {
        text: '已上线',
        status: 'Success'
      }
    }
  }, {
    title: intl.formatMessage({id: 'pages.createAt'}),
    dataIndex: 'create_at',
    key: 'showCreate',
    hideInSearch: true
  }, {
    title: intl.formatMessage({id: 'pages.createAt'}),
    dataIndex: 'create_at',
    key: 'create_at',
    valueType: 'dateRange',
    order: 10,
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          created_start_date: value[0],
          created_end_date: value[1],
        };
      },
    },
  }, {
    title: intl.formatMessage({id: 'pages.lastUpdate'}),
    dataIndex: 'last_update',
    key: 'showLastCreate',
    hideInSearch: true
  }, {
    title: intl.formatMessage({id: 'pages.lastUpdate'}),
    dataIndex: 'last_update',
    key: 'last_update',
    valueType: 'dateRange',
    hideInTable: true,
    order: 10,
    search: {
      transform: (value) => {
        return {
          update_start_date: value[0].format('YYYY-mm-dd'),
          update_end_date: value[1].format('YYYY-mm-dd'),
        };
      },
    },
  }, {
    title: intl.formatMessage({id: 'pages.founder'}),
    key: 'founder',
    dataIndex: 'founder'
  }, {
    title: intl.formatMessage({id: 'pages.actions'}),
    valueType: 'option',
    render: (dom, record) => [
      <Button ghost key="detail" type="primary" onClick={() => onOpenEdit(record)}>{intl.formatMessage({id: 'pages.edit'})}</Button>,
      <Popconfirm
        key="delete"
        placement="leftTop"
        title={intl.formatMessage({
          id: 'pages.stock.brand.list.isDelete'
        })}
        onConfirm={() => deleteBrandItem.run(record.brand_code)}
        okText={intl.formatMessage({
          id: "pages.yes"
        })}
        cancelText={intl.formatMessage({
          id: "pages.no"
        })}
      >
        <Button danger loading={deleteBrandItem.loading}>{intl.formatMessage({id: 'pages.delete'})}</Button>
      </Popconfirm>,
    ]
  }] 
  return (
    <PageContainer>
      <ProTable<Product.BrandListItem, Product.BrandFilter>
        cardBordered
        actionRef={brandRef}
        columns={columns}
        rowKey="brand_code"
        pagination={{
          position: ['bottomCenter'],
          defaultPageSize: 20,
          showQuickJumper: true
        }}
        toolBarRender={() => [
          <Button key="batch-update" onClick={() => setUploadVisible(true)}>
            {intl.formatMessage({id: 'pages.batch.upload'})}
          </Button>,
          <Button 
            key="createBrand"
            type="primary"
            onClick={() => onOpenEdit(undefined)}>
            {`${intl.formatMessage({id: 'pages.create'})} ${intl.formatMessage({id: 'pages.brand'})}`}
          </Button>,
        ]}
        request={async (
          params = {},
        ) => {
          params.page = params.current
          params.page_size = params.pageSize
          params.current = params.pageSize = undefined
          const res = await getBrandList(params);
          return {
            data: res.data.results,
            success: res.code === 200,
            total: res.data.count,
          }
        }}
        search={{
          labelWidth: 'auto',
        }}/>
      <EditBrand
        open={editOpen}
        onOpenChange={setEditOpen}
        initValues={editBrand}
        csrfToken={csrfToken}
        onRefresh={onRefresh} />
      <BatchUpload 
        open={uploadVisible}
        csrftoken={csrfToken}
        onOpenChange={setUploadVisible}/>
    </PageContainer>
  );
}

export default BrandList;