import { check } from 'express-validator';
import { Op } from 'sequelize';
import { User } from '@models/user.model';

export class UserValidation {
  public validation = [
    check('name', 'Nome não pode ter mais de 255 caracteres')
      .optional()
      .isLength({ max: 255 }),
    check('name', 'Nome inválido')
      .optional()
      .isString(),
    check('email', 'Email não pode ter mais de 128 caracteres')
      .optional()
      .isLength({ max: 128 }),
    check('email', 'Email inválido')
      .optional()
      .isEmail(),
    check('email', 'Já existe usuário com esse email')
      .optional()
      .custom(
        (value, { req }) =>
          new Promise(async (resolve, reject) => {
            const id: number = parseInt(req.params.id) || 0;
            const user: User = await User.findOne({
              where: {
                email: value,
                id: {
                  [Op.not]: [id],
                },
              },
            });
            if (user) {
              return reject();
            }

            return resolve();
          })
      ),
    check('password', 'Senha não pode ter mais de 255 caracteres')
      .optional()
      .isLength({ max: 255 }),
    check('password', 'Senha não pode ter menos de 6 caracteres')
      .optional()
      .isLength({ min: 6 }),
    check('password', 'Senha inválida')
      .optional()
      .isString(),
  ];

  public validationCreate = [
    check('name', 'Nome é obrigatório').exists(),
    check('email', 'Email é obrigatório').exists(),
    check('password', 'Senha é obrigatório').exists(),
    ...this.validation,
  ];
}
