export class KongService {

  constructor(name: string, url: string) {
    this.name = name;
    this.url = "";
  }
  
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  retries: number;
  protocol: string;
  host: string;
  port: number;
  path: string;
  url: string;
  connect_timeout: number;
  write_timeout: number;
  read_timeout: number;
  tags: Array<string>;
}