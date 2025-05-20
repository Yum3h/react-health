export interface Question {
  id: string;
  en: {
    text: string;
    options?: string[];
  };
  ar: {
    text: string;
    options?: string[];
  };
  type: 'text' | 'number' | 'select' | 'slider';
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  category: 'personal' | 'bmi' | 'sleep' | 'activity' | 'nutrition' | 'lifestyle' | 'conditions';
  validation?: (value: number) => boolean;
}

export const questions: Question[] = [
  {
    id: 'gender',
    en: {
      text: 'What is your gender?',
      options: ['Male', 'Female']
    },
    ar: {
      text: 'ما هو جنسك؟',
      options: ['ذكر', 'أنثى']
    },
    type: 'select',
    required: true,
    category: 'personal'
  },
  {
    id: 'age',
    en: { text: 'What is your age?' },
    ar: { text: 'كم عمرك؟' },
    type: 'number',
    min: 10,
    max: 120,
    required: true,
    category: 'personal',
    validation: value => value >= 10 && value <= 120
  },
  {
    id: 'height',
    en: { text: 'What is your height in centimeters?' },
    ar: { text: 'ما هو طولك بالسنتيمتر؟' },
    type: 'number',
    min: 100,
    max: 300,
    required: true,
    category: 'bmi',
    validation: value => value >= 100 && value <= 300
  },
  {
    id: 'weight',
    en: { text: 'What is your weight in kilograms?' },
    ar: { text: 'ما هو وزنك بالكيلوغرام؟' },
    type: 'number',
    min: 30,
    max: 400,
    required: true,
    category: 'bmi',
    validation: value => value >= 30 && value <= 400
  },
  {
    id: 'sleepHours',
    en: { text: 'How many hours do you sleep on average per night?' },
    ar: { text: 'كم ساعة تنام في المتوسط في الليلة؟' },
    type: 'slider',
    min: 2,
    max: 12,
    step: 0.5,
    required: true,
    category: 'sleep'
  },
  {
    id: 'activityDays',
    en: {
      text: 'How many days per week do you engage in moderate to vigorous physical activity (at least 30 minutes)?',
      options: ['0 days', '1-2 days', '3-4 days', '5+ days']
    },
    ar: {
      text: 'كم يوم في الأسبوع تمارس النشاط البدني المتوسط إلى القوي (30 دقيقة على الأقل)؟',
      options: ['0 أيام', '1-2 يوم', '3-4 أيام', '5+ أيام']
    },
    type: 'select',
    required: true,
    category: 'activity'
  },
  {
    id: 'nutritionServings',
    en: {
      text: 'How many servings of fruits and vegetables do you eat daily?',
      options: ['0 servings', '1-2 servings', '3-4 servings', '5+ servings']
    },
    ar: {
      text: 'كم حصة من الفواكه والخضروات تتناول يومياً؟',
      options: ['0 حصص', '1-2 حصة', '3-4 حصص', '5+ حصص']
    },
    type: 'select',
    required: true,
    category: 'nutrition'
  },
  {
    id: 'smoking',
    en: {
      text: 'Do you smoke or use tobacco products?',
      options: ['Never', 'Occasionally', 'Regularly', 'Former smoker']
    },
    ar: {
      text: 'هل تدخن أو تستخدم منتجات التبغ؟',
      options: ['أبداً', 'أحياناً', 'بانتظام', 'مدخن سابق']
    },
    type: 'select',
    required: true,
    category: 'lifestyle'
  },
  {
    id: 'stress',
    en: {
      text: 'How would you rate your stress level in the past month?',
      options: ['Low', 'Moderate', 'High', 'Very High']
    },
    ar: {
      text: 'كيف تقيم مستوى التوتر لديك في الشهر الماضي؟',
      options: ['منخفض', 'متوسط', 'مرتفع', 'مرتفع جداً']
    },
    type: 'select',
    required: true,
    category: 'lifestyle'
  },
  {
    id: 'conditions',
    en: {
      text: 'Do you have any chronic health conditions (e.g., diabetes, hypertension, heart disease)?',
      options: ['None', '1 condition', '2 conditions', '3 or more conditions']
    },
    ar: {
      text: 'هل لديك أي حالات صحية مزمنة (مثل السكري، ارتفاع ضغط الدم، أمراض القلب)؟',
      options: ['لا يوجد', 'حالة واحدة', 'حالتين', '3 حالات أو أكثر']
    },
    type: 'select',
    required: true,
    category: 'conditions'
  },
  {
    id: 'water',
    en: {
      text: 'How many liters of water do you typically drink per day?',
      options: ['Less than 1 liter', '1-2 liters', '2-3 liters', 'More than 3 liters']
    },
    ar: {
      text: 'كم لتر من الماء تشرب عادةً في اليوم؟',
      options: ['أقل من 1 لتر', '1-2 لتر', '2-3 لتر', 'أكثر من 3 لتر']
    },
    type: 'select',
    required: true,
    category: 'lifestyle'
  },
  {
    id: 'fastFood',
    en: {
      text: 'How often do you consume fast food (e.g., burgers, fries, pizza, etc.)?',
      options: ['Rarely or never', '1-2 times per month', '1-2 times per week', '3 or more times per week']
    },
    ar: {
      text: 'كم مرة تتناول الوجبات السريعة (مثل البرغر والبطاطس والبيتزا وغيرها)؟',
      options: ['نادراً أو أبداً', '1-2 مرة في الشهر', '1-2 مرة في الأسبوع', '3 مرات أو أكثر في الأسبوع']
    },
    type: 'select',
    required: true,
    category: 'lifestyle'
  },
  {
    id: 'coffee',
    en: {
      text: 'How much coffee do you typically drink in a day?',
      options: ['None', '1 cup', '2-3 cups', '4 or more cups']
    },
    ar: {
      text: 'كم فنجان قهوة تشرب عادةً في اليوم؟',
      options: ['لا شيء', 'فنجان واحد', '2-3 فناجين', '4 فناجين أو أكثر']
    },
    type: 'select',
    required: true,
    category: 'lifestyle'
  },
  {
    id: 'energyDrinks',
    en: {
      text: 'How often do you consume energy drinks?',
      options: ['Never', 'Occasionally (1–2 times per month)', 'Weekly (1–3 times per week)', 'Daily or almost daily']
    },
    ar: {
      text: 'كم مرة تستهلك مشروبات الطاقة؟',
      options: ['أبداً', 'أحياناً (1-2 مرة في الشهر)', 'أسبوعياً (1-3 مرات في الأسبوع)', 'يومياً أو تقريباً يومياً']
    },
    type: 'select',
    required: true,
    category: 'lifestyle'
  }
];
