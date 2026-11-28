import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAlbumDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre del álbum es obligatorio' })
  @MaxLength(80, { message: 'El nombre del álbum no puede superar 80 caracteres' })
  nombre: string;
}
