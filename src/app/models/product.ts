export class Product {
  name: string;
  owner: string;
  description: string;
  category: string;
  value: number;
  end_date: Date;
  main_img: string;
  last_auction_price?: number;
  participants?: any;
}
