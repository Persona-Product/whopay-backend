import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InputUserDto } from './dto/input-user.dto';

// 外部に依存性させる
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepostiory: Repository<User>,
  ) {}

  // 👨‍👩‍👧‍👦 全レコード取得
  async getAllUser(): Promise<User[]> {
    return this.usersRepostiory.find();
  }

  // 💁‍♂️ 単レコード取得
  async getOneUser(userId: string): Promise<User> {
    return this.usersRepostiory.findOne(userId);
  }

  // 🧩 レコード追加
  async createUser(userDto: InputUserDto): Promise<User> {
    const user = this.usersRepostiory.create(userDto);
    await this.usersRepostiory.save(user);
    return user;
  }

  // ✨ レコード更新
  async updateUser(userId: string, userDto: InputUserDto): Promise<User> {
    const user = await this.getOneUser(userId);
    user.userName = userDto.userName;
    user.profileBody = userDto.profileBody;
    user.iconId = userDto.iconId;
    await this.usersRepostiory.save(user);
    return user;
  }

  // 🔥 レコード削除
  async deleteUser(userId: string): Promise<boolean> {
    const result = await this.usersRepostiory.delete(userId);
    return result.affected > 0;
  }
}

// Service(Provoder)は具体的なビジネスロジックを記述
// Controller or Resolver から、複雑なタスクを依頼される
// Service(Provoder)を使用するためには、Moduleへ登録しないといけない
