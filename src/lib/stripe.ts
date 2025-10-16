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
  // Preço do relatório financeiro
  PRICE_ID: 'price_1QVqGhJNcmPXDjHHvLZoQzQs', // Substitua pelo seu Price ID real
  PRODUCT_NAME: 'Relatório Financeiro Personalizado',
  AMOUNT: 199, // $1.99 em centavos
  CURRENCY: 'cad',
  
  // URLs de redirecionamento
  SUCCESS_URL: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/results?paid=true&session_id={CHECKOUT_SESSION_ID}`,
  CANCEL_URL: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout`,
};

// Função para criar sessão de checkout
export async function createCheckoutSession(userScore: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: STRIPE_CONFIG.CURRENCY,
            product_data: {
              name: STRIPE_CONFIG.PRODUCT_NAME,
              description: 'Análise completa da sua saúde financeira com gráficos, recomendações personalizadas e plano de ação.',
            },
            unit_amount: STRIPE_CONFIG.AMOUNT,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${STRIPE_CONFIG.SUCCESS_URL}&score=${userScore}`,
      cancel_url: STRIPE_CONFIG.CANCEL_URL,
      metadata: {
        userScore,
        product: 'financial_report',
      },
    });

    return session;
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    throw error;
  }
}

// Função para verificar status do pagamento
export async function verifyPayment(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      paid: session.payment_status === 'paid',
      customerEmail: session.customer_details?.email,
      metadata: session.metadata,
    };
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    return { paid: false };
  }
}