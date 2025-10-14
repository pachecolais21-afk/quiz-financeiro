export interface QuizQuestion {
  id: number;
  question: string;
  type: 'multiple-choice' | 'yes-no' | 'numeric' | 'text';
  options?: QuizOption[];
  section?: string;
  conditional?: {
    dependsOn: number;
    showIf: string;
  };
}

export interface QuizOption {
  value: string;
  label: string;
}

export interface QuizAnswers {
  [questionId: number]: string | number;
}

export interface FinancialAnalysis {
  savingsRate: number;
  debtLevel: number;
  spendingRate: number;
  emergencyFund: number;
  investmentLevel: number;
  financialHealth: number;
  pieData: PieChartData[];
  barData: BarChartData[];
  priorityActions: PriorityAction[];
}

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

export interface BarChartData {
  category: string;
  current: number;
  recommended: number;
}

export interface Recommendation {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface PriorityAction {
  title: string;
  description: string;
  priority: number;
}