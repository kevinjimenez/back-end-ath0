import { BadRequestException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
export async function BuscarUnRegistroId(
  nuevoRegistro,
  servicio,
  createDto,
  mensajeError,
) {
  const errores = await validate(createDto);
  const existenErrores = errores.length > 0;
  if (existenErrores) {
    console.error('Error: Error en validacion de createDto', errores);
    throw new BadRequestException({
      error: errores,
      mensaje: mensajeError,
      status: HttpStatus.BAD_REQUEST,
      data: nuevoRegistro,
    });
  } else {
    const registroCreado = servicio.create(nuevoRegistro);
    // const registroGuardado = servicio.save(registroCreado);
    return registroCreado;
  }
}
