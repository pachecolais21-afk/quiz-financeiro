"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, AlertTriangle, Target, Calendar, Mail, MessageCircle, Lock, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { QuizAnswers, FinancialAnalysis, Recommendation } from "@/lib/types";
import { generateFinancialAnalysis, getHealthColor, getHealthLabel } from "@/lib/financial-analysis";
import { WHATSAPP_NUMBER, EMAIL_ADDRESS } from "@/lib/constants";

function ResultsContent() {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [analysis, setAnalysis] = useState<FinancialAnalysis | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [offerExpired, setOfferExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get URL parameters
  const score = searchParams.get('score');
  const paid = searchParams.get('paid');

  console.log('URL Parameters:', { score, paid });

  useEffect(() => {
    console.log('Component mounted, checking payment status...');
    
    // If paid is "true", show results
    if (paid === "true") {
      console.log('Payment verified, loading results...');
      loadQuizResults();
    } else {
      console.log('Payment not verified, showing offer page...');
      setIsLoading(false);
      // Start countdown timer
      startCountdownTimer();
    }
  }, [paid]);

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

  const startCountdownTimer = () => {
    console.log('Starting 10-minute countdown timer...');
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          console.log('Timer expired!');
          setOfferExpired(true);
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCompletePayment = () => {
    console.log('Redirecting to Stripe payment...');
    window.open('https://buy.stripe.com/aFadR23A8aO13gK93ggrS00', '_blank');
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your report...</p>
        </div>
      </div>
    );
  }

  // Payment not completed - show limited-time offer
  if (paid !== "true") {
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-white shadow-xl border-0 text-center">
            <CardContent className="p-12">
              <div className="bg-blue-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Lock className="h-12 w-12 text-blue-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🎯 Limited-Time Offer!
              </h1>
              
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <span className="text-2xl text-gray-500 line-through">CA$9.99</span>
                  <span className="text-4xl font-bold text-green-600">CA$1.99</span>
                </div>
                
                {!offerExpired ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center space-x-2 text-red-700">
                      <Clock className="h-5 w-5" />
                      <span className="font-semibold">Offer expires in: </span>
                      <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
                    <span className="text-gray-600 font-semibold">Offer expired</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What you'll get:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Personalized financial analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Interactive charts and graphs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">3 Priority Action Items</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Financial health score</span>
                  </div>
                </div>
              </div>
              
              {!offerExpired ? (
                <Button
                  onClick={handleCompletePayment}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Complete your payment - CA$1.99
                </Button>
              ) : (
                <div className="text-gray-500 text-lg font-semibold">
                  Offer expired
                </div>
              )}

              <p className="text-sm text-gray-500 mt-4">
                Secure payment • 256-bit SSL encryption • Instant access
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Payment verified - show full results
  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your personalized report...</p>
        </div>
      </div>
    );
  }

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

export default function Results() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}