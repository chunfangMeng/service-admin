declare namespace ProductCategory {
  type CategoryFilter = {
    code?: string;
    name?: string;
    en_name?: string;
    founder?: string;
    last_editor?: string;
    create_start_date?: string;
    create_end_date?: string;
    update_start_date?: string;
    update_end_date?: string;
  } & API.ResultListFilter;
  type CategoryItem = {
    code: string;
    create_at: string;
    en_name: string;
    founder: string;
    id: number;
    last_editor: string;
    last_update: string;
    name: string;
    parent_code: string | null;
    priority: number;
    status: number;
  }
}