export interface Product {
  product_id: number;
  product_name: string;
  product_img: string;
  category_type: string;
  gender: string;
  // Valfria fält "?"
  brand_name?: string;
  product_description?: string;
  price?: number;
  stock?: number;
  color?: string[];
  size?: string[];
}
