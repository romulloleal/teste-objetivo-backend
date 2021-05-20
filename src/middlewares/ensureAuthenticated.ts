import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  try {
    if (!authHeader) {
      response
        .status(400)
        .json({
          error: 'Sessão invalida. Efetue login para continuar!',
          errorType: 'tokenError',
        });
      return;
    }

    const [, token] = authHeader.split(' ');

    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    response
      .status(400)
      .json({
        error: 'Sua sessão expirou. Efetue login novamente para continuar!',
        errorType: 'tokenError',
      });
  }
}
