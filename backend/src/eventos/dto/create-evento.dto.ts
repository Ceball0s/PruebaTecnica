import { IsNotEmpty, IsOptional, IsString, IsDateString, Validate } from 'class-validator';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'FechaFinMayor', async: false })
export class FechaFinMayorConstraint implements ValidatorConstraintInterface {
  validate(fecha_fin: string, args: ValidationArguments) {
    const dto = args.object as any;
    return new Date(fecha_fin) > new Date(dto.fecha_inicio);
  }
  defaultMessage(args: ValidationArguments) {
    return 'La fecha_fin debe ser mayor que la fecha_inicio';
  }
}

export class CreateEventoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_inicio: string;

  @IsNotEmpty()
  @IsDateString()
  @Validate(FechaFinMayorConstraint)
  fecha_fin: string;
}
