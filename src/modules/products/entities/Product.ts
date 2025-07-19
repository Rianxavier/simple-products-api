import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface IProductSchema {
  name: string;
  price: number;
  sku: string;
  createdAt: Date;
}

export class Product {
  private props: IProductSchema;
  private _id: string;

  constructor(
    props: Replace<IProductSchema, { createdAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get price(): number {
    return this.props.price;
  }

  set price(price: number) {
    this.props.price = price;
  }

  get sku(): string {
    return this.props.sku;
  }

  set sku(sku: string) {
    this.props.sku = sku;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
