"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, TrendingUp, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS, PAYWALL_QUESTION, PAYWALL_COPY } from "@/lib/constants";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>("");
  const [filteredQuestions, setFilteredQuestions] = useState(QUIZ_QUESTIONS);
  const router = useRouter();

  // Filter questions based on conditional logic
  useEffect(() => {
    const filtered = QUIZ_QUESTIONS.filter(question => {
      if (!question.conditional) return true;
      
      const dependentAnswer = answers[question.conditional.dependsOn];
      return dependentAnswer === question.conditional.showIf;
    });
    
    setFilteredQuestions(filtered);
  }, [answers]);

  // Reset selected answer when question changes
  useEffect(() => {
    if (filteredQuestions[currentQuestion]) {
      setSelectedAnswer(answers[filteredQuestions[currentQuestion].id] || "");
    }
  }, [currentQuestion, filteredQuestions, answers]);

  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;

  const handleNext = () => {
    if (selectedAnswer !== "" && selectedAnswer !== null) {
      const currentQuestionId = filteredQuestions[currentQuestion].id;
      const newAnswers = {
        ...answers,
        [currentQuestionId]: selectedAnswer
      };
      setAnswers(newAnswers);

      // Check if this is the last question
      if (currentQuestion === filteredQuestions.length - 1) {
        // Store final answers and redirect to payment
        localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
        router.push('/payment');
        return;
      }

      // Move to next question
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer("");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      const prevQuestionId = filteredQuestions[currentQuestion - 1].id;
      setSelectedAnswer(answers[prevQuestionId] || "");
    }
  };

  const handleInputChange = (value: string | number) => {
    setSelectedAnswer(value);
  };

  const renderQuestionInput = () => {
    const question = filteredQuestions[currentQuestion];
    if (!question) return null;

    switch (question.type) {
      case 'multiple-choice':
      case 'yes-no':
        return (
          <RadioGroup 
            value={selectedAnswer.toString()} 
            onValueChange={setSelectedAnswer}
            className="space-y-4"
          >
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="text-lg text-gray-700 cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'numeric':
        return (
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Enter a number"
              value={selectedAnswer}
              onChange={(e) => handleInputChange(e.target.value)}
              className="text-lg p-4 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
            />
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <Textarea
              placeholder="Type your answer here..."
              value={selectedAnswer}
              onChange={(e) => handleInputChange(e.target.value)}
              className="text-lg p-4 border-2 border-gray-200 focus:border-blue-500 rounded-lg min-h-[100px]"
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (!filteredQuestions[currentQuestion]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

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
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {filteredQuestions.length}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-blue-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Section Header */}
        {filteredQuestions[currentQuestion].section && (
          <div className="mb-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {filteredQuestions[currentQuestion].section}
            </div>
          </div>
        )}

        {/* Question Card */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {filteredQuestions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderQuestionInput()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={selectedAnswer === "" || selectedAnswer === null}
                className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
              >
                <span>
                  {currentQuestion === filteredQuestions.length - 1 ? '👉 Check Results' : 'Next'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Paywall Preview - Show when approaching end */}
        {currentQuestion >= filteredQuestions.length - 3 && (
          <Card className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-2">Almost Done!</h3>
              <p className="text-blue-100 mb-4">
                {PAYWALL_COPY}
              </p>
              <div className="text-sm text-blue-200">
                Next: Complete payment to unlock your full report
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Your answers are completely confidential and secure.
          </p>
        </div>
      </div>
    </div>
  );
}