export type TOrder = {
  _id?: string | undefined;
  name: string;
  ingredients: string[];
  status: string;
  number: number | string;
  createdAt: string;
  updatedAt: string;
  owner?: string;
};
