import { Body, Controller, Get, Put, Delete, Param } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from '@user/user.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  // GET - /user/:id
  @Get(':id')
  getUser(@Param('id') id: User['id']): Promise<User> {
    return this.usersService.getUser(id);
  }

  // PUT - /user/:id
  @Put(':id')
  updateUser(
    @Param('id') id: User['id'],
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.updateUser(id, data);
  }

  // DELETE - /user/:id
  @Delete(':id')
  deleteUser(@Param('id') id: User['id']): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
