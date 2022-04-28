import { NextFunction, Request, Response } from 'express';
import { UserDto } from '../dtos/users.dto';
import AuthService from '../services/auth.service';

class AuthController {
  public authService = new AuthService();

  public login = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {

    try {
      const userData: UserDto = req.body;
      const token: string = await this.authService.login(userData);
      console.log(token);
      res.status(200).json({ data: token, message: 'login'});
    } catch (error) {
      
    }

  }
}

export default AuthController;