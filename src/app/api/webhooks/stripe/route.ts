import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Assinatura do webhook ausente' },
      { status: 400 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Processar diferentes tipos de eventos
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Pagamento concluído:', session.id);
        
        // Aqui você pode:
        // - Salvar informações do pagamento no banco de dados
        // - Enviar email de confirmação
        // - Atualizar status do usuário
        // - Etc.
        
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Pagamento bem-sucedido:', paymentIntent.id);
        break;

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro no webhook' },
      { status: 400 }
    );
  }
}