import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Fade } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import Header from './components/layout/Header';
import ConsentModal from './components/quiz/ConsentModal';
import type { ConsentModalProps } from './components/quiz/ConsentModal'; // Import props type
import QuizContainer from './components/quiz/QuizContainer';
import type { QuizContainerProps } from './components/quiz/QuizContainer'; // Import props type
import Welcome from './components/quiz/Welcome';
import type { WelcomeProps } from './components/quiz/Welcome'; // Import props type
import Results from './components/quiz/Results';
import type { ResultsProps } from './components/quiz/Results'; // Import props type
import { questions } from './data/questions';
import { getTheme } from './theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { submitResult } from './services/api'; 
import type { ResultSubmission } from './services/api'; 
import { getLocation } from './utils/deviceInfo';
import { feedbackMessages } from './data/feedback';


type SubmissionStatus = 'idle' | 'pending' | 'success' | 'error';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const [showConsent, setShowConsent] = useState(true); 
  const [showWelcome, setShowWelcome] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [userName, setUserName] = useState('');
  
  const [submissionPayload, setSubmissionPayload] = useState<ResultSubmission | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [assessmentId, setAssessmentId] = useState<number | undefined>(undefined);

  const [userLocation, setUserLocation] = useState<{
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  } | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const cacheLtr = createCache({
    key: 'mui',
    stylisPlugins: [prefixer],
  });

  const theme = getTheme(isDarkMode, isArabic);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedIsArabic = localStorage.getItem('isArabic') === 'true';
    if (savedDarkMode) setIsDarkMode(true);
    if (savedIsArabic) setIsArabic(true);

    const askForLocation = async () => {
      try {
        const locationData = await getLocation();
        setUserLocation(locationData || null);
      } catch (error) {
        console.error('Location error:', error);
      }
    };
    if (!showConsent) {
        askForLocation();
    }
  }, [showConsent]);

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  const handleLanguageToggle = () => {
    const newIsArabic = !isArabic;
    setIsArabic(newIsArabic);
    localStorage.setItem('isArabic', String(newIsArabic));
  };

  const handleConsentAccept = () => {
    setShowConsent(false);
    setStartTime(new Date()); 
  };

  const handleConsentDecline = () => {
    window.alert(isArabic
      ? 'عذراً، يجب الموافقة على سياسة الخصوصية للمتابعة.'
      : 'Sorry, you must accept the privacy policy to continue.'
    );
  };

  const handleStartQuiz = (name: string) => {
    setUserName(name);
    setShowWelcome(false);
    if (!startTime) { 
        setStartTime(new Date());
    }
  };

  const handleAnswer = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateBmi = () => {
    const heightCm = Number(answers.height);
    const weightKg = Number(answers.weight);
    if (heightCm > 0 && weightKg > 0) {
      const heightM = heightCm / 100;
      return parseFloat((weightKg / (heightM * heightM)).toFixed(2));
    }
    return 0;
  };

  const calculateScore = (calculatedBmi: number) => {
    let score = 100;
    if (calculatedBmi < 18.5 || calculatedBmi >= 30) score -= 20;
    else if (calculatedBmi >= 25) score -= 10;

    const sleep = Number(answers.sleepHours);
    if (sleep < 5 || sleep > 10) score -= 15;
    else if (sleep < 6 || sleep > 9) score -= 7;

    const activity = answers.activityDays;
    if (activity === '0 days' || activity === '0 أيام') score -= 15;
    else if (activity === '1-2 days' || activity === '1-2 يوم') score -= 10;
    else if (activity === '3-4 days' || activity === '3-4 أيام') score -= 5;
    
    const nutrition = answers.nutritionServings;
    if (nutrition === '0 servings' || nutrition === '0 حصص') score -= 15;
    else if (nutrition === '1-2 servings' || nutrition === '1-2 حصة') score -= 10;
    else if (nutrition === '3-4 servings' || nutrition === '3-4 حصة') score -= 5;

    if (answers.smoking === 'Regularly' || answers.smoking === 'بانتظام') score -= 10;
    else if (answers.smoking === 'Occasionally' || answers.smoking === 'أحياناً') score -= 5;

    if (answers.stress === 'High' || answers.stress === 'Very High' || answers.stress === 'مرتفع' || answers.stress === 'مرتفع جداً') score -= 5;
    if (answers.water === 'Less than 1 liter' || answers.water === 'أقل من 1 لتر') score -= 5;
    
    const fastFood = answers.fastFood;
    if (fastFood === '3 or more times per week' || fastFood === '3 مرات أو أكثر في الأسبوع') score -= 5;
    else if (fastFood === '1-2 times per week' || fastFood === '1-2 مرة في الأسبوع') score -= 2;

    if (answers.coffee === '4 or more cups' || answers.coffee === '4 فناجين أو أكثر') score -= 5;

    const energyDrinks = answers.energyDrinks;
    if (energyDrinks === 'Daily or almost daily' || energyDrinks === 'يومياً أو تقريباً يومياً') score -= 5;
    else if (energyDrinks === 'Weekly (1–3 times per week)' || energyDrinks === 'أسبوعياً (1-3 مرات في الأسبوع)') score -=2;
    
    return Math.max(0, Math.round(score));
  };
  
  const prepareAndSubmitData = async () => {
    setSubmissionStatus('pending');
    setSubmissionError(null);

    const calculatedBmi = calculateBmi();
    const calculatedScore = calculateScore(calculatedBmi);
    const endTime = new Date();
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;

    const dataToSubmit: ResultSubmission = {
      userName: userName || null, 
      answers: answers,
      deviceInfo: { 
        name: navigator.platform,
        ip: 'N/A', 
        userAgent: navigator.userAgent,
      },
      location: userLocation || undefined, 
      timeInfo: {
        startTime: startTime || new Date(), 
        endTime: endTime,
        duration: duration, 
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      testInfo: {
        language: isArabic ? 'ar' : 'en',
        theme: isDarkMode ? 'dark' : 'light',
        score: calculatedScore,
        bmi: calculatedBmi,
      },
    };

    setSubmissionPayload(dataToSubmit); 

    try {
      const response = await submitResult(dataToSubmit);
      setAssessmentId(response.assessmentId); 
      setSubmissionStatus('success');
      setShowResults(true); 
    } catch (error: any) {
      console.error('Submission error in App.tsx:', error);
      setSubmissionError(error.message || 'Failed to submit results. Please try again.');
      setSubmissionStatus('error');
      setShowResults(true); 
    }
  };

  const handleNext = () => {
    const currentQ = questions[currentQuestion];
    if (currentQ.required && (answers[currentQ.id] === undefined || answers[currentQ.id] === '')) {
      window.alert(isArabic 
        ? 'الرجاء الإجابة على هذا السؤال' 
        : 'Please answer this question'
      );
      return;
    }

    if (currentQ.validation && typeof answers[currentQ.id] === 'number') {
      if (!currentQ.validation(answers[currentQ.id] as number)) {
        window.alert(isArabic 
          ? 'الرجاء إدخال قيمة صحيحة' 
          : 'Please enter a valid value'
        );
        return;
      }
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Last question: QuizContainer's onSubmit prop (prepareAndSubmitData) will be called by its Finish button.
      // No direct action needed here for submission itself.
      // setShowResults(true) is handled by prepareAndSubmitData on success/error.
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setShowWelcome(true); 
    setUserName('');
    setSubmissionPayload(null);
    setSubmissionStatus('idle');
    setSubmissionError(null);
    setAssessmentId(undefined);
    setStartTime(new Date()); 
  };
  
  const getFeedbackForResults = () => {
    if (!submissionPayload) return {}; 
    const lang = isArabic ? 'ar' : 'en';
    const calculatedBmi = submissionPayload.testInfo.bmi || 0; 
    const currentAnswers = submissionPayload.answers; 

    const getBMIFeedback = () => {
        if (calculatedBmi < 18.5) return feedbackMessages[lang].bmi.underweight;
        if (calculatedBmi >= 30) return feedbackMessages[lang].bmi.obese;
        if (calculatedBmi >= 25) return feedbackMessages[lang].bmi.overweight;
        return feedbackMessages[lang].bmi.normal;
    };
    const getSleepFeedback = () => {
        const sleep = Number(currentAnswers.sleepHours);
        if (sleep < 6) return feedbackMessages[lang].sleep.poor;
        if (sleep < 7) return feedbackMessages[lang].sleep.moderate;
        return feedbackMessages[lang].sleep.good;
    };
    const getActivityFeedback = () => {
        const activity = currentAnswers.activityDays;
        if (activity === "0 days" || activity === "0 أيام") return feedbackMessages[lang].activity.poor;
        if (activity === "1-2 days" || activity === "1-2 يوم" ||
            activity === "3-4 days" || activity === "3-4 أيام") return feedbackMessages[lang].activity.moderate;
        return feedbackMessages[lang].activity.good;
    };
    const getNutritionFeedback = () => {
        const nutrition = currentAnswers.nutritionServings;
        if (nutrition === "0 servings" || nutrition === "0 حصص") return feedbackMessages[lang].nutrition.poor;
        if (nutrition === "1-2 servings" || nutrition === "1-2 حصة" ||
            nutrition === "3-4 servings" || nutrition === "3-4 حصة") return feedbackMessages[lang].nutrition.moderate;
        return feedbackMessages[lang].nutrition.good;
    };
    const getLifestyleFeedback = () => {
        const feedbackList: string[] = [];
        if (currentAnswers.smoking === "Regularly" || currentAnswers.smoking === "بانتظام" ||
            currentAnswers.smoking === "Occasionally" || currentAnswers.smoking === "أحياناً") {
            feedbackList.push(feedbackMessages[lang].lifestyle.smoking);
        }
        if (currentAnswers.stress === "High" || currentAnswers.stress === "Very High" ||
            currentAnswers.stress === "مرتفع" || currentAnswers.stress === "مرتفع جداً") {
            feedbackList.push(feedbackMessages[lang].lifestyle.stress);
        }
        if (currentAnswers.water === "Less than 1 liter" || currentAnswers.water === "أقل من 1 لتر") {
            feedbackList.push(feedbackMessages[lang].lifestyle.water);
        }
        if (currentAnswers.fastFood === "1-2 times per week" || currentAnswers.fastFood === "3 or more times per week" ||
            currentAnswers.fastFood === "1-2 مرة في الأسبوع" || currentAnswers.fastFood === "3 مرات أو أكثر في الأسبوع") {
            feedbackList.push(feedbackMessages[lang].lifestyle.fastFood);
        }
        if (currentAnswers.coffee === "4 or more cups" || currentAnswers.coffee === "4 فناجين أو أكثر") {
            feedbackList.push(feedbackMessages[lang].lifestyle.coffee);
        }
        if (currentAnswers.energyDrinks === "Weekly (1–3 times per week)" || currentAnswers.energyDrinks === "Daily or almost daily" ||
            currentAnswers.energyDrinks === "أسبوعياً (1-3 مرات في الأسبوع)" || currentAnswers.energyDrinks === "يومياً أو تقريباً يومياً") {
            feedbackList.push(feedbackMessages[lang].lifestyle.energyDrinks);
        }
        return feedbackList.length > 0 ? feedbackList : [feedbackMessages[lang].lifestyle.good];
    };

    return {
        bmiFeedback: getBMIFeedback(),
        sleepFeedback: getSleepFeedback(),
        activityFeedback: getActivityFeedback(),
        nutritionFeedback: getNutritionFeedback(),
        lifestyleFeedback: getLifestyleFeedback(),
    };
  };

  const consentModalProps: ConsentModalProps = {
    isOpen: showConsent,
    isArabic: isArabic,
    onAccept: handleConsentAccept,
    onDecline: handleConsentDecline,
  };

  const welcomeProps: WelcomeProps = {
    isArabic: isArabic,
    onStartQuiz: handleStartQuiz, 
    userName: userName,
    setUserName: setUserName,
  };

  const quizContainerProps: QuizContainerProps = {
    questions: questions,
    currentQuestion: currentQuestion,
    onNext: handleNext,
    onPrevious: handlePrevious,
    onAnswer: handleAnswer,
    answers: answers,
    isArabic: isArabic,
    onSubmit: prepareAndSubmitData, 
  };

  const resultsProps: ResultsProps | null = submissionPayload ? {
    answers: submissionPayload.answers,
    isArabic: isArabic,
    onRestart: handleRestart,
    userName: submissionPayload.userName || '',
    score: submissionPayload.testInfo.score,
    bmi: submissionPayload.testInfo.bmi || 0,
    feedback: getFeedbackForResults(),
    submissionStatus: submissionStatus,
    submissionError: submissionError,
    assessmentId: assessmentId,
  } : null;

  return (
    <CacheProvider value={isArabic ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header
          isDarkMode={isDarkMode}
          isArabic={isArabic}
          onThemeToggle={handleThemeToggle}
          onLanguageToggle={handleLanguageToggle}
        />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          {showConsent ? (
            <ConsentModal {...consentModalProps} />
          ) : showWelcome ? (
            <Fade in={showWelcome} timeout={500} mountOnEnter unmountOnExit> 
              <Welcome {...welcomeProps} />
            </Fade>
          ) : !showResults ? (
            <Fade in={!showResults && !showWelcome} timeout={500} mountOnEnter unmountOnExit>
              <QuizContainer {...quizContainerProps} />
            </Fade>
          ) : (
            resultsProps && (
              <Fade in={showResults} timeout={500} mountOnEnter unmountOnExit>
                <Results {...resultsProps} />
              </Fade>
            )
          )}
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
