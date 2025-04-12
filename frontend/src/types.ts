export interface Sneaker {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    brand: { name: string };
    category?: { name: string };
    comments: Comment[];
    sizes?: { size: number; stock: number }[]; 
  }
  