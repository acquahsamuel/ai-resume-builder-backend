import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TemplateCategory {
  MODERN = 'Modern',
  CLASSIC = 'Classic',
  CREATIVE = 'Creative',
  MINIMALIST = 'Minimalist',
  PROFESSIONAL = 'Professional',
}

@Entity()
export class CvTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TemplateCategory,
    default: TemplateCategory.MODERN
  })
  category: TemplateCategory;

  @Column('json')
  layout: {
    sections: string[];
    sectionOrder: string[];
    styling: {
      primaryColor: string;
      secondaryColor: string;
      fontFamily: string;
      fontSize: number;
      lineHeight: number;
    };
    pageFormat: {
      size: 'A4' | 'Letter';
      margin: number;
    };
  };

  @Column('json', { nullable: true })
  previewImage: {
    url: string;
    alt: string;
  };

  @Column({ default: false })
  isPremium: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  usageCount: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}