import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtpayload';
import { JwtService } from '@nestjs/jwt';
import * as config from '@nestjs/config';
import refreshConfig from './config/refresh.config';

@Injectable()
export class AuthService {

    constructor(private readonly userService:UserService,
                private readonly JwtService:JwtService,
                @Inject(refreshConfig.KEY)
                private refreshTokenConfig: config.ConfigType<typeof refreshConfig>,
                ) {}
    async registerUser(createUserDto:CreateUserDto) {
      const user = await this.userService.findByEmail(createUserDto.email)
      if(user) throw new ConflictException('User already exists')
      return await this.userService.create(createUserDto)
    }

    async validateLocalUser(email:string, password:string) {
       const user = await this.userService.findByEmail(email)
       if(!user) throw new UnauthorizedException('User not found')

       const isPasswordMatched = await verify(user.password, password)
       if(!isPasswordMatched) throw new UnauthorizedException('invalid credential')

       return {
        id:user.id,
        name: user.name
       }
    }

    async login(userId:number, name?:string) {
      const {accessToken, refreshToken} = await this.generateToken(userId)

      return {
        id:userId,
        name:name,
        accessToken,
        refreshToken
      }
    }

    async generateToken(userId:number) {
      const payload:AuthJwtPayload = {sub:userId}
      const [accessToken, refreshToken] = await Promise.all([ 
        this.JwtService.signAsync(payload),
        this.JwtService.signAsync(payload, this.refreshTokenConfig),
      ])

      return {
        accessToken,
        refreshToken
      }
    }


    async validateJwtUser(userId:number) {
      const user = await this.userService.findOne(userId)
      if(!user) throw new UnauthorizedException("User not found")
      const currentUser = {id: ( user)?.id }
      return currentUser
    }

    async validateRefreshToken(userId:number) {
      const user = await this.userService.findOne(userId)
      if(!user) throw new UnauthorizedException("User not found")
      const currentUser = {id: ( user)?.id }
      return currentUser
    }

    async refreshToken(userId:number, name:string) {
      const {accessToken, refreshToken} = await this.generateToken(userId)

      return {
        id:userId,
        name:name,
        accessToken,
        refreshToken
      }
    }

}
