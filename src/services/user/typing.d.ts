declare namespace ManagerUser {
  type LoginCaptcha = {
    hash_key: string;
    base64_image: string;
  }
  type LoginParams = {
    autoLogin: boolean;
    check_code: string;
    hash_key: string;
    password: string;
    username: string;
  };

  type LoginResult = {
    token: string;
    user_id: number;
  }

  type CurrentUser = {
    create_at: string;
    gender: string;
    id: number;
    last_update: string;
    nickname: string;
    phone: string | null;
    user: number;
  }

  type LoginLog = {
    address: string | null;
    client: number;
    create_at: string;
    id: number;
    ip_address: string;
    user: number;
  }

  type MemberItem = {
    create_at: string;
    gender: number;
    id: number;
    last_update: string;
    nickname: string;
    phone: string;
    user: {
      email: string;
      id: number;
      username: string;
    }
  }

  type MemberFilter = {
    create_start_date?: string;
    create_end_date?: string;
    keyword?: string;
  } & API.ResultListFilter
}