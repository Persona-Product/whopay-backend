import { Injectable } from '@nestjs/common';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signup(phone: string, password: string): Promise<Session | null> {
    const { session, error } = await this.supabaseService.client.auth.signUp({
      phone,
      password,
    });
    if (error) throw new Error(error.message);
    if (session) return session;
    return session;
  }

  async verify(phone: string, token: string): Promise<Session | null> {
    const { session, error } = await this.supabaseService.client.auth.verifyOTP(
      {
        phone,
        token,
      },
    );
    if (error) throw new Error(error.message);
    if (session) return session;
    return session;
  }

  async signin(phone: string, password: string): Promise<Session | null> {
    const { session, error } = await this.supabaseService.client.auth.signIn({
      phone,
      password,
    });
    if (error) throw new Error(error.message);
    if (session) return session;
    return session;
  }

  async signout(token: string): Promise<boolean> {
    const { error } = await this.supabaseService.client.auth.api.signOut(token);
    if (error) return false;
    return true;
  }
}
