import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foto } from './entities/foto.entity.js';
import { FotosController } from './fotos.controller.js';
import { FotosService } from './fotos.service.js';
import { Etiqueta } from './entities/etiqueta.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Foto, Etiqueta]),],
  controllers: [FotosController],
  providers: [FotosService],
  exports: [FotosService],
})
export class FotosModule {}
