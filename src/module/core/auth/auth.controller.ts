import {
  Controller,
  Request,
  Post,
  // UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from '@core/auth/token.decorator';
// import { JwtSupabaseAuthGuard } from '@core/guard/jwt-supabase-auth.guard';
// import { LocalSupabaseAuthGuard } from '@core/guard/local-supabase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Request() req) {
    const { phone, password } = req.body;
    const result = this.authService.signup(phone, password);
    return { result, phone };
  }

  @Post('verify')
  verify(@Request() req) {
    const { phone, token } = req.body;
    const result = this.authService.verify(phone, token);
    return { result, phone };
  }

  // @UseGuards(LocalSupabaseAuthGuard)
  @Post('signin')
  signin(@Request() req) {
    const { phone, password } = req.body;
    const result = this.authService.signin(phone, password);
    return { result, phone };
  }

  // @UseGuards(JwtSupabaseAuthGuard)
  @Post('signout')
  signout(@Token() token: string) {
    const result = this.authService.signout(token);
    return { result };
  }
}
