import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    console.error('Webhook signature missing');
    return NextResponse.json(
      { error: 'Webhook signature missing' },
      { status: 400 }
    );
  }

  let event;

  try {
    // Verificar assinatura do webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    console.log('Webhook event received:', event.type);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Processar diferentes tipos de eventos
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('✅ Payment completed successfully:', {
          sessionId: session.id,
          customerEmail: session.customer_details?.email,
          paymentStatus: session.payment_status,
          metadata: session.metadata
        });
        
        // Aqui você pode implementar:
        // - Salvar informações do pagamento no banco de dados
        // - Enviar email de confirmação para o cliente
        // - Atualizar status do usuário no sistema
        // - Liberar acesso ao conteúdo premium
        // - Registrar analytics/métricas
        
        // Exemplo de log estruturado para debug
        if (session.metadata?.userScore) {
          console.log(`User with score ${session.metadata.userScore} completed payment`);
        }
        
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('✅ Payment intent succeeded:', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency
        });
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('❌ Payment failed:', {
          paymentIntentId: failedPayment.id,
          lastPaymentError: failedPayment.last_payment_error
        });
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('✅ Invoice payment succeeded:', invoice.id);
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object;
        console.log('✅ Subscription created:', subscription.id);
        break;

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    // Sempre retornar sucesso para o Stripe
    return NextResponse.json({ 
      received: true,
      eventType: event.type,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing webhook event:', error);
    return NextResponse.json(
      { error: 'Error processing webhook event' },
      { status: 500 }
    );
  }
}