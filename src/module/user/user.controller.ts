import { Body, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  // GET - /user
  @Get()
  getAllUser(@Body() { userId: id }): Promise<any> {
    return this.usersService.getAllUser(id);
  }

  // POST - /user
  @Post()
  createUser(@Body() data: any): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Put()
  updateUser(
    @Body()
    { userId: id, data: data },
  ): Promise<User> {
    return this.usersService.updateUser(id, data);
  }

  @Delete()
  deleteUser(@Body() { userId: id }): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
