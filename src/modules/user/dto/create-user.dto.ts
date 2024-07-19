import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'Rohan',
      })
    firstName: string;
   
    @ApiProperty({
        example: 'chudasama',
      })
    lastName: string;
   
    @ApiProperty({
        example: 'xyz@gmail.com',
      })
    email: string;
   
    @ApiProperty({
        example: true,
      })
    isActive?: boolean;
}
