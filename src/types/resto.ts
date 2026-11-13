export interface MenuBoard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  tagline: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  priceDisplay: string;
  badge?: string;
  serving?: string;
  description: string;
  image: string;
  featured?: boolean;
}

export interface RestoView {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
}

export interface CustomerMoment {
  id: string;
  title: string;
  caption: string;
  tag: string;
  image: string;
  fbUrl: string;
}
