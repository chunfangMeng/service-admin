import { getCategory } from '@/services/product/category';
import { PageContainer, ProTable, ProTableProps } from '@ant-design/pro-components';
import React from 'react';


const CategoryList: React.FC = () => {
  const categoryProps: ProTableProps<ProductCategory.CategoryItem, ProductCategory.CategoryFilter> = {
    columns: [{
      title: '分类代码',
      dataIndex: 'code'
    }, {
      title: '名称',
      dataIndex: 'name',
    }, {
      title: '英文名称',
      dataIndex: 'en_name',
    }, {
      title: '父级代码',
      dataIndex: 'parent_code',
      hideInSearch: true
    }, {
      title: '创建人',
      dataIndex: 'founder',
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
        transform: (value: [string, string]) => {
          return {
            create_start_date: value[0],
            create_end_date: value[1],
          };
        },
      },
    }, {
      title: '最近编辑人',
      dataIndex: 'last_editor',
    }, {
      title: '最近更新时间',
      dataIndex: 'last_update',
      hideInSearch: true
    }, {
      title: '最近更新时间',
      dataIndex: 'last_update',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: [string, string]) => {
          return {
            update_start_date: value[0],
            update_end_date: value[1],
          };
        },
      },
    }],
    rowKey: 'code',
    cardBordered: true,
    request: async (params = {},) => {
      params.page = params.current
      params.page_size = params.pageSize
      params.current = params.pageSize = undefined
      const result = await getCategory(params)
      return {
        data: result.data.results,
        success: result.code === 200,
        total: result.data.count
      }
    },
    search: {
      labelWidth: 'auto'
    }
  }
  return (
    <PageContainer>
      <ProTable
        {...categoryProps}/>
    </PageContainer>
  )
}

export default CategoryList;