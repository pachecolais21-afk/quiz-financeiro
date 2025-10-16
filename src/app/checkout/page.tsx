"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, CreditCard, TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function CheckoutContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutos em segundos
  const [userScore, setUserScore] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Recuperar score do usuário
    const score = searchParams.get('score') || localStorage.getItem('userScore') || "75";
    setUserScore(score);

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [searchParams]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Criar sessão de checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userScore }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirecionar para o Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('Erro ao criar sessão de pagamento');
      }
    } catch (error) {
      console.error('Erro no pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">FinanceCheck</span>
            </Link>
            <Link href="/quiz" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Quiz</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quase Pronto!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Você completou todas as perguntas! Desbloqueie seu relatório financeiro personalizado por apenas <strong>CA$1.99</strong> — incluindo gráficos, análise e 3 itens de ação prioritários adaptados especificamente à sua situação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Oferta Limitada */}
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 shadow-xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="h-6 w-6 text-red-600" />
                <Badge className="bg-red-600 text-white px-3 py-1 text-lg font-bold">
                  OFERTA LIMITADA
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Tempo Restante
              </CardTitle>
              <div className="text-4xl font-bold text-red-600 mt-4">
                {formatTime(timeLeft)}
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-2xl text-gray-500 line-through">
                  CA$9.99
                </div>
                <div className="text-4xl font-bold text-green-600">
                  CA$1.99
                </div>
                <div className="text-sm text-gray-600">
                  Economia de 80%!
                </div>
              </div>
              
              {timeLeft > 0 ? (
                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Completar Pagamento</span>
                    </div>
                  )}
                </Button>
              ) : (
                <div className="w-full bg-gray-400 text-white py-4 text-lg font-semibold rounded-xl">
                  Oferta Expirada
                </div>
              )}
            </CardContent>
          </Card>

          {/* O que você receberá */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                O que você receberá:
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Análise Personalizada</h4>
                  <p className="text-gray-600">Relatório detalhado baseado nas suas respostas específicas</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Gráficos Visuais</h4>
                  <p className="text-gray-600">Visualizações claras da sua situação financeira atual</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">3 Ações Prioritárias</h4>
                  <p className="text-gray-600">Passos específicos para melhorar sua saúde financeira</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Score Financeiro</h4>
                  <p className="text-gray-600">Seu score atual: <strong className="text-blue-600">{userScore}%</strong></p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Acesso Imediato</h4>
                  <p className="text-gray-600">Visualize seus resultados instantaneamente após o pagamento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Garantia */}
        <Card className="bg-blue-50 border-blue-200 mt-8">
          <CardContent className="text-center py-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              💯 Garantia de Satisfação
            </h3>
            <p className="text-gray-700">
              Se você não ficar completamente satisfeito com seu relatório, oferecemos reembolso total em até 30 dias.
            </p>
          </CardContent>
        </Card>

        {/* Informações de Segurança */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>🔒 Pagamento seguro processado pelo Stripe</p>
          <p>✅ Seus dados estão protegidos com criptografia SSL</p>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function CheckoutLoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading checkout...</p>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function Checkout() {
  return (
    <Suspense fallback={<CheckoutLoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}