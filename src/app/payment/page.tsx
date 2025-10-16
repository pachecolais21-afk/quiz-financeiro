"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, CreditCard, Shield, Lock, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Payment() {
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [timerExpired, setTimerExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if quiz was completed
    const storedAnswers = localStorage.getItem('quizAnswers');
    if (!storedAnswers) {
      router.push('/quiz');
      return;
    }

    // Check if payment was already completed
    const paymentCompleted = localStorage.getItem('paymentCompleted');
    if (paymentCompleted === 'true') {
      router.push('/results');
      return;
    }
  }, [router]);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0 && !timerExpired) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setTimerExpired(true);
    }
  }, [timeLeft, timerExpired]);

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePayment = () => {
    // Redirect directly to Stripe checkout with success URL
    const successUrl = encodeURIComponent(`${window.location.origin}/results?payment_success=true`);
    const cancelUrl = encodeURIComponent(`${window.location.origin}/payment`);
    
    // Redirect to Stripe payment link
    window.location.href = 'https://buy.stripe.com/aFadR23A8aO13gK93ggrS00';
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

        {/* Limited-Time Offer Timer */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-xl border-0 mb-6">
          <CardContent className="p-6 text-center">
            {!timerExpired ? (
              <>
                <div className="flex items-center justify-center mb-3">
                  <span className="text-2xl mr-2">🎯</span>
                  <h3 className="text-xl font-bold">Limited-Time Offer!</h3>
                </div>
                <p className="text-lg mb-4">
                  The price was <span className="line-through text-blue-200">$9.99</span>, now only <span className="font-bold text-2xl">$1.99</span>
                </p>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-lg font-semibold">Offer ends in:</span>
                </div>
                <div className="text-3xl font-bold text-yellow-300">
                  {formatTime(timeLeft)}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold">Special Offer Expired</h3>
                </div>
                <p className="text-blue-100">
                  This special offer has expired — please refresh to check current availability.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Check Results</span>
              </div>
            </Button>

            {/* Contact Options */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-center text-lg font-semibold text-gray-900 mb-4">
                Need Help? Contact Us:
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                  onClick={() => window.open('https://wa.me/16472232622?text=Hi%21%20I%E2%80%99d%20like%20to%20learn%20more%20about%20how%20I%20can%20improve%20my%20financial%20well-being.', '_blank')}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                  onClick={() => window.open('mailto:pachecolais21@gmail.com', '_blank')}
                >
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-purple-500 text-purple-600 hover:bg-purple-50"
                  onClick={() => window.open('https://calendly.com/pachecolais21/new-meeting', '_blank')}
                >
                  Book Meeting
                </Button>
              </div>
            </div>

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
    </div>
  );
}