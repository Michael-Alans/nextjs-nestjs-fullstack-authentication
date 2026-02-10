import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import type { ConfigType } from "@nestjs/config";
import { AuthJwtPayload } from "../types/auth-jwtpayload";
import { AuthService } from "../auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @Inject(jwtConfig.KEY)
        private JwtConfiguration: ConfigType<typeof jwtConfig>,
        private authService: AuthService
        
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Use parentheses to make the cast clear
            secretOrKey: (JwtConfiguration.secret as string), 
            ignoreExpiration: false
        });
    }

    // The 'payload' is the data you stored in the token (id, name, etc.)
  async validate(payload: AuthJwtPayload) {
    const userId = payload.sub
    return this.authService.validateJwtUser(userId)
  }
}