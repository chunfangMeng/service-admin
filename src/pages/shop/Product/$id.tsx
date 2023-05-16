import { getProductImages, getShopProductInfo } from '@/services/shop/product/list';
import { PageContainer, ProDescriptions, ProDescriptionsActionType } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Card, Image } from 'antd';
import React, { useRef } from 'react';
import ProductAttrGroup from './components/ProductAttrGroup';



const ProductDetail: React.FC = () => {
  const actionRef = useRef<ProDescriptionsActionType>();
  const params = useParams();
  const productInfo = useRequest(() => {
    return getShopProductInfo(parseInt(params.id as string))
  })
  const productImage = useRequest(() => {
    return getProductImages(params.id as string)
  })
  return (
    <PageContainer>
      <Card>
        <ProDescriptions
          actionRef={actionRef}
          title="商品基本信息">
          <ProDescriptions.Item label="商品编号">{productInfo.data?.data.spu_number}</ProDescriptions.Item>
          <ProDescriptions.Item label="商品名称">{productInfo.data?.data.name}</ProDescriptions.Item>
          <ProDescriptions.Item label="商品副标题">{productInfo.data?.data.sub_name}</ProDescriptions.Item>
          <ProDescriptions.Item label="商品毛重">{productInfo.data?.data.gross_weight}</ProDescriptions.Item>
          <ProDescriptions.Item label="商品净重">{productInfo.data?.data.net_weight}</ProDescriptions.Item>
          <ProDescriptions.Item label="商品产地">{productInfo.data?.data.place_of_origin}</ProDescriptions.Item>
          <ProDescriptions.Item label="商品货号">{productInfo.data?.data.item_no}</ProDescriptions.Item>
          <ProDescriptions.Item label="创建人">{productInfo.data?.data.founder}</ProDescriptions.Item>
          <ProDescriptions.Item label="创建时间">{productInfo.data?.data.create_at}</ProDescriptions.Item>
          <ProDescriptions.Item label="最近更新人">{productInfo.data?.data.last_editor}</ProDescriptions.Item>
          <ProDescriptions.Item label="最近更新时间">{productInfo.data?.data.last_update}</ProDescriptions.Item>
        </ProDescriptions>
      </Card>
      <ProductAttrGroup
        data={productInfo.data?.data.attr_group} />
      <Card 
        className='mt-4'
        title="商品图片">
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          {
            productImage.data?.data.map(item => (
              <Image key={item.id} width={200} src={item.img_path} />
            ))
          }
        </Image.PreviewGroup>
      </Card>
    </PageContainer>
  )
}

export default ProductDetail;