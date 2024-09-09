export interface SupervisorAuth {
  id: string;
  email: string;
  hashedPassword: string;
  supervisorId: string;
  createdAt: Date;
  updatedAt: Date | null;
}
