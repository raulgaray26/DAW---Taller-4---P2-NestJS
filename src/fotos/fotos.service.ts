import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, In, Repository } from 'typeorm';
import { CreateFotoDto } from './dto/create-foto.dto.js';
import { UpdateFotoDto } from './dto/update-foto.dto.js';
import { Etiqueta } from './entities/etiqueta.entity.js';
import { Foto } from './entities/foto.entity.js';

export interface FiltroFotos {
    min: number;
    max: number;
    q?: string;
    page: number;
    limit: number;
    etiqueta?: string;
    orden?: string;
}

@Injectable()
export class FotosService {
    constructor(
        @InjectRepository(Foto)
        private readonly fotosRepo: Repository<Foto>,
    ) {}

    async findAll({ min, max, q, page, limit, etiqueta, orden }: FiltroFotos) {
        const ordenCalificacion = orden === 'asc' || orden === 'desc' ? orden : undefined;
        const [data, total] = await this.fotosRepo.findAndCount({
            where: {
                calificacion: Between(min, max),
                ...(q && { titulo: ILike(`%${q}%`) }),
                ...(etiqueta && { etiquetas: { texto: etiqueta } }),
            },
            relations: { album: true, etiquetas: true },
            relationLoadStrategy: 'query',
            order: { calificacion: ordenCalificacion, id: 'ASC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, total, page, limit };
    }

    async findOne(id: number): Promise<Foto> {
        const foto = await this.fotosRepo.findOne({
            where: { id },
            relations: { album: true, etiquetas: true },
        });
        if (!foto) {
            throw new NotFoundException(`Foto ${id} no encontrada`);
        }
        return foto;
    }

    async create({ albumId = null, etiquetas, ...datos }: CreateFotoDto): Promise<Foto> {
        const guardada = await this.fotosRepo.manager.transaction(async (manager) => {
            const fotosRepo = manager.getRepository(Foto);
            const foto = fotosRepo.create({
                ...datos,
                album: albumId === null ? null : { id: albumId },
                etiquetas: await this.buscarOCrearEtiquetas(manager.getRepository(Etiqueta), etiquetas),
            });
            return fotosRepo.save(foto);
        });
        return this.findOne(guardada.id);
    }

    async update(id: number, { albumId, etiquetas, ...datos }: UpdateFotoDto): Promise<Foto> {
        const foto = await this.findOne(id);
        Object.assign(foto, datos);
        if (albumId !== undefined) {
            foto.album = albumId === null ? null : { id: albumId } as Foto['album'];
        }
        await this.fotosRepo.manager.transaction(async (manager) => {
            if (etiquetas) {
                foto.etiquetas = await this.buscarOCrearEtiquetas(manager.getRepository(Etiqueta), etiquetas);
            }
            await manager.getRepository(Foto).save(foto);
        });
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const foto = await this.findOne(id);
        await this.fotosRepo.remove(foto);
    }

    private async buscarOCrearEtiquetas(etiquetasRepo: Repository<Etiqueta>, textos: string[] | null = []) {
        const limpios = [...new Set((textos ?? []).map((texto) => texto.trim().toLowerCase()))];
        const existentes = await etiquetasRepo.findBy({ texto: In(limpios) });
        const nuevas = limpios
            .filter((texto) => !existentes.some((etiqueta) => etiqueta.texto === texto))
            .map((texto) => etiquetasRepo.create({ texto }));
        return [...existentes, ...(await etiquetasRepo.save(nuevas))];
    }
}
