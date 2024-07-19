import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
    @ApiProperty({
        example: 'Api-Integration',
      })
    title: string;

    @ApiProperty({
        example: 'Todo-crud Api',
      })
      description: string;

    @ApiProperty({
        example: true,
      })
    status?: boolean;

}