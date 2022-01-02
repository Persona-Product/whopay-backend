import { Injectable } from '@nestjs/common';
import { Payment, Prisma } from '@prisma/client';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async paymentTransaction(data: Prisma.PaymentCreateInput): Promise<Payment> {
    /*
      1. 音声ファイルをAI実行ファイルに転送
      2. AI実行ファイルを実行
      3. 実行結果を取得 
      4. 実行結果を元にユーザー情報からパスコードを取得
      5. パスコードとリクエストのパスコードを比較
      6. パスコードが一致したらStripeで支払い処理を実行
      7. 支払い処理が完了したらPaymentテーブルに登録
     */
    return this.prisma.payment.create({ data });
  }
}
