import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  // GET - /user
  @Get()
  getAllUser(@Body() { userId: id }): Promise<any> {
    return this.usersService.getUser(id);
  }

  // GET - /user
  @Post()
  createUser(@Body() data: any): Promise<User> {
    return this.usersService.createUser(data);
  }
}
