import { HttpStatus } from '@nestjs/common';
export interface InterfaceError {
  error?: string;
  mensaje?: string;
  status?: HttpStatus;
  data?: any;
}
