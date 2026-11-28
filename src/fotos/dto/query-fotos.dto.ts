import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class QueryFotosDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'min debe ser un número' })
  @Min(0, { message: 'min debe ser al menos 0' })
  @Max(5, { message: 'min no puede superar 5' })
  min: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'max debe ser un número' })
  @Min(0, { message: 'max debe ser al menos 0' })
  @Max(5, { message: 'max no puede superar 5' })
  max: number = 5;

  @IsOptional()
  @IsString({ message: 'q debe ser un texto' })
  q?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page debe ser un número entero' })
  @Min(1, { message: 'page debe ser al menos 1' })
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit debe ser un número entero' })
  @Min(1, { message: 'limit debe ser al menos 1' })
  @Max(50, { message: 'limit no puede superar 50' })
  limit: number = 10;

  @IsOptional()
  @IsString({ message: 'etiqueta debe ser un texto' })
  etiqueta?: string;

  @IsOptional()
  @IsString({ message: 'orden debe ser un texto' })
  orden?: string;
}
