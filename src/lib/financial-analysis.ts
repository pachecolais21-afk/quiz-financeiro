import { QuizAnswers, FinancialAnalysis, PriorityAction } from "./types";
import { CHART_COLORS, FINANCIAL_HEALTH_LABELS } from "./constants";

export function generateFinancialAnalysis(answers: QuizAnswers): FinancialAnalysis {
  let savingsRate = 5;
  let debtLevel = 30;
  let emergencyFund = 10;
  let investmentLevel = 15;

  // Analyze savings based on question 3 (savings percentage)
  if (answers[3] === '30+') savingsRate = 35;
  else if (answers[3] === '21-30') savingsRate = 25;
  else if (answers[3] === '11-20') savingsRate = 15;
  else if (answers[3] === '1-10') savingsRate = 8;
  else if (answers[3] === '0') savingsRate = 0;

  // Analyze budgeting (question 1)
  if (answers[1] === 'yes') savingsRate += 5;

  // Analyze spending tracking (question 2)
  if (answers[2] === 'daily') savingsRate += 3;
  else if (answers[2] === 'weekly') savingsRate += 2;
  else if (answers[2] === 'monthly') savingsRate += 1;

  // Analyze emergency fund (questions 4 and 5)
  if (answers[4] === 'yes') {
    const months = Number(answers[5]) || 0;
    if (months >= 6) emergencyFund = 100;
    else if (months >= 3) emergencyFund = 75;
    else if (months >= 1) emergencyFund = 50;
    else emergencyFund = 25;
  } else {
    emergencyFund = 0;
  }

  // Analyze debt based on questions 9, 11, 12, 16
  let totalDebtScore = 0;
  
  // Credit card debt
  if (answers[9] === 'yes') {
    if (answers[11] === 'always') totalDebtScore += 10; // Good - pays in full
    else if (answers[11] === 'sometimes') totalDebtScore += 25;
    else if (answers[11] === 'rarely') totalDebtScore += 40;
    else if (answers[11] === 'never') totalDebtScore += 60;
  }

  // Student loans
  if (answers[12] === 'yes') totalDebtScore += 15;

  // Mortgage (considered good debt)
  if (answers[16] === 'yes') totalDebtScore += 5;

  debtLevel = Math.min(totalDebtScore, 70);

  // Analyze investments (questions 22, 23, 28)
  if (answers[22] === 'yes') {
    investmentLevel = 40;
    
    // Investment diversification
    if (answers[23] === 'funds' || answers[23] === 'retirement') investmentLevel += 30;
    else if (answers[23] === 'stocks') investmentLevel += 20;
    else if (answers[23] === 'real-estate') investmentLevel += 25;
    else if (answers[23] === 'crypto') investmentLevel += 10;
    
    // Portfolio review frequency
    if (answers[28] === 'monthly') investmentLevel += 10;
    else if (answers[28] === 'quarterly') investmentLevel += 8;
    else if (answers[28] === 'yearly') investmentLevel += 5;
  } else {
    investmentLevel = 0;
  }

  // Calculate overall financial health
  const financialHealth = Math.round(
    (savingsRate * 1.5 + (100 - debtLevel) + emergencyFund * 0.8 + investmentLevel * 0.7) / 4
  );

  const spendingRate = Math.max(0, 100 - savingsRate - debtLevel);

  // Generate priority actions based on weakest areas
  const priorityActions = generatePriorityActions(answers, {
    savingsRate,
    debtLevel,
    emergencyFund,
    investmentLevel
  });

  return {
    savingsRate,
    debtLevel,
    spendingRate,
    emergencyFund,
    investmentLevel,
    financialHealth,
    priorityActions,
    pieData: [
      { name: 'Savings', value: savingsRate, color: CHART_COLORS.savings },
      { name: 'Spending', value: spendingRate, color: CHART_COLORS.spending },
      { name: 'Debt', value: debtLevel, color: CHART_COLORS.debt }
    ],
    barData: [
      { category: 'Savings Rate', current: savingsRate, recommended: 20 },
      { category: 'Emergency Fund', current: emergencyFund, recommended: 100 },
      { category: 'Investment', current: investmentLevel, recommended: 70 },
      { category: 'Debt Management', current: 100 - debtLevel, recommended: 100 }
    ]
  };
}

function generatePriorityActions(answers: QuizAnswers, metrics: {
  savingsRate: number;
  debtLevel: number;
  emergencyFund: number;
  investmentLevel: number;
}): PriorityAction[] {
  const actions: PriorityAction[] = [];

  // Priority 1: Life Insurance (always focus on this first if missing)
  if (answers[18] === 'no') {
    actions.push({
      title: "Secure life insurance protection for your family",
      description: "Life insurance is crucial for protecting your family's financial future. Consider term life insurance as an affordable option that provides substantial coverage during your working years.",
      priority: 1
    });
  }

  // Priority 2: Investment Strategy (always second priority)
  if (answers[22] === 'no' || metrics.investmentLevel < 40) {
    actions.push({
      title: "Improve your investment strategy",
      description: "Start or enhance your investment portfolio with diversified funds. Focus on low-cost index funds and retirement accounts to build long-term wealth and secure your financial future.",
      priority: actions.length === 0 ? 1 : 2
    });
  }

  // Priority 3: Emergency Fund (if critical)
  if (metrics.emergencyFund < 25) {
    actions.push({
      title: "Build an emergency fund immediately",
      description: "Start with $1,000 as a starter emergency fund, then work towards 3-6 months of expenses. This is your financial safety net and foundation for all other financial goals.",
      priority: actions.length === 0 ? 1 : actions.length + 1
    });
  }

  // Priority 4: High-interest debt
  if (answers[9] === 'yes' && (answers[11] === 'rarely' || answers[11] === 'never')) {
    actions.push({
      title: "Pay down high-interest credit card debt",
      description: "Focus on paying off credit card balances that aren't paid in full monthly. This debt is costing you significantly in interest and preventing wealth building.",
      priority: actions.length === 0 ? 1 : actions.length + 1
    });
  }

  // Priority 5: Increase savings rate
  if (metrics.savingsRate < 15) {
    const currentRate = answers[3] === '0' ? '0%' : 
                       answers[3] === '1-10' ? '1-10%' :
                       answers[3] === '11-20' ? '11-20%' : 
                       answers[3] === '21-30' ? '21-30%' : '30%+';
    
    actions.push({
      title: `Increase your savings rate from ${currentRate} to at least 15%`,
      description: "Automate your savings by setting up automatic transfers. Start small and increase gradually until you reach 15-20% of your income for optimal financial health.",
      priority: actions.length === 0 ? 1 : actions.length + 1
    });
  }

  // Priority 6: Insurance gaps (disability/critical illness)
  if (answers[19] === 'no') {
    actions.push({
      title: "Consider disability and critical illness insurance",
      description: "Protect your income with disability insurance and consider critical illness coverage. These insurances protect your ability to earn and maintain your lifestyle.",
      priority: actions.length === 0 ? 1 : actions.length + 1
    });
  }

  // Priority 7: Budget and tracking
  if (answers[1] === 'no') {
    actions.push({
      title: "Create a monthly budget to control your spending",
      description: "A budget helps you allocate money intentionally and identify areas where you can save more. Use the 50/30/20 rule as a starting point.",
      priority: actions.length === 0 ? 1 : actions.length + 1
    });
  }

  // Return top 3 priorities, ensuring life insurance and investments are prioritized
  return actions.slice(0, 3);
}

export function getHealthColor(score: number): string {
  if (score >= FINANCIAL_HEALTH_LABELS.excellent.min) return FINANCIAL_HEALTH_LABELS.excellent.color;
  if (score >= FINANCIAL_HEALTH_LABELS.good.min) return FINANCIAL_HEALTH_LABELS.good.color;
  if (score >= FINANCIAL_HEALTH_LABELS.fair.min) return FINANCIAL_HEALTH_LABELS.fair.color;
  return FINANCIAL_HEALTH_LABELS.poor.color;
}

export function getHealthLabel(score: number): string {
  if (score >= FINANCIAL_HEALTH_LABELS.excellent.min) return FINANCIAL_HEALTH_LABELS.excellent.label;
  if (score >= FINANCIAL_HEALTH_LABELS.good.min) return FINANCIAL_HEALTH_LABELS.good.label;
  if (score >= FINANCIAL_HEALTH_LABELS.fair.min) return FINANCIAL_HEALTH_LABELS.fair.label;
  return FINANCIAL_HEALTH_LABELS.poor.label;
}