import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './evento.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private eventoRepo: Repository<Evento>,
  ) {}

  findAll(): Promise<Evento[]> {
    return this.eventoRepo.find();
  }

  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoRepo.findOne({ where: { id } });
    if (!evento) throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    return evento;
  }

  async create(data: CreateEventoDto): Promise<Evento> {
    const evento = this.eventoRepo.create({
      ...data,
      fecha_inicio: new Date(data.fecha_inicio),
      fecha_fin: new Date(data.fecha_fin),
    });
    return this.eventoRepo.save(evento);
  }

  async update(id: number, data: UpdateEventoDto): Promise<Evento> {
    const evento = await this.findOne(id);

    Object.assign(evento, {
      ...data,
      fecha_inicio: data.fecha_inicio ? new Date(data.fecha_inicio) : evento.fecha_inicio,
      fecha_fin: data.fecha_fin ? new Date(data.fecha_fin) : evento.fecha_fin,
    });

    return this.eventoRepo.save(evento);
  }

  async remove(id: number): Promise<void> {
    const evento = await this.findOne(id);
    await this.eventoRepo.remove(evento);
  }
}
