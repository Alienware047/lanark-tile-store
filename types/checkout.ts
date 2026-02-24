export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type PaymentMethod = "bank" | "cheque" | "card" | "paypal";

export interface CheckoutFormData {
  billingFirstName: string;
  billingLastName: string;
  billingCompany?: string;
  billingAddress: string;
  billingCity: string;
  billingPostcode: string;
  billingEmail: string;
  billingPhone: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostcode: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
}
