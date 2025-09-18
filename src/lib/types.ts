import { Status } from "@/generated/prisma";
import { AssignmentFormData } from "./zod-schemas";

export type Item = {
  id: number;
  stock: number;
  created_at: Date | null;
  updated_at: Date | null;
  description: string;
  price: number;
}

export type Employee = {
  name: string;
  id: number;
  created_at: Date | null;
  lastname: string;
  user: {
    email: string;
    role: string
  } | null;
}

export type Assign = {
  title: string;
  description: string | null;
  id: number;
  due_date: Date | null;
  status: Status
  user: {
    id: number;
    employee: {
      name: string;
      lastname: string;
    } | null;
  };
}

export type SearchParams = Promise<{ q: string, page: string, status: string }>

export interface CreateAssignsParameters extends AssignmentFormData {
  userId: number
}
