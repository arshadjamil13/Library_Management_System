import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './createBook.dto.js';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
