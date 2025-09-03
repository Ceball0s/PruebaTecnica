import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { Evento } from './evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Get()
  findAll(): Promise<Evento[]> {
    return this.eventosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Evento> {
    return this.eventosService.findOne(id);
  }

  @Post()
    create(@Body() data: CreateEventoDto): Promise<Evento> {
    return this.eventosService.create(data);
    }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateEventoDto): Promise<Evento> {
    return this.eventosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.eventosService.remove(id);
  }
}
