export interface InterfaceDisplayPosts {
  id: number;
  title: string;
  category: string;
  status: string;
  has_address: boolean;
  address: string;
  city: string;
  state: string;
  zip: number;
  narrative: string;
  cal_date: Date;
  photos: JSON;
  createdAt: Date;
  updatedAt: Date;
  usedId: string;
}
