export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  wishlist: boolean;
  currentlyReading: boolean;
  finishedReading: boolean;
  quantity?:number;
}
