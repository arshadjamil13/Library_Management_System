import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from "./createAuthor.dto.js"

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
