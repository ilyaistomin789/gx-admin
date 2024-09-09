export enum UserStatus {
  Active = 'Active',
  Banned = 'Banned',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  imageId: string | null;
  status: UserStatus;
}
