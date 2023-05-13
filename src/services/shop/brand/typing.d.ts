declare namespace Product {
  type BrandFilter = {
    brand_code?: string;
    start_date?: string;
    end_date?: string;
  } & API.PaginatorParams
  type BrandListItem = {
    create_at: string | null;
    last_update: string | null;
    founder: string;
    last_editor: string;
    name: string;
    brand_code: string;
    en_name: string;
    status: number | null;
    logo: string;
    info: string;
    priority: number | null;
  }
  type OptionItem = {
    label: string;
    value: string;
  }
  type BrandOptions = {
    status_options: OptionItem[];
  }

  type CreateBrand = {
    id?: number;
    brand_code?: string;
    name: string;
    en_name: string;
    status: number;
  }
}