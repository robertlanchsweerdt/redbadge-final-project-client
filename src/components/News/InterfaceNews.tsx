export interface InterfaceNews {
  id: number;
  title: string;
  narrative: string;
  cal_date?: any;
  photos?: Object;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
}