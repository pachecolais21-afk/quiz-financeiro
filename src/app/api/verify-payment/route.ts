import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/stripe';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar status do pagamento
    const paymentStatus = await verifyPayment(sessionId);

    return NextResponse.json(paymentStatus);

  } catch (error) {
    console.error('Erro na verificação de pagamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}