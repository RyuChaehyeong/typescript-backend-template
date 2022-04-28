
import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from '../dtos/users.dto';
import { UserEntity } from '../entities/users.entity';
import { HttpException } from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';

@EntityRepository()
class UserService extends Repository<UserEntity> {
  
  public async findAllUser(): Promise<User[]> {
    
    const users: User[] = await UserEntity.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User | undefined> {

    const findUser: User | undefined = await UserEntity.findOne({ where: { id: userId } });

    return findUser;
  }


  public async createUser(userData: UserDto): Promise<User> {

    const findUser: User | undefined = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) {
      throw new HttpException(409, 'already exist email');
    }

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({...userData, password: hashedPassword}).save();

    return createUserData;

  }

  public async updateUser(userId: number, userData: UserDto): Promise<User | undefined> {

    const findUser: User | undefined = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) {
      throw new HttpException(409, 'not exist');
    }

    const hashedPassword = await hash(userData.password, 10);
    await UserEntity.update(userId, {...userData, password: hashedPassword});

    const updateUser: User | undefined = await UserEntity.findOne({ where: { id: userId }});

    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {

    const findUser:User | undefined = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) {
      throw new HttpException(409, 'not exist');
    }

    await UserEntity.delete({ id: userId });

    return findUser;
  }
  
}

export default UserService;