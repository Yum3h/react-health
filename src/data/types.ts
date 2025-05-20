export interface BMIFeedback {
  underweight: string;
  normal: string;
  overweight: string;
  obese: string;
}

export interface HealthFeedback {
  poor: string;
  moderate: string;
  good: string;
}

export interface LifestyleFeedback {
  smoking: string;
  stress: string;
  water: string;
  fastFood: string;
  coffee: string;
  energyDrinks: string;
  good: string;
}

export interface FeedbackCategories {
  bmi: BMIFeedback;
  sleep: HealthFeedback;
  activity: HealthFeedback;
  nutrition: HealthFeedback;
  lifestyle: LifestyleFeedback;
}

export interface FeedbackMessages {
  en: FeedbackCategories;
  ar: FeedbackCategories;
}
