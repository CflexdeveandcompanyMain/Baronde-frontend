export interface HeroDataType {
  _id: string;
  categories: string;
  images: { public_id: string; url: string; _id: string }[];
  name: string;
  description: string;
  brand: string;
  keyword: string[];
  price: number;
  discount: number;
  stockQuantity: number;
}
