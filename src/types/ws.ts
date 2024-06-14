export interface IMessage {
  success: boolean;
  orders: [
    {
      _id?: string | undefined,
      ingredients: string[],
      status: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      number: number,
    }
  ];
  total: number;
  totalToday: number;
}

export interface ISendMessage {
  message: string;
  success: boolean;
}
