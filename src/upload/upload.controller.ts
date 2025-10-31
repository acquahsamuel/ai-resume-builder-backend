import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('upload')
@ApiBearerAuth('JWT-auth')
@Controller('api/v1/upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('profile-photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const filePath = await this.uploadService.uploadProfilePhoto(file, req.user.userId);
    
    return {
      message: 'Profile photo uploaded successfully',
      filePath,
      fileUrl: this.uploadService.getFileUrl(filePath),
    };
  }

  @Post('document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const filePath = await this.uploadService.uploadDocument(file, req.user.userId);
    
    return {
      message: 'Document uploaded successfully',
      filePath,
      fileUrl: this.uploadService.getFileUrl(filePath),
    };
  }
}