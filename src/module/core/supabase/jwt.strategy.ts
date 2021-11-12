import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SupabaseService } from '@core/supabase/supabase.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly supabaseService: SupabaseService) {
    super({
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: process.env.SUPABASE_JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(req: Request, payload: any) {
    if (payload) {
      // We have a valid user token
      const auth = req.headers['authorization'];
      const token = auth.split(' ')[1];
      // Check that supabase accepts the token
      const { data: user, error } =
        await this.supabaseService.client.auth.api.getUser(token);
      // Update supabase to act as the user
      if (user) {
        this.supabaseService.client.auth.setAuth(token);
      } else {
        if (error) {
          console.log(error);
        }
        // Set auth to the anon key.
        this.supabaseService.client.auth.setAuth(process.env.SUPABASE_KEY);
      }
    } else {
      // Set auth to the anon key.
      this.supabaseService.client.auth.setAuth(process.env.SUPABASE_KEY);
    }
    return payload;
  }
}
