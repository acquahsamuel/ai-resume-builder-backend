import { Injectable, BadRequestException, OnModuleInit } from '@nestjs/common';
import { extname } from 'path';
import { promises as fs } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService implements OnModuleInit {
  private readonly uploadDir = process.env.UPLOAD_DIR || 'uploads';
  private readonly maxFileSize = parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024; // 5MB

  async onModuleInit() {
    await this.ensureUploadDirExists();
  }

  private async ensureUploadDirExists() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
      await fs.mkdir(path.join(this.uploadDir, 'profiles'), { recursive: true });
      await fs.mkdir(path.join(this.uploadDir, 'documents'), { recursive: true });
    }
  }

  async uploadProfilePhoto(file: Express.Multer.File, userId: number): Promise<string> {
    this.validateImageFile(file);

    const filename = `profile_${userId}_${uuidv4()}${extname(file.originalname)}`;
    const filepath = path.join(this.uploadDir, 'profiles', filename);

    await fs.writeFile(filepath, file.buffer as Uint8Array);

    return `/${this.uploadDir}/profiles/${filename}`;
  }

  async uploadDocument(file: Express.Multer.File, userId: number): Promise<string> {
    this.validateDocumentFile(file);

    const filename = `doc_${userId}_${uuidv4()}${extname(file.originalname)}`;
    const filepath = path.join(this.uploadDir, 'documents', filename);
    await fs.writeFile(filepath, file.buffer as Uint8Array);

    return `/${this.uploadDir}/documents/${filename}`;
  }

  private validateImageFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (file.size > this.maxFileSize) {
      throw new BadRequestException('File size too large');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only JPEG, PNG, and GIF are allowed');
    }
  }

  private validateDocumentFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (file.size > this.maxFileSize) {
      throw new BadRequestException('File size too large');
    }

    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only PDF, DOC, DOCX, and TXT are allowed');
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      await fs.unlink(fullPath);
    } catch (error) {
      // File doesn't exist or couldn't be deleted - log but don't throw
      console.warn(`Could not delete file: ${filePath}`, error);
    }
  }

  getFileUrl(filePath: string): string {
    return `${process.env.FRONTEND_URL || 'http://localhost:3000'}${filePath}`;
  }
}