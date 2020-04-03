import { Request, Response } from 'express';
import { User, AuthInterface } from '@models/user.model';
import { FindOptions } from 'sequelize';
import '@config/env';
import jwt from 'jsonwebtoken';

export class SessionController {
  /**
   * @method POST
   * @params JSON [[AuthInterface]]
   * @route /login
   * @acces public
   * @async
   */
  public async login(req: Request, res: Response) {
    const { password, email }: AuthInterface = req.body;

    const options: FindOptions = {
      where: { email },
    };

    const user: User = await User.findOne<User>(options);

    if (!user || !(await user.checkPassword(password))) {
      res.status(401).json({ data: 'Usuário não encontrado!' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.json({
      id: user.id,
      name: user.name,
      token,
    });
  }
}
