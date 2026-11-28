import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(error: QueryFailedError & { code?: string; detail?: string }, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const errores: Record<string, [number, string]> = {
      '23505': [HttpStatus.CONFLICT, 'El registro ya existe'],
      '23503': [HttpStatus.BAD_REQUEST, 'Referencia a un registro inexistente'],
    };
    const [statusCode, message] =
      errores[error.code ?? ''] ?? [HttpStatus.INTERNAL_SERVER_ERROR, 'Error en la base de datos'];
    res.status(statusCode).json({ statusCode, message, detalle: error.detail });
  }
}
