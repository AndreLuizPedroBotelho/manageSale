import { UserValidation } from '@validations/user.validation';
import { SessionValidation } from '@validations/session.validation';
import { SaleValidation } from '@validations/sale.validation';

import { UserController } from '@controllers/user.controller';
import { SessionController } from '@controllers/session.controller';
import { SaleController } from '@controllers/sale.controller';

import { checkJwt } from '@middlewares/checkJwt';
import { validate } from '@middlewares/validation';

export class Routes {
  /**
   * @Controllers
   * @public
   */
  public usersController: UserController = new UserController();

  /**
   * @Controllers
   * @public
   */
  public sessionController: SessionController = new SessionController();

  /**
   * @Controllers
   * @public
   */
  public saleController: SaleController = new SaleController();

  /**
   * @Validations
   * @public
   */
  public userValidation: UserValidation = new UserValidation();

  public sessionValidation: SessionValidation = new SessionValidation();

  public saleValidation: SaleValidation = new SaleValidation();

  /**
   * @Routes
   * @public
   */
  public routes(app): void {
    /**
     * @public
     */
    app.route('/login').post(this.sessionValidation.validation, validate, this.sessionController.login);
    app.route('/users').post(this.userValidation.validationCreate, validate, this.usersController.store);

    /**
     * @private
     */
    app.use(checkJwt);

    app.route('/users').get(this.usersController.index);

    app
      .route('/users/:id')
      .get(this.usersController.show)
      .put(this.userValidation.validation, validate, this.usersController.update)
      .delete(this.usersController.delete);

    app
      .route('/sales')
      .post(this.saleValidation.validationCreate, validate, this.saleController.store)
      .get(this.saleController.index);

    app
      .route('/sales/:id')
      .get(this.saleController.show)
      .put(this.saleValidation.validation, validate, this.saleController.update)
      .delete(this.saleController.delete);
  }
}
