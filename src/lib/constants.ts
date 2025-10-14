import { QuizQuestion } from "./types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Section 1: Savings & Budgeting
  {
    id: 1,
    question: "Do you currently have a monthly budget?",
    type: "yes-no",
    section: "Savings & Budgeting",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 2,
    question: "How often do you track your spending?",
    type: "multiple-choice",
    section: "Savings & Budgeting",
    options: [
      { value: "daily", label: "Daily" },
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
      { value: "rarely", label: "Rarely" },
      { value: "never", label: "Never" }
    ]
  },
  {
    id: 3,
    question: "What percentage of your income do you save each month?",
    type: "multiple-choice",
    section: "Savings & Budgeting",
    options: [
      { value: "0", label: "0%" },
      { value: "1-10", label: "1–10%" },
      { value: "11-20", label: "11–20%" },
      { value: "21-30", label: "21–30%" },
      { value: "30+", label: "30%+" }
    ]
  },
  {
    id: 4,
    question: "Do you have an emergency fund?",
    type: "yes-no",
    section: "Savings & Budgeting",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 5,
    question: "If yes, how many months of expenses does it cover?",
    type: "numeric",
    section: "Savings & Budgeting",
    conditional: { dependsOn: 4, showIf: "yes" }
  },
  {
    id: 6,
    question: "What is your biggest financial goal right now?",
    type: "multiple-choice",
    section: "Savings & Budgeting",
    options: [
      { value: "buy-house", label: "Buy a house" },
      { value: "pay-debt", label: "Pay off debt" },
      { value: "build-savings", label: "Build savings" },
      { value: "invest", label: "Invest" },
      { value: "other", label: "Other" }
    ]
  },
  {
    id: 7,
    question: "What's the biggest obstacle to saving more money?",
    type: "multiple-choice",
    section: "Savings & Budgeting",
    options: [
      { value: "expenses-high", label: "Expenses too high" },
      { value: "income-low", label: "Not enough income" },
      { value: "lack-planning", label: "Lack of planning" },
      { value: "other", label: "Other" }
    ]
  },
  {
    id: 8,
    question: "On average, how much do you spend on dining out or takeout per month?",
    type: "numeric",
    section: "Savings & Budgeting"
  },

  // Section 2: Debt & Credit
  {
    id: 9,
    question: "Do you have any credit card debt?",
    type: "yes-no",
    section: "Debt & Credit",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 10,
    question: "If yes, what's the approximate total balance?",
    type: "numeric",
    section: "Debt & Credit",
    conditional: { dependsOn: 9, showIf: "yes" }
  },
  {
    id: 11,
    question: "Do you pay your credit card in full each month?",
    type: "multiple-choice",
    section: "Debt & Credit",
    conditional: { dependsOn: 9, showIf: "yes" },
    options: [
      { value: "always", label: "Always" },
      { value: "sometimes", label: "Sometimes" },
      { value: "rarely", label: "Rarely" },
      { value: "never", label: "Never" }
    ]
  },
  {
    id: 12,
    question: "Do you have student loans?",
    type: "yes-no",
    section: "Debt & Credit",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 13,
    question: "Do you know your current credit score?",
    type: "yes-no",
    section: "Debt & Credit",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 14,
    question: "Have you ever missed a loan or credit card payment?",
    type: "yes-no",
    section: "Debt & Credit",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 15,
    question: "What's your attitude toward debt?",
    type: "multiple-choice",
    section: "Debt & Credit",
    options: [
      { value: "avoid", label: "Avoid at all costs" },
      { value: "tool", label: "It's a tool if used wisely" },
      { value: "dont-think", label: "I don't think about it much" }
    ]
  },
  {
    id: 16,
    question: "Do you have a mortgage?",
    type: "yes-no",
    section: "Debt & Credit",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },

  // Section 3: Insurance & Protection
  {
    id: 17,
    question: "Do you currently have health insurance?",
    type: "yes-no",
    section: "Insurance & Protection",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 18,
    question: "Do you have life insurance?",
    type: "yes-no",
    section: "Insurance & Protection",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 19,
    question: "Do you have any insurance for disability or critical illness?",
    type: "yes-no",
    section: "Insurance & Protection",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 20,
    question: "How confident are you that your insurance coverage is enough?",
    type: "multiple-choice",
    section: "Insurance & Protection",
    options: [
      { value: "very-confident", label: "Very confident" },
      { value: "somewhat", label: "Somewhat" },
      { value: "not-at-all", label: "Not at all" }
    ]
  },
  {
    id: 21,
    question: "Do you have a will or estate plan in place?",
    type: "yes-no",
    section: "Insurance & Protection",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },

  // Section 4: Investments & Goals
  {
    id: 22,
    question: "Are you currently investing?",
    type: "yes-no",
    section: "Investments & Goals",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 23,
    question: "If yes, where do you invest?",
    type: "multiple-choice",
    section: "Investments & Goals",
    conditional: { dependsOn: 22, showIf: "yes" },
    options: [
      { value: "stocks", label: "Stocks" },
      { value: "bonds", label: "Bonds" },
      { value: "real-estate", label: "Real Estate" },
      { value: "funds", label: "Funds" },
      { value: "retirement", label: "Retirement Accounts" },
      { value: "crypto", label: "Crypto" },
      { value: "other", label: "Other" }
    ]
  },
  {
    id: 24,
    question: "How would you describe your risk tolerance?",
    type: "multiple-choice",
    section: "Investments & Goals",
    options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" }
    ]
  },
  {
    id: 25,
    question: "What's your target age for retirement?",
    type: "numeric",
    section: "Investments & Goals"
  },
  {
    id: 26,
    question: "How much do you expect to need for retirement per year?",
    type: "numeric",
    section: "Investments & Goals"
  },
  {
    id: 27,
    question: "What's your biggest motivation to invest?",
    type: "multiple-choice",
    section: "Investments & Goals",
    options: [
      { value: "retirement", label: "Retirement" },
      { value: "wealth-building", label: "Wealth building" },
      { value: "financial-independence", label: "Financial independence" },
      { value: "family-security", label: "Family security" },
      { value: "other", label: "Other" }
    ]
  },
  {
    id: 28,
    question: "How often do you review your investment portfolio?",
    type: "multiple-choice",
    section: "Investments & Goals",
    conditional: { dependsOn: 22, showIf: "yes" },
    options: [
      { value: "monthly", label: "Monthly" },
      { value: "quarterly", label: "Quarterly" },
      { value: "yearly", label: "Yearly" },
      { value: "never", label: "Never" }
    ]
  },

  // Section 5: Lifestyle & Habits
  {
    id: 29,
    question: "What is the biggest monthly expense you'd be comfortable cutting?",
    type: "text",
    section: "Lifestyle & Habits"
  },
  {
    id: 30,
    question: "How often do you review your bank or credit card statements?",
    type: "multiple-choice",
    section: "Lifestyle & Habits",
    options: [
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
      { value: "rarely", label: "Rarely" }
    ]
  },
  {
    id: 31,
    question: "Do you use automatic transfers to savings?",
    type: "yes-no",
    section: "Lifestyle & Habits",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 32,
    question: "If yes, how much do you transfer automatically each month?",
    type: "numeric",
    section: "Lifestyle & Habits",
    conditional: { dependsOn: 31, showIf: "yes" }
  },
  {
    id: 33,
    question: "Are you financially supporting dependents?",
    type: "multiple-choice",
    section: "Lifestyle & Habits",
    options: [
      { value: "no", label: "No" },
      { value: "1", label: "Yes, 1 dependent" },
      { value: "2", label: "Yes, 2 dependents" },
      { value: "3", label: "Yes, 3 dependents" },
      { value: "4+", label: "Yes, 4+ dependents" }
    ]
  },
  {
    id: 34,
    question: "What is your approximate monthly take-home income?",
    type: "numeric",
    section: "Lifestyle & Habits"
  }
];

export const PAYWALL_QUESTION = 34; // After question 34 (all questions completed)

export const FINANCIAL_HEALTH_LABELS = {
  excellent: { min: 80, label: "Excellent", color: "text-green-600 bg-green-100" },
  good: { min: 60, label: "Good", color: "text-yellow-600 bg-yellow-100" },
  fair: { min: 40, label: "Fair", color: "text-orange-600 bg-orange-100" },
  poor: { min: 0, label: "Needs Improvement", color: "text-red-600 bg-red-100" }
};

export const CHART_COLORS = {
  savings: "#10B981",
  spending: "#3B82F6", 
  debt: "#EF4444",
  current: "#3B82F6",
  recommended: "#10B981"
};

export const QUIZ_TITLE = "Personal Finance Health Check";
export const QUIZ_DESCRIPTION = "Answer these 34 quick questions to discover how healthy your financial life really is. At the end, you'll receive a personalized report with charts, a checklist, and three priority action items focused on improving your financial protection and investment strategy.";

export const PAYWALL_COPY = "You've completed all 34 questions! Unlock your personalized financial report for just $1.99 — including charts, analysis, and 3 priority action items tailored specifically to your situation.";

export const WHATSAPP_NUMBER = "+1 647 223 2622";
export const EMAIL_ADDRESS = "pachecolais21@gmail.com";