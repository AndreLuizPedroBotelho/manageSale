import { FormaPagamento } from './../models/sale.model';
import { check } from 'express-validator';

export class SaleValidation {
  public validation = [
    check('formaPagamento', 'Forma Pagamento inválida')
      .custom(
        (value, { req }) =>
          new Promise(async (resolve, reject) => {
            if (value != FormaPagamento.CartaoCredito && value != FormaPagamento.CartaoDebito) {
              return reject();
            }

            return resolve();
          })
      )
      .optional()
      .isString(),
  ];

  public validationCreate = [
    check('dataVenda', 'Data de venda é obrigatorio').exists(),
    check('formaPagamento', 'Forma de Pagamento é obrigatorio').exists(),
    check('valorBruto', 'Forma de Pagamento é obrigatorio').exists(),
    check('quantidadeParcela', 'Quantidade de Parcela é obrigatorio').exists(),
    ...this.validation,
  ];
}
