import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { use } from 'passport';
import { JwtAuthGuard } from './gaurds/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser (@Body() createUserDto:CreateUserDto) {
    return this.authService.registerUser(createUserDto)
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req) { // 👈 Add async here
    // 👈 Add await here to ensure the token is generated before returning
    const result = await this.authService.login(req.user.id, req.user.name);
    
    console.log("Controller Result:", result); // This should now show the accessToken
    return result;
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async getAll(@Request() req) {
    return {
      message:`Now you can access the protected API. this is your id: ${req.user.id}`
    }
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.userId.id, req.user.name)
  }
}
  