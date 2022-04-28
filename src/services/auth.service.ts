
import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from '../dtos/users.dto';
import { UserEntity } from '../entities/users.entity';
import { HttpException } from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import localStore from 'localStorage';

@EntityRepository()
class AuthService extends Repository<UserEntity> {
  
  public async login(userData: UserDto): Promise<string> {

    let token: any;
    const findUser: User | undefined = await UserEntity.findOne({ where: { email: userData.email } });

    if(findUser) {
      const pwdMatch = await bcrypt.compare(userData.password, findUser.password);

      if (pwdMatch) {
        console.log(findUser.id);
        token = jwt.sign({
            id : findUser.id
        }, 'jwt-secret-key', {
            expiresIn: '1h',
            issuer: 'chyoo'
        });
      }
    }
    return token;
  }

  
}

export default AuthService;