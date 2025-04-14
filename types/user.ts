export interface UserData {
  id?: string;
  firstName: string;
  lastName: string;
  role?: string;
  phone: string;
  email: string;
  profileImageUrl: string;
  address?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  zipCode?: string | undefined;
  companyId?: string | undefined;
  doctorId?: string;
  programs?: string[];
  description?: string;
}

export interface UserFormDataType extends UserData {
  password?: string;
  confirmPassword?: string;
}
