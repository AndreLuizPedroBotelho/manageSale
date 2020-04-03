import { Model, DataTypes } from 'sequelize';
import { configDatabase } from '@config/database';

export class Parcel extends Model {
  public id: number;

  public valorParcela: number;

  public numeroParcela: number;

  public previsaoPagamento: Date;

  public idSale: number;

  public createdAt: Date;

  public updatedAt: Date;
}

export interface ParcelInterface {
  id: number;
  valorParcela: number;
  numeroParcela: number;
  previsaoPagamento: Date;
  idSale: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParcelSaveInterface {
  valorParcela: number;
  numeroParcela: number;
  previsaoPagamento: Date;
  idSale: number;
}

Parcel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      field: 'id',
      primaryKey: true,
    },
    valorParcela: {
      type: new DataTypes.DECIMAL(15, 2),
      field: 'valor_parcela',
    },
    numeroParcela: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 1,
      field: 'numero_parcela',
    },
    previsaoPagamento: {
      type: new DataTypes.DATEONLY(),
      field: 'previsao_pagamento',
    },
    idSale: {
      type: DataTypes.BIGINT,
      field: 'id_sale',
    },
  },
  {
    tableName: 'parcels',
    sequelize: configDatabase,
    freezeTableName: true,
  }
);
