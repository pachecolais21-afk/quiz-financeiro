"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Calendar, Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ThankYou() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your report has also been sent to your email. Now it's your chance to take the next step 
            and transform your financial future.
          </p>
        </div>

        {/* Main CTA Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl border-0 mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Don't Stop Here - Take Action Now!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-blue-100">
              You now know exactly what needs to be improved. The next step is getting personalized 
              guidance to implement these changes and achieve your financial goals.
            </p>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">🎯 What You'll Get in Your Free Call:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Personalized action plan</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Priority recommendations</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Investment strategies</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Debt elimination plan</span>
                </div>
              </div>
            </div>

            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book your free 15-minute call now
            </Button>
          </CardContent>
        </Card>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Schedule a Call</h3>
              <p className="text-gray-600 text-sm mb-4">
                Book a free 15-minute consultation to discuss your financial goals
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Book Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get instant answers to your financial questions via WhatsApp
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Chat Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Send us your questions and get detailed written responses
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Email Us
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial */}
        <Card className="bg-gray-50 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="text-2xl mb-4">💬</div>
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "After taking the quiz and following the recommendations, I increased my savings rate 
                from 5% to 20% in just 6 months. The personalized guidance was exactly what I needed!"
              </blockquote>
              <div className="text-sm text-gray-600">
                <strong>Sarah M.</strong> - Marketing Manager
              </div>
              <div className="flex justify-center mt-2">
                <div className="flex text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Remember: The best time to start improving your finances was yesterday. 
            The second best time is right now.
          </p>
          <Link href="/results">
            <Button variant="outline" className="mr-4">
              View My Report Again
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">
              Take Another Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}