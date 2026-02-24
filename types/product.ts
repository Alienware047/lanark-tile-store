export interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  status: "in stock" | "out of stock";
  description: string;
  reviews: Review[];
}