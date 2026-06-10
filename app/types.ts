export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  categories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingZip?: string;
  shippingAddress?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZip?: string;
}

export interface OrderLineItem {
  quantity: number;
  subtotal?: number;
}

export interface Order {
  id: number;
  shippingCarrier?: string;
  shippingRate?: number;
  total?: number;
  created_at?: string;
  products: (Product & { orderLineItems: OrderLineItem })[];
}
