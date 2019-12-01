import { Get, Query, Param, HttpStatus } from '@nestjs/common';
import { InterfaceError } from './interface-error.interface';
export abstract class PrincipalAbstractController<CreateDto> {
  // tslint:disable-next-line: variable-name
  private readonly _servicio;
  constructor(servicio: any) {
    this._servicio = servicio;
  }

  @Get()
  async findAll(
    @Query('criterioBusqueda') criterioBusqueda,
  ): Promise<CreateDto | InterfaceError> {
    try {
      if (!criterioBusqueda) {
        return await this._servicio.find();
      }
      return await this._servicio.find(JSON.parse(criterioBusqueda));
    } catch (error) {
      return {
        error,
        mensaje: 'Error buscar todos',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: JSON.parse(criterioBusqueda),
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number | string) {
    try {
      return await this._servicio.findOne(id);
    } catch (error) {
      return {
        error,
        mensaje: 'Error buscar uno',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: id,
      };
    }
  }

  
}
