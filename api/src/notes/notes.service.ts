import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(text: string) {
    return this.prisma.note.create({ data: { text } });
  }

  async findAll() {
    return this.prisma.note.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const note = await this.prisma.note.findUnique({ where: { id } });

    if (!note) {
      throw new NotFoundException(`Note ${id} not found`);
    }

    return note;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.note.delete({ where: { id } });
    return { deleted: true };
  }
}
