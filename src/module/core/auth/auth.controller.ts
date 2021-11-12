import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from '@core/auth/token.decorator';
import { SupabaseJwtAuthGuard } from '@core/supabase/guard/supabase-jwt-auth.guard';
import { SupabaseAuthGuard } from '@core/supabase/guard/supabase-auth.guard';

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

  @UseGuards(SupabaseAuthGuard)
  @Post('signin')
  signin(@Request() req) {
    const { phone, password } = req.body;
    const result = this.authService.signin(phone, password);
    return { result, phone };
  }

  @UseGuards(SupabaseJwtAuthGuard)
  @Post('signout')
  signout(@Token() token: string) {
    const result = this.authService.signout(token);
    return { result };
  }
}
