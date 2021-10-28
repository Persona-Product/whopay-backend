import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  // GET - /users
  @Get()
  getAllUser(): Promise<any> {
    return this.usersService.getUser();
  }

  // GET - /users
  @Post()
  createUser(): Promise<User> {
    const data = {
      id: 'vbadfkvnakva_1',
      firstName: '宮原',
      lastName: '将太',
      email: 'miyasan31@gmail.com',
      phone: 123456789,
      password: 'password',
    };
    return this.usersService.createUser(data);
  }
}
