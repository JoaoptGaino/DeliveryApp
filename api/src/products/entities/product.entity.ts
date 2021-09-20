import { Decimal } from '@prisma/client/runtime';

export class Product {
  readonly name: string;
  readonly description: string;
  readonly price: Decimal | number;
  readonly photo: string;
  readonly categoryId: number;
}
