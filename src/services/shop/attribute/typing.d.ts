declare namespace ProductAttr {
  type AttributeValue = {
    attr_value: string;
    attribute_key: number;
    create_at: string;
    founder: string;
    id: number;
    last_editor: string;
    last_update: string;
    priority: number;
    status: number;
    value_code: string;
  }
  type AttrGroup = {
    code: string;
    create_at: string;
    founder: string;
    id: number;
    last_editor: string;
    last_update: string;
    name: string;
    priority: number;
    status: number | string;
    category: ProductCategory.CategoryItem;
    attr_values: AttributeValue[];
  }
}