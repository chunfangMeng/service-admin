declare namespace SystemConfig {
  type Country = {
    create_at: string;
    gec_code: string;
    id: number;
    last_update: string;
    name: string;
  }
  type CurrencyItem = {
    abbreviation: string;
    code: string;
    country: Country;
    id: number;
    mark: string;
    name: string;
  }
}