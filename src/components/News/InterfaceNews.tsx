export interface InterfaceNews {
  id: number;
  title: string;
  narrative: string;
  cal_date?: Date;
  photos?: Object;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
}
