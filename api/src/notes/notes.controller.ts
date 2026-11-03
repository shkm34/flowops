import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notes: NotesService) {}

  @Post()
  async create(@Body() body: { text?: unknown }) {
    if (typeof body?.text !== 'string') {
      throw new BadRequestException('text is required');
    }

    const text = body.text.trim();
    if (!text) {
      throw new BadRequestException('text is required');
    }

    return this.notes.create(text);
  }

  @Get()
  findAll() {
    return this.notes.findAll();
  }

  private parseId(rawId: string) {
    const id = Number(rawId);
    if (!Number.isInteger(id)) {
      throw new BadRequestException('id must be an integer');
    }
    return id;
  }

  @Get(':id')
  findOne(@Param('id') rawId: string) {
    return this.notes.findOne(this.parseId(rawId));
  }

  @Delete(':id')
  remove(@Param('id') rawId: string) {
    return this.notes.remove(this.parseId(rawId));
  }
}
