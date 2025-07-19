import { Product } from '../entities/Product';

const getMissingLetter = (productName: string) => {
  const az = 'abcdefghijklmnopqrstuvwxyz';
  const setLetters = new Set(
    productName.toLocaleLowerCase().replace(/[^a-z]/g, ''),
  );

  for (const letter of az) {
    if (!setLetters.has(letter)) {
      return letter;
    }
  }

  return '_';
};
export class ProductViewModel {
  static toHttp({ createdAt, name, price, sku, id }: Product) {
    return {
      id,
      name,
      price,
      sku,
      createdAt,
      missingLetter: getMissingLetter(name),
    };
  }
}
