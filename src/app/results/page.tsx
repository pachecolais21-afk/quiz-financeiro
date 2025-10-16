"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, AlertTriangle, Target, Calendar, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { QuizAnswers, FinancialAnalysis, Recommendation } from "@/lib/types";
import { generateFinancialAnalysis, getHealthColor, getHealthLabel } from "@/lib/financial-analysis";
import { WHATSAPP_NUMBER, EMAIL_ADDRESS } from "@/lib/constants";

function ResultsContent() {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [analysis, setAnalysis] = useState<FinancialAnalysis | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get URL parameters
  const score = searchParams.get('score');
  const paid = searchParams.get('paid');

  console.log('URL Parameters:', { score, paid });

  useEffect(() => {
    console.log('Component mounted, checking payment status...');
    
    const paidParam = searchParams.get('paid');
    const sessionId = searchParams.get('session_id');
    
    if (paidParam === 'true') {
      console.log('Payment verified via URL parameter, loading results...');
      setIsPaid(true);
      loadQuizResults();
    } else if (sessionId) {
      console.log('Session ID found, verifying payment with Stripe...');
      verifyStripePayment(sessionId);
    } else {
      console.log('Payment not verified, redirecting to checkout...');
      // Redirect to checkout/payment page if not paid
      const score = searchParams.get('score') || localStorage.getItem('userScore') || '75';
      window.location.href = `/checkout?score=${score}`;
    }
  }, [searchParams]);

  const verifyStripePayment = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
      const data = await response.json();
      
      if (data.paid) {
        console.log('Payment verified via Stripe API, loading results...');
        setIsPaid(true);
        loadQuizResults();
      } else {
        console.log('Payment not confirmed, redirecting to checkout...');
        const score = searchParams.get('score') || localStorage.getItem('userScore') || '75';
        window.location.href = `/checkout?score=${score}`;
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      const score = searchParams.get('score') || localStorage.getItem('userScore') || '75';
      window.location.href = `/checkout?score=${score}`;
    }
  };

  const loadQuizResults = () => {
    // Get quiz answers from localStorage
    const storedAnswers = localStorage.getItem('quizAnswers');
    if (storedAnswers) {
      const parsedAnswers = JSON.parse(storedAnswers);
      setAnswers(parsedAnswers);
      const analysisResult = generateFinancialAnalysis(parsedAnswers);
      setAnalysis(analysisResult);
      console.log('Results loaded successfully');
    } else {
      console.log('No quiz answers found, redirecting to quiz...');
      router.push('/quiz');
      return;
    }
    
    setIsLoading(false);
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/16472232622?text=Hi%21%20I%E2%80%99d%20like%20to%20learn%20more%20about%20how%20I%20can%20improve%20my%20financial%20well-being.', '_blank');
  };

  const handleEmailContact = () => {
    window.open('mailto://pachecolais21@gmail.com', '_blank');
  };

  const handleCalendlyContact = () => {
    window.open('https://calendly.com/pachecolais21/new-meeting', '_blank');
  };

  // Show loading while checking payment status
  if (!isPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Checking payment status...</p>
        </div>
      </div>
    );
  }

  // Loading state for results
  if (isLoading || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your personalized report...</p>
        </div>
      </div>
    );
  }

  // Payment verified - show full results
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">FinanceCheck</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Personal Financial Report
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 text-lg font-semibold ${getHealthColor(analysis.financialHealth)}`}>
              Financial Health: {getHealthLabel(analysis.financialHealth)} ({analysis.financialHealth}%)
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Pie Chart */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Your Financial Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analysis.pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {analysis.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Current vs Recommended
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysis.barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#3B82F6" name="Your Current" />
                    <Bar dataKey="recommended" fill="#10B981" name="Recommended" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Text */}
        <Card className="bg-white shadow-xl border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Your Personalized Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Based on your responses, you are currently saving approximately <strong className="text-blue-600">{analysis.savingsRate}%</strong> of your income, 
              while the recommended minimum is <strong className="text-green-600">15-20%</strong>. 
              {analysis.debtLevel > 20 && (
                <span> Your debt level of <strong className="text-red-600">{analysis.debtLevel}%</strong> is impacting your ability to build wealth.</span>
              )}
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {analysis.emergencyFund < 50 ? (
                <span>Your biggest vulnerability is the lack of a sufficient emergency fund, which could put you at financial risk during unexpected situations. </span>
              ) : (
                <span>You have a good foundation with your emergency fund, which provides financial security. </span>
              )}
              {analysis.investmentLevel < 30 && (
                <span>Additionally, increasing your investment activity could significantly accelerate your wealth building.</span>
              )}
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              We recommend focusing on the action items below to improve your financial health score from <strong>{analysis.financialHealth}%</strong> to over <strong className="text-green-600">80%</strong> within the next 12 months.
            </p>
          </CardContent>
        </Card>

        {/* Priority Actions */}
        <Card className="bg-white shadow-xl border-0 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Your Top 3 Priority Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analysis.priorityActions.map((action, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-blue-600 font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h4>
                    <p className="text-gray-700">{action.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Priority {action.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              If you're ready to take action, book a free meeting with a financial advisor.
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get personalized guidance to implement your priority action items and secure your financial future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleWhatsAppContact}
                className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                👉 Organize your financial life now!
              </Button>
              
              <Button 
                size="lg"
                onClick={handleEmailContact}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </Button>

              <Button 
                size="lg"
                onClick={handleCalendlyContact}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book your meeting
              </Button>
            </div>

            <div className="mt-6 text-sm text-blue-200">
              Contact: {WHATSAPP_NUMBER} | {EMAIL_ADDRESS}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function Results() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultsContent />
    </Suspense>
  );
}