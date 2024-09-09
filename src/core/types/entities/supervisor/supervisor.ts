export enum SupervisorStatus {
  Active = 'Active',
  Banned = 'Banned',
}

export interface Supervisor {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  imageId: string | null;
  status: SupervisorStatus;
}
