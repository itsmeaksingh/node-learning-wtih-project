import { FormGroup } from '@angular/forms';

export interface Student {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
}

export interface AddUserStoreState {
  studentForm: FormGroup;
  isAddMode: boolean;
  error: boolean;
  errorMessage: string;
}

export interface UserListStoreState {
  studentList?: Student[];
  totalLength?: Number;
  error: boolean;
  errorMessage: string;
}

export interface UserListResponse {
  data: Student[];
  msg?: string;
  rowCount: number;
}
