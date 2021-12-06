import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { SupabaseAuthStrategy } from 'nestjs-supabase-auth';
import { AuthService } from '@core/auth/auth.service';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor(private authService: AuthService) {
    super({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET,
      supabaseOptions: {},
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload: any): Promise<any> {
    super.validate(payload);
    const session = this.authService.signinUser(
      payload.username,
      payload.password,
    );
    if (!session) {
      throw new UnauthorizedException();
    }
    return session;
  }

  // authenticate(req) {
  //   super.authenticate(req);
  // }
}
