import { PartialType } from '@nestjs/mapped-types';
import { CreateCvDocumentDto } from './create-cv-document.dto';

export class UpdateCvDocumentDto extends PartialType(CreateCvDocumentDto) {}
