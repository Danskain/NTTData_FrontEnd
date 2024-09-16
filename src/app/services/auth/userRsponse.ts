import { User } from "./user";

export interface ApiResponse {
  status: string;
  code: number;
  message: string;
  data: User;
}
