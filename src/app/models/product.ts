export class Product {
  id: string;
  owner: string;
  description: string;
  category: string;
  last_auction_price: number;
  value: number;
  initial_date: Date;
  end_date: Date;
  participants: Array<any>;
  images: Array<string>;
  main_image: string;
}
