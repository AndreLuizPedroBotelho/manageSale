import { Request, Response } from 'express';
import { UpdateOptions, DestroyOptions } from 'sequelize';
import { validationResult } from 'express-validator';
import { Sale, SaleInterface } from '../models/sale.model';

export class SaleController {
  /**
   * @method GET
   * @route /sales
   * @acces private
   * @async
   */
  public async index(_req: Request, res: Response) {
    try {
      const sale: Array<Sale> = await Sale.findAll<Sale>({
        include: ['parcels'],
      });
      res.status(200).json(sale);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  /**
   * @method POST
   * @params [[SaleSaveInterface]]: JSON
   * @route /sales
   * @acces public
   * @async
   */
  public async store(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const params: SaleInterface = req.body;

      const sale: Sale = await Sale.create<Sale>(params);

      return sale
        ? res.status(200).json({ messsage: 'Venda salva com sucesso!', data: sale })
        : res.status(404).json({ errors: ['Não foi possível salvar!'] });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  /**
   * @method GET
   * @argsPath id: Number
   * @route /sales/:id
   * @acces private
   */
  public async show(req: Request, res: Response) {
    try {
      const saleId: number = parseInt(req.params.id, 10);

      const sale: Sale | null = await Sale.findByPk<Sale>(saleId, {
        include: ['parcels'],
      });

      return sale ? res.status(200).json(sale) : res.status(404).json({ errors: ['Venda não encontrada!'] });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  /**
   * @method PUT
   * @params [[SaleSaveInterface]]: JSON
   * @route /sales
   * @acces private
   */
  public async update(req: Request, res: Response) {
    try {
      const saleId: number = parseInt(req.params.id, 10);
      const params: SaleInterface = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const options: UpdateOptions = {
        where: { id: saleId },
        returning: true,
        limit: 1,
      };

      const [, sale] = await Sale.update(params, options);

      if (!sale) {
        return res.status(404).json({ errors: ['Venda não encontrada!'] });
      }

      return res.status(200).json({ data: 'Venda atualizada com sucesso!' });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  /**
   * @method DELETE
   * @argsPath id: Number
   * @route /sales/:id
   * @acces private
   */
  public async delete(req: Request, res: Response) {
    try {
      const saleId: number = parseInt(req.params.id, 10);

      const options: DestroyOptions = {
        where: { id: saleId },
        limit: 1,
      };

      const sale = await Sale.destroy(options);

      if (sale) {
        return res.status(200).json({ data: 'Venda deletada com sucesso!' });
      }
      return res.status(404).json({ errors: ['Venda não encontrada!'] });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
