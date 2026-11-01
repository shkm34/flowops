import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, HealthController, NotesController],
  providers: [AppService, PrismaService, NotesService],
})
export class AppModule {}
