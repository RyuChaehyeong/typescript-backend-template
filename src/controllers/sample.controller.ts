import { NextFunction, Request, Response } from 'express';
import { UserDto } from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';
import userService from '../services/user.service';

class SampleController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User | undefined = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };


  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const userData: UserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: UserDto = req.body;
      const updateUserData: User|undefined = await this.userService.updateUser(userId, userData);

      res.status(201).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(userId);
      
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      
    }
  }
}

export default SampleController;