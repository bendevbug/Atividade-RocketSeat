/* eslint-disable prettier/prettier */
import { response } from "express";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User | void {

    const userAlreadyExists = this.usersRepository.findByEmail(email)

    if(userAlreadyExists) {
      throw new Error("this email can't be use");
    }

    const userCreated = this.usersRepository.create({email, name});

    return userCreated;
    
  }
}

export { CreateUserUseCase };
