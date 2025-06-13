export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: AdCategory;
  images: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  contactInfo: {
    email: string;
    phone?: string;
  };
  status: 'active' | 'sold' | 'expired';
}

export type AdCategory =
  | 'Electronics'
  | 'Vehicles'
  | 'Property'
  | 'Furniture'
  | 'Fashion'
  | 'Tools';

export interface AdFilters {
  category?: AdCategory;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  searchQuery?: string;
}
