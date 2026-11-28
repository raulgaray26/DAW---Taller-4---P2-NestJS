import { PartialType } from '@nestjs/mapped-types';
import { CreateFotoDto } from './create-foto.dto.js';

export class UpdateFotoDto extends PartialType(CreateFotoDto, { skipNullProperties: false }) {}
