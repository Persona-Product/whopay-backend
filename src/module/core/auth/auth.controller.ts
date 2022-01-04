import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('session/user')
  async sessionUser(@Request() req) {
    const { token } = req.body;
    const result = await this.authService.sessionUser(token);
    return result;
  }

  @Post('session/shop')
  async sessionShop(@Request() req) {
    const { token } = req.body;
    const result = await this.authService.sessionShop(token);
    return result;
  }

  @Post('signup/email')
  async signupEmail(@Request() req) {
    const { email, password } = req.body;
    const result = await this.authService.signupEmail(email, password);
    return result;
  }

  @Post('signup/phone')
  async signupPhone(@Request() req) {
    const { phone, password } = req.body;
    const result = await this.authService.signupPhone(phone, password);
    return result;
  }

  @Post('verify')
  async verify(@Request() req) {
    const { phone, token } = req.body;
    const result = await this.authService.verify(phone, token);
    return result;
  }

  @Post('register/user')
  async registerUser(@Request() req) {
    const body = req.body;
    const result = await this.authService.registerUser(body);
    return result;
  }

  @Post('register/shop')
  async registerShop(@Request() req) {
    const body = req.body;
    const result = await this.authService.registerShop(body);
    return result;
  }

  // @UseGuards(SupabaseAuthGuard)
  @Post('signin/user')
  async signinUser(@Request() req) {
    const { phoneOrEmail, password, key } = req.body;
    const result = await this.authService.signinUser(
      phoneOrEmail,
      password,
      key,
    );
    return result;
  }

  // @UseGuards(SupabaseAuthGuard)
  @Post('signin/shop')
  async signinShop(@Request() req) {
    const { phone, password } = req.body;
    const result = await this.authService.signinShop(phone, password);
    return result;
  }

  // @UseGuards(SupabaseJwtAuthGuard)
  @Post('signout')
  // async signout(@Token() token: string) {
  async signout(@Request() req) {
    const { token } = req.body;
    const result = await this.authService.signout(token);
    return { result };
  }
}
