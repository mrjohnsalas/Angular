import { Address } from '../../addresses/shared/address.model';

export class Employee {
  id: number;
  name: string;
  birthdate: Date;
  addresses: Address[];
}
