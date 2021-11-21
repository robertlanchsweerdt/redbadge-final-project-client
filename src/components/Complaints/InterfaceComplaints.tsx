export interface InterfaceComplaints {
  id: number;
  category: string;
  status: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  narrative: string;
  photos?: any;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}
