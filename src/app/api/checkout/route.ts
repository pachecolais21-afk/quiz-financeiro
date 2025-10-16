import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { userScore } = await request.json();

    if (!userScore) {
      return NextResponse.json(
        { error: 'Score do usuário é obrigatório' },
        { status: 400 }
      );
    }

    // Criar sessão de checkout do Stripe
    const session = await createCheckoutSession(userScore);

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Erro na API de checkout:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}