import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';
import { PythonShell } from 'python-shell';
import { SupabaseService } from '@core/supabase/supabase.service';
import { Payment } from '@prisma/client';

type PayBody = {
  shopId: string;
  passcode: string;
  amount: number;
  voiceFile: string;
};

type PaymentUserResult = {
  id: number;
  amount: number;
  updatedAt: Date;
  Shop: {
    id: string;
    shopName: string;
  };
};

type PaymentShopResult = {
  id: number;
  amount: number;
  updatedAt: Date;
  User: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

type PaymentDetailResult = {
  id: number;
  amount: number;
  updatedAt: Date;
  User: {
    id: string;
    firstName: string;
    lastName: string;
  };
  Shop: {
    id: string;
    shopName: string;
  };
};

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  async getPaymentUserList(
    userId: Payment['userId'],
    year: string,
    month: string,
  ): Promise<PaymentUserResult[]> {
    const nextYear = Number(month) === 12 ? Number(year) + 1 : Number(year);
    const nextMonth = Number(month) === 12 ? 1 : Number(month) + 1;

    return await this.prisma.payment.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${nextYear}-${nextMonth}-01`),
        },
      },
      select: {
        id: true,
        amount: true,
        updatedAt: true,
        Shop: {
          select: {
            id: true,
            shopName: true,
          },
        },
      },
    });
  }

  async getPaymentShopList(
    shopId: Payment['shopId'],
    year: string,
    month: string,
  ): Promise<PaymentShopResult[]> {
    const nextYear = Number(month) === 12 ? Number(year) + 1 : Number(year);
    const nextMonth = Number(month) === 12 ? 1 : Number(month) + 1;
    return await this.prisma.payment.findMany({
      where: {
        shopId,
        createdAt: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${nextYear}-${nextMonth}-01`),
        },
      },
      select: {
        id: true,
        amount: true,
        updatedAt: true,
        User: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async getPayment(id: Payment['id']): Promise<PaymentDetailResult> {
    return await this.prisma.payment.findUnique({
      where: { id },
      select: {
        id: true,
        amount: true,
        updatedAt: true,
        User: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        Shop: {
          select: {
            id: true,
            shopName: true,
          },
        },
      },
    });
  }

  /*
      1. 音声ファイルをAI実行ファイルに転送
      2. AIファイルを実行
      3. 実行結果を取得 
      4. 実行結果を元にユーザー情報からパスコードを取得
      5. パスコードとリクエストのパスコードを比較
      6. パスコードが一致したらStripeで支払い処理を実行
      7. 支払い処理が完了したらVoiceファイルを保存
      8. 支払い処理が完了したらVoiceテーブルに登録
      9. 支払い処理が完了したらPaymentテーブルに登録
      10. 実行結果を返却
     */

  async paymentTransaction(data: PayBody): Promise<{ result: boolean }> {
    // 1. 音声ファイルをAI実行ファイルに転送
    const pyshell = new PythonShell('who/index.py');
    await pyshell.send(data.amount);

    // 2. AIファイルを実行
    const { success, resultUid } = await new Promise((resolve, reject) => {
      pyshell.on('message', (data, err) => {
        // 3. 実行結果を取得
        if (err) {
          reject({ success: false, resultUid: data });
        }
        resolve({ success: true, resultUid: data });
      });
    });
    console.info('result uid', resultUid);
    if (!success) throw new Error('ai error');

    // 4. 実行結果を元にユーザー情報からパスコードを取得
    const user = await this.prisma.user.findUnique({
      where: { id: resultUid },
    });
    if (!user) throw new Error('user not found');

    // 5. パスコードとリクエストのパスコードを比較
    if (user.passcode !== data.passcode) throw new Error('passcode not match');

    // 6. パスコードが一致したらStripeで支払い処理を実行
    /*
     *
     * stripe決済処理
     * *
     */

    // 7. 支払い処理が完了したらVoiceファイルを保存
    const date = new Date();
    const fileName = `pay/${date.getFullYear()}${
      date.getMonth() + 1
    }${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}_${resultUid}.m4a`;
    const imageBuffer = Buffer.from(data.voiceFile, 'base64');
    const { error } = await this.supabaseService.client.storage
      .from('voice')
      .upload(fileName, imageBuffer, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) throw new Error('voice upload error');

    // 8. 支払い処理が完了したらVoiceテーブルに登録
    const voice = await this.prisma.voice.create({
      data: {
        voiceFile: fileName,
        User: { connect: { id: resultUid } },
      },
    });
    if (!voice) throw new Error('voice create error');

    // 9. 支払い処理が完了したらPaymentテーブルに登録
    const payment = await this.prisma.payment.create({
      data: {
        amount: Number(data.amount),
        User: { connect: { id: resultUid } },
        Shop: { connect: { id: data.shopId } },
        Voice: { connect: { id: voice.id } },
      },
    });
    if (!payment) throw new Error('payment create error');

    // 10. 実行結果を返却
    return { result: true };
  }
}
