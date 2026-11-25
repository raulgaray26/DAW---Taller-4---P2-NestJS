import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumesService {
    constructor(
        @InjectRepository(Album)
        private readonly albumesRepo: Repository<Album>,
    ){}

    findAll(){
        return this.albumesRepo.find({ order: { id: 'ASC' } });
    }

    async findFotos(id: number) {
        const album = await this.albumesRepo.findOne({
            where: { id },
            relations: { fotos: true },
        });
        if (!album) throw new NotFoundException(`Album ${id} no encontrado`);
        return album;
    }
}
