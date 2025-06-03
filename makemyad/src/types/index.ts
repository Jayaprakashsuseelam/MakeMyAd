export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  images: string[];
  createdAt: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export interface SearchFilters {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'date' | 'price' | 'relevance';
}
