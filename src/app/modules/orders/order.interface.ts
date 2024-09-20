export type TProductOrder = {
  Id: string;
  Quantity: number;
};

export type Torder = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  products: TProductOrder[];
  totalAmount: number;
};
