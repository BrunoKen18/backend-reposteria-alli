export type ProductAlgoliaType = {
  objectID: string;
  Name: string;
  Images: any;
  Description: string;
  Size: string;
  'Unit cost': number;
  'In stock': boolean;
  Type: string;
  featured?: boolean;
  quantity?: number;
};
