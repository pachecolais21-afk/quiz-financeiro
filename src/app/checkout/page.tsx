"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CreditCard } from "lucide-react";
import Link from "next/link";

export default function Checkout() {
  useEffect(() => {
    // Auto-redirect to Stripe checkout after a short delay
    const timer = setTimeout(() => {
      window.location.href = "https://buy.stripe.com/aFadR23A8aO13gK93ggrS00";
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handlePayNow = () => {
    window.location.href = "https://buy.stripe.com/aFadR23A8aO13gK93ggrS00";
  };

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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
              Complete Your Payment
            </CardTitle>
            <p className="text-lg text-gray-600">
              Please complete the payment first to view your personalized financial analysis.
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your Personalized Financial Report
              </h3>
              <p className="text-gray-700 mb-4">
                Get detailed insights, charts, and 3 priority action items tailored to your financial situation.
              </p>
              <div className="text-2xl font-bold text-blue-600">
                Only CA$1.99
              </div>
            </div>

            <Button 
              size="lg"
              onClick={handlePayNow}
              className="w-full bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Complete Payment Now
            </Button>

            <p className="text-sm text-gray-500">
              Redirecting to secure Stripe checkout in 2 seconds...
            </p>

            <div className="text-xs text-gray-400">
              Secure payment powered by Stripe
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}