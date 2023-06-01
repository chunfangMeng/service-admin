declare namespace ManagerStaff {
  type User = {
    email: string;
    id: number;
    is_superuser: boolean;
    username: string;
  }
  type StaffUser = {
    create_at: string;
    gender: number;
    id: number;
    last_update: string;
    nickname: string;
    phone: string | null;
    job_number: string;
    user: User;
  }

  type StaffFilter = {
    create_start_date?: string;
    create_end_date?: string;
  } & API.ResultListFilter
}