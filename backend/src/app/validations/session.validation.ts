import { check } from 'express-validator';

export class SessionValidation {
  public validation = [
    check('email', 'Email não pode ter mais de 128 caracteres')
      .exists()
      .isLength({ max: 128 }),
    check('email', 'Email inválido')
      .exists()
      .isEmail(),
    check('password', 'Senha não pode ter mais de 255 caracteres')
      .exists()
      .isLength({ max: 255 }),
    check('password', 'Senha não pode ter menos de 6 caracteres')
      .exists()
      .isLength({ min: 6 }),
    check('password', 'Senha inválida')
      .exists()
      .isString(),
  ];
}
