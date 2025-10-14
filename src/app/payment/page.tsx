"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, CreditCard, Shield, Lock, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Payment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if quiz was completed
    const storedAnswers = localStorage.getItem('quizAnswers');
    if (!storedAnswers) {
      router.push('/quiz');
      return;
    }
  }, [router]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Redirect to Stripe payment link
    window.open('https://buy.stripe.com/aFadR23A8aO13gK93ggrS00', '_blank');
    
    // Simulate payment completion for demo purposes
    setTimeout(() => {
      localStorage.setItem('paymentCompleted', 'true');
      setIsProcessing(false);
      setShowPopup(true);
      
      // Auto-close popup and redirect after 15 seconds
      setTimeout(() => {
        setShowPopup(false);
        router.push('/results');
      }, 15000);
    }, 2000);
  };

  const handleShowReport = () => {
    setShowPopup(false);
    router.push('/results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">FinanceCheck</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unlock Your Financial Report
          </h1>
          <p className="text-lg text-gray-600">
            Get your personalized analysis with charts, recommendations, and action items.
          </p>
        </div>

        {/* Payment Card */}
        <Card className="bg-white shadow-2xl border-0 mb-8">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Complete Your Purchase
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Secure payment processed with industry-standard encryption
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* What's Included */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Personalized charts and graphs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">3 Priority Action Items</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Financial health score</span>
                </div>
                <div className="flex items-center space-x-3 opacity-50">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 blur-sm">⭐️ Bonus: Free meeting with a financial advisor</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="text-center py-6 border-t border-gray-200">
              <div className="text-4xl font-bold text-gray-900 mb-2">$1.99</div>
              <p className="text-gray-600">One-time payment • Instant access</p>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Check Results</span>
                </div>
              )}
            </Button>

            {/* Security Notice */}
            <div className="text-center text-sm text-gray-500 pt-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Lock className="h-4 w-4" />
                <span>256-bit SSL encryption</span>
              </div>
              <p>Your payment information is completely secure and encrypted.</p>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span className="text-sm">Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">Trusted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-md w-full shadow-2xl border-0 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <CardContent className="p-8 text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Payment Successful!
              </h3>
              
              <p className="text-gray-600 mb-6">
                Your personalized financial report is ready. You now have access to your complete analysis and bonus consultation.
              </p>

              {/* Bonus Revealed */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl">⭐️</span>
                  <span className="font-semibold text-blue-800">Bonus Unlocked!</span>
                </div>
                <p className="text-blue-700 font-medium">
                  Free meeting with a financial advisor
                </p>
              </div>
              
              <Button
                onClick={handleShowReport}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-xl"
              >
                Show me my report now
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}