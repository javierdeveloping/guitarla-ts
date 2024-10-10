export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type GuitarProps = {
  guitar: Guitar;
  addToCart: (item: Guitar) => void;
};

export type CartItem = Guitar & {
  quantity: number;
};

//https://www.typescriptlang.org/docs/handbook/utility-types.html

export type HeaderProps = {
  isEmpty: boolean;
  cartTotal: number;
  clearCart: () => void;
  modifyQuantity: (id: GuitarID, amount: number) => void;
  removeFromCart: (id: GuitarID) => void;
  cart: CartItem[];
};

export type GuitarID = Guitar["id"];
//export type GuitarID = Pick<Guitar, "id"|"name">;
