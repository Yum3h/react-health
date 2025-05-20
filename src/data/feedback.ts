import type { FeedbackMessages } from './types';

export const feedbackMessages: FeedbackMessages = {
  en: {
    bmi: {
      underweight: "You are underweight. Consider consulting a healthcare provider for personalized advice on healthy weight gain.",
      normal: "Your BMI is in the healthy range. Keep maintaining a balanced diet and regular exercise.",
      overweight: "You are overweight. Focus on balanced nutrition and regular physical activity.",
      obese: "Your BMI indicates obesity. Please consult a healthcare provider for personalized advice.",
    },
    sleep: {
      poor: "Your sleep duration is concerning. Adults need 7-9 hours of sleep. Try improving your sleep habits.",
      moderate: "Your sleep duration is slightly below recommended. Aim for 7-9 hours of sleep.",
      good: "Your sleep duration is good! Keep maintaining healthy sleep habits.",
    },
    activity: {
      poor: "Your physical activity level is low. Try to include at least 150 minutes of moderate activity per week.",
      moderate: "You're getting some exercise, but try to increase it to meet recommended guidelines.",
      good: "Great job staying active! Keep maintaining this level of physical activity.",
    },
    nutrition: {
      poor: "Your fruit and vegetable intake is low. Aim for at least 5 servings daily.",
      moderate: "Try to increase your fruit and vegetable intake to 5 or more servings daily.",
      good: "Excellent fruit and vegetable intake! Keep up the healthy eating habits.",
    },
    lifestyle: {
      smoking: "Smoking is harmful to your health. Consider quitting and seek support if needed.",
      stress: "Your stress levels are high. Consider stress management techniques or professional help.",
      water: "Try to increase your water intake to at least 2 liters per day.",
      fastFood: "Consider reducing fast food consumption for better health.",
      coffee: "Your coffee intake is high. Consider reducing it to moderate levels.",
      energyDrinks: "Try to reduce or eliminate energy drink consumption.",
      good: "Your lifestyle habits are generally healthy. Keep it up!",
    },
  },
  ar: {
    bmi: {
      underweight: "وزنك أقل من المعدل الطبيعي. يُنصح باستشارة مختص رعاية صحية للحصول على نصائح شخصية لزيادة الوزن بشكل صحي.",
      normal: "مؤشر كتلة جسمك في النطاق الصحي. حافظ على نظام غذائي متوازن وممارسة الرياضة بانتظام.",
      overweight: "وزنك زائد. ركز على التغذية المتوازنة والنشاط البدني المنتظم.",
      obese: "مؤشر كتلة جسمك يشير إلى السمنة. يرجى استشارة مختص رعاية صحية للحصول على نصائح شخصية.",
    },
    sleep: {
      poor: "مدة نومك مقلقة. يحتاج البالغون إلى 7-9 ساعات من النوم. حاول تحسين عادات نومك.",
      moderate: "مدة نومك أقل قليلاً من الموصى به. اهدف إلى 7-9 ساعات من النوم.",
      good: "مدة نومك جيدة! حافظ على عادات النوم الصحية.",
    },
    activity: {
      poor: "مستوى نشاطك البدني منخفض. حاول ممارسة 150 دقيقة على الأقل من النشاط المعتدل أسبوعياً.",
      moderate: "تمارس بعض التمارين، لكن حاول زيادتها لتلبية التوصيات.",
      good: "عمل رائع في البقاء نشيطاً! حافظ على هذا المستوى من النشاط البدني.",
    },
    nutrition: {
      poor: "تناولك للفواكه والخضروات منخفض. اهدف إلى 5 حصص على الأقل يومياً.",
      moderate: "حاول زيادة تناول الفواكه والخضروات إلى 5 حصص أو أكثر يومياً.",
      good: "ممتاز! حافظ على عادات الأكل الصحية الخاصة بك.",
    },
    lifestyle: {
      smoking: "التدخين ضار بصحتك. فكر في الإقلاع عنه واطلب الدعم إذا احتجت.",
      stress: "مستويات التوتر لديك مرتفعة. فكر في تقنيات إدارة التوتر أو المساعدة المهنية.",
      water: "حاول زيادة شرب الماء إلى لترين على الأقل يومياً.",
      fastFood: "فكر في تقليل استهلاك الوجبات السريعة لصحة أفضل.",
      coffee: "استهلاكك للقهوة مرتفع. فكر في تقليله إلى مستويات معتدلة.",
      energyDrinks: "حاول تقليل أو إيقاف استهلاك مشروبات الطاقة.",
      good: "عاداتك الحياتية صحية بشكل عام. استمر على هذا النحو!",
    },
  },
};
