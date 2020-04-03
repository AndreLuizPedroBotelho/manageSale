import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@models/user.model';
import '@config/env';

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    const jwtPayload: any = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
    const { id, email } = jwtPayload;
    const user = await User.findByPk(id);

    if (!user) {
      throw Error('Usuário não encontrado!');
    }
    const newToken = jwt.sign({ id, email }, process.env.JWT_SECRET, {});

    res.setHeader('token', newToken);

    next();
  } catch (error) {
    res.status(401).json('Não autorizado!');
  }
};
