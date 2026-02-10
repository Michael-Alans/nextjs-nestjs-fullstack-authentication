import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import type { ConfigType } from "@nestjs/config";
import { AuthJwtPayload } from "../types/auth-jwtpayload";
import { AuthService } from "../auth.service";
import refreshConfig from "../config/refresh.config";


@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy,'refresh-jwt') {

    constructor(
        @Inject(refreshConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshConfig>,
        private authService: AuthService
        
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            // Use parentheses to make the cast clear
            secretOrKey: (refreshTokenConfig.secret as string), 
            ignoreExpiration: false
        });
    }

    // The 'payload' is the data you stored in the token (id, name, etc.)
    async validate(payload: AuthJwtPayload) {
      // payload.sub usually contains the user ID
      const userId = payload.sub;
      
      // 1. Make sure you 'await' this!
      const user = await this.authService.validateRefreshToken(userId);
    
      // 2. If the user doesn't exist, return null (Passport will handle 401)
      if (!user) {
        return null;
      }
    
      // 3. Return what the controller expects (id and name)
      return {
        id: user.id,
       
      };
    }
}