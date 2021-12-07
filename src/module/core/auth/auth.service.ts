import { Injectable } from '@nestjs/common';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from '@core/supabase/supabase.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { Shop, Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private prisma: PrismaService,
  ) {}

  async sessionShop(token: string): Promise<Shop | null> {
    const shop = await this.prisma.shop.findUnique({
      where: {
        token: token,
      },
    });
    if (!shop.id) throw new Error('Invalid token');
    return shop;
  }

  async sessionUser(token: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        token: token,
      },
    });
    if (!user.id) throw new Error('Invalid token');
    return user;
  }

  async signup(phone: string, password: string): Promise<Session | null> {
    const { session, error } = await this.supabaseService.client.auth.signUp({
      phone,
      password,
    });
    if (error) throw new Error(error.message);
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

    const { user } = await this.supabaseService.client.auth.api.getUser(
      session.access_token,
    );

    return { ...session, user };
  }

  async registerUser(data: Prisma.UserCreateInput): Promise<User | null> {
    return await this.prisma.user.create({
      data,
    });
  }

  async registerShop(data: Prisma.ShopCreateInput): Promise<Shop | null> {
    return await this.prisma.shop.create({
      data,
    });
  }

  async signinUser(phone: string, password: string): Promise<User | null> {
    const { session, error } = await this.supabaseService.client.auth.signIn({
      phone,
      password,
    });
    if (error) throw new Error(error.message);

    const user = await this.prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!user.id) throw new Error(error.message);

    return user;
  }

  async signinShop(phone: string, password: string): Promise<Shop | null> {
    const { session, error } = await this.supabaseService.client.auth.signIn({
      phone,
      password,
    });
    if (error) throw new Error(error.message);

    const shop = await this.prisma.shop.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!shop.id) throw new Error(error.message);

    return shop;
  }

  async signout(token: string): Promise<boolean> {
    const { error } = await this.supabaseService.client.auth.api.signOut(token);
    if (error) return false;
    return true;
  }
}
