import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { FotosService } from './fotos.service.js';
import { CreateFotoDto } from './dto/create-foto.dto.js';
import { UpdateFotoDto } from './dto/update-foto.dto.js';
import { QueryFotosDto } from './dto/query-fotos.dto.js';

@Controller('fotos')
export class FotosController {
    constructor (
        private readonly fotosService: FotosService,
    ) {}

    @Get()
    findAll(@Query() filtro: QueryFotosDto) {
        return this.fotosService.findAll(filtro);
    }

    @Get(':id')
    findOne (@Param('id', ParseIntPipe) id: number){
        return this.fotosService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateFotoDto) {
        return this.fotosService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateFotoDto,
    ) {
        return this.fotosService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.fotosService.remove(id);
    }
}
