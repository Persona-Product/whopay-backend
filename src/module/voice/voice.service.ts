import { Injectable } from '@nestjs/common';
import { Voice, Prisma } from '@prisma/client';
import { PrismaService } from '@core/prisma/prisma.service';
import { SupabaseService } from '@core/supabase/supabase.service';

@Injectable()
export class VoiceService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  async createVoice(data: Prisma.VoiceCreateInput): Promise<Voice> {
    // ファイル名
    const date = new Date();
    const fileName = `init/${date.getFullYear()}${
      date.getMonth() + 1
    }${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}_${
      data.User.connect.id
    }.m4a`;

    // ファイルをデコード
    const imageBuffer = Buffer.from(data.voiceFile, 'base64');

    // アップロード処理
    const { error } = await this.supabaseService.client.storage
      .from('voice')
      .upload(fileName, imageBuffer, {
        cacheControl: '3600',
        upsert: false,
      });

    // エラーを返す
    if (error) throw new Error('Voice file upload failed');

    // voice情報データを保存
    return await this.prisma.voice.create({
      data: {
        User: { connect: { id: data.User.connect.id } },
        voiceFile: fileName,
      },
    });
  }
}
