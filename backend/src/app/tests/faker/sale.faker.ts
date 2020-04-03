import { SaleSaveInterface, FormaPagamento } from './../../models/sale.model';
import faker from 'faker';

export const sale: SaleSaveInterface = {
  dataVenda: faker.date.future(),
  formaPagamento: faker.random.arrayElement(Object.values(FormaPagamento)),
  valorBruto: parseFloat(faker.commerce.price()),
  quantidadeParcela: 2,
  valorLiquido: parseFloat(faker.commerce.price()),
};
