import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cat')
export class CatController {}
