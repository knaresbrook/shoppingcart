export class cartitems {
  constructor(
    public id: number,
    public productid: number,
    public description: string,
    public quantity: number,
    public price: number,
    public cartid: string
  ) {}
}

export class shoppingcart {
  constructor(
    public id: string,
    public userName: string,
    public dateCreation: Date
  ) {}
  cartitems: cartitems[];
}
