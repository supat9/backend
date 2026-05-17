import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { Role } from '../common/enums/role.enum';

export interface ValidatedUser {
  userId: Types.ObjectId;
  email: string;
  role: Role;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(registerDto: RegisterDto): Promise<ValidatedUser> {
    const createdUser = new this.userModel(registerDto);
    try {
      const saved = await createdUser.save();
      const result = saved.toObject();
      return { userId: result._id, email: result.email, role: result.role };
    } catch (e: any) {
      if (e.code === 11000) throw new ConflictException('Email already in use');
      throw e;
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidatedUser | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user.toObject();
      return {
        userId: result._id,
        email: result.email,
        role: result.role,
      };
    }
    return null;
  }
}
