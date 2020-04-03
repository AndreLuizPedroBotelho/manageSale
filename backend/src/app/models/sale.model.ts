import { Parcel, ParcelSaveInterface } from './parcel.model';
import { Model, DataTypes } from 'sequelize';
import { configDatabase } from '@config/database';
import { addMonths } from 'date-fns';

export class Sale extends Model {
  public id: number;

  public dataVenda: Date;

  public formaPagamento: string;

  public valorBruto: number;

  public quantidadeParcela: number;

  public valorLiquido: number;

  public createdAt: Date;

  public updatedAt: Date;
}

export interface SaleInterface {
  id: number;
  dataVenda: Date;
  formaPagamento: string;
  valorBruto: number;
  quantidadeParcela: number;
  valorLiquido: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleSaveInterface {
  dataVenda: Date;
  formaPagamento: string;
  valorBruto: number;
  quantidadeParcela: number;
  valorLiquido: number;
}

export enum FormaPagamento {
  CartaoCredito = 'Cartão de Crédito',
  CartaoDebito = 'Cartão de Débito',
}

Sale.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      field: 'id',
      primaryKey: true,
    },
    dataVenda: {
      type: new DataTypes.DATEONLY(),
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'data_venda',
    },
    formaPagamento: {
      type: DataTypes.ENUM,
      values: [FormaPagamento.CartaoCredito, FormaPagamento.CartaoDebito],
      allowNull: false,
      field: 'forma_pagamento',
    },
    valorBruto: {
      type: new DataTypes.DECIMAL(15, 2),
      field: 'valor_bruto',
    },
    quantidadeParcela: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      field: 'quantidade_parcela',
    },
    valorLiquido: {
      type: new DataTypes.DECIMAL(15, 2),
      field: 'valor_liquido',
    },
  },
  {
    tableName: 'sales',
    sequelize: configDatabase,
    freezeTableName: true,
  }
);

Sale.hasMany(Parcel, {
  as: 'parcels',
  foreignKey: 'idSale',
});

Sale.addHook('afterSave', async (sale: Sale) => {
  if (sale.quantidadeParcela > 1) {
    const valorParcela = sale.valorLiquido / sale.quantidadeParcela;
    let oldPrevisaoPagamento = sale.dataVenda;

    for (let index = 1; index <= sale.quantidadeParcela; index++) {
      const parcel: Parcel = new Parcel();
      parcel.numeroParcela = index;
      parcel.previsaoPagamento = await addMonths(oldPrevisaoPagamento, 1);
      oldPrevisaoPagamento = parcel.previsaoPagamento;
      parcel.idSale = sale.id;
      parcel.valorParcela = valorParcela;
      parcel.save();
    }
  }
});
