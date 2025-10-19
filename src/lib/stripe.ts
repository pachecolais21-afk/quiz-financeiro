import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Cliente Stripe para o frontend
export const getStripe = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  if (!publishableKey) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY não está definida');
  }
  
  return loadStripe(publishableKey);
};

// Cliente Stripe para o backend (server-side)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Configurações do produto
export const STRIPE_CONFIG = {
  // Preço do relatório financeiro (usando o ID fornecido pelo usuário)
  PRICE_ID: 'price_1SHtWf3NSh5b2eajZqSFaYa2',
  PRODUCT_NAME: 'Relatório Financeiro Personalizado',
  AMOUNT: 199, // $1.99 em centavos
  CURRENCY: 'cad',
  
  // URLs de redirecionamento - configuradas para financialcheckquiz.com
  SUCCESS_URL: 'https://financialcheckquiz.com/results?paid=true&session_id={CHECKOUT_SESSION_ID}',
  CANCEL_URL: 'https://financialcheckquiz.com/checkout',
  
  // URL do webhook - deve estar configurada no painel do Stripe
  WEBHOOK_URL: 'https://financialcheckquiz.com/api/webhooks/stripe'
};

// Função para criar sessão de checkout usando o Price ID
export async function createCheckoutSession(userScore: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: STRIPE_CONFIG.PRICE_ID, // Usando o Price ID fornecido
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${STRIPE_CONFIG.SUCCESS_URL}&score=${userScore}`,
      cancel_url: STRIPE_CONFIG.CANCEL_URL,
      metadata: {
        userScore,
        product: 'financial_report',
        timestamp: new Date().toISOString(),
      },
      // Configurações adicionais para melhor experiência
      billing_address_collection: 'auto',
      customer_creation: 'always',
      payment_intent_data: {
        metadata: {
          userScore,
          product: 'financial_report',
        },
      },
    });

    console.log('✅ Checkout session created:', {
      sessionId: session.id,
      url: session.url,
      userScore
    });

    return session;
  } catch (error) {
    console.error('❌ Error creating checkout session:', error);
    throw error;
  }
}

// Função para verificar status do pagamento
export async function verifyPayment(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent']
    });
    
    const result = {
      paid: session.payment_status === 'paid',
      customerEmail: session.customer_details?.email,
      metadata: session.metadata,
      paymentIntentId: session.payment_intent?.id,
      amount: session.amount_total,
      currency: session.currency,
    };

    console.log('✅ Payment verification result:', {
      sessionId,
      paid: result.paid,
      customerEmail: result.customerEmail
    });

    return result;
  } catch (error) {
    console.error('❌ Error verifying payment:', error);
    return { paid: false, error: 'Payment verification failed' };
  }
}

// Função para recuperar detalhes de uma sessão
export async function getSessionDetails(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error('❌ Error retrieving session details:', error);
    throw error;
  }
}