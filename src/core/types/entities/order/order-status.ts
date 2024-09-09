export enum OrderStatusType {
  Delivered = 'Delivered',
  InProcessing = 'InProcessing',
  Canceled = 'Canceled',
  Taken = 'Taken',
}

export interface OrderStatus {
  id: string;
  type: OrderStatusType;
}
