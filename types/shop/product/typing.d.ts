declare namespace ProductModule {
  type ProductItem = {
    create_at: string;
    founder: string;
    gross_weight: number;
    id: number;
    item_no: string;
    last_editor: string;
    last_update: string;
    name: string;
    net_weight: number;
    place_of_origin: string;
    priority: number;
    product_brand: number;
    spu_number: string;
    sub_name: string;
    attr_group: ProductAttr.AttrGroup[];
  }

  type ProductImage = {
    id: number;
    img_path: string;
    is_main: boolean;
    priority: number;
    product: number;
  }

  type AttrGroupParams = {
    is_show_all?: boolean;
  } & API.PaginatorParams;

  type Currency = {
    abbreviation: string;
    code: string;
    country: number;
    id: number;
    mark: string;
    name: string;
  }

  type SpecsResults = {
    create_at: string;
    currency: Currency;
    founder: string;
    id: number;
    last_editor: string;
    last_update: string;
    price: string;
    priority: number;
    product: number;
    sku: string;
    sku_name: string;
    status: number;
  }
}