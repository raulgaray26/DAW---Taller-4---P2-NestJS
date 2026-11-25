import { Module } from '@nestjs/common';
import { AlbumesController } from './albumes.controller.js';
import { AlbumesService } from './albumes.service.js';
import { Album } from './entities/album.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
  ],
  controllers: [AlbumesController],
  providers: [AlbumesService]
})
export class AlbumesModule {}
