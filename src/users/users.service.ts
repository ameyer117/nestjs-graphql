import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './models/user';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public getUsers(getUsersArgs: GetUsersArgs) {
    return getUsersArgs.userIds.map((userId) => this.getUserById({ userId }));
  }

  public getUserById(getUserArgs: GetUserArgs) {
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }

  public createUser(createUserData: CreateUserInput) {
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };

    this.users.push(user);
    return user;
  }

  public updateUser(updateUserData: UpdateUserInput) {
    const userIndex = this.users.findIndex(
      (user) => user.userId === updateUserData.userId,
    );
    if (userIndex === -1) return;
    this.users[userIndex] = { ...this.users[userIndex], ...updateUserData };
    return this.users[userIndex];
  }

  public deleteUser(deleteUserData: DeleteUserInput) {
    const userIndex = this.users.findIndex(
      (user) => user.userId === deleteUserData.userId,
    );
    if (userIndex === -1) return;
    return this.users.splice(userIndex, 1)[0];
  }
}
