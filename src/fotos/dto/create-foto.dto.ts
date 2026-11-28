import {
  IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl,
  Matches, Max, MaxLength, Min,
} from 'class-validator';

export class CreateFotoDto {
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MaxLength(100, { message: 'El título no puede superar 100 caracteres' })
  titulo: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcion?: string | null;

  @IsNumber({}, { message: 'La calificación debe ser un número' })
  @Min(0, { message: 'La calificación debe ser al menos 0' })
  @Max(5, { message: 'La calificación no puede superar 5' })
  calificacion: number;

  @IsUrl({}, { message: 'La ruta debe ser una URL válida' })
  ruta: string;

  @IsOptional()
  @IsInt({ message: 'El ID del álbum debe ser un número entero' })
  albumId?: number | null;

  @IsOptional()
  @IsArray({ message: 'Las etiquetas deben enviarse en una lista' })
  @IsString({ each: true, message: 'Cada etiqueta debe ser un texto' })
  @Matches(/\S/, { each: true, message: 'Las etiquetas no pueden estar vacías' })
  @MaxLength(30, { each: true, message: 'Cada etiqueta puede tener hasta 30 caracteres' })
  etiquetas?: string[] | null;
}
