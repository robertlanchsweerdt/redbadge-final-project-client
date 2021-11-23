export interface InterfaceComplaints {
  id: number;
  category: string;
  status: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  narrative: string;
  photos?: JSON;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}
