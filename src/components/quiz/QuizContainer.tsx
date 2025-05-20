import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Slider,
  Button,
  LinearProgress,
  Fade,
} from '@mui/material';
import type { Question } from '../../data/questions';

export interface QuizContainerProps { // Exporting for App.tsx import
  questions: Question[];
  currentQuestion: number;
  onNext: () => void;
  onPrevious: () => void;
  onAnswer: (questionId: string, answer: string | number) => void;
  answers: Record<string, string | number>;
  isArabic: boolean;
  onSubmit: () => Promise<void>; 
}

const QuizContainer: React.FC<QuizContainerProps> = ({
  questions,
  currentQuestion,
  onNext,
  onPrevious,
  onAnswer,
  answers,
  isArabic,
  onSubmit, // Destructure onSubmit
}) => {
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const renderInput = () => {
    switch (question.type) {
      case 'number':
        return (
          <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
            <TextField
              type="number"
              inputProps={{
                min: question.min,
                max: question.max,
                step: question.step,
                style: { textAlign: isArabic ? 'right' : 'left' }
              }}
              value={answers[question.id] || ''}
              onChange={(e) => onAnswer(question.id, parseFloat(e.target.value))}
              required={question.required}
              fullWidth
              sx={{ direction: isArabic ? 'rtl' : 'ltr' }}
            />
          </Box>
        );
      case 'text':
        return (
          <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
            <TextField
              value={answers[question.id] || ''}
              onChange={(e) => onAnswer(question.id, e.target.value)}
              required={question.required}
              fullWidth
              sx={{ direction: isArabic ? 'rtl' : 'ltr' }}
              inputProps={{
                style: { textAlign: isArabic ? 'right' : 'left' }
              }}
            />
          </Box>
        );
      case 'select':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', width: '100%', maxWidth: 500, mx: 'auto' }}>
            {(isArabic ? question.ar.options : question.en.options)?.map((option) => (
              <Button
                key={option}
                variant={answers[question.id] === option ? 'contained' : 'outlined'}
                onClick={() => onAnswer(question.id, option)}
                fullWidth
                sx={{
                  p: 2,
                  borderRadius: 2,
                  textAlign: 'center',
                  '&:hover': {
                    backgroundColor: answers[question.id] === option ? 'primary.main' : 'action.hover'
                  }
                }}
              >
                {option}
              </Button>
            ))}
          </Box>
        );
      case 'slider':
        return (
          <Box sx={{ px: 2 }}>
            <Slider
              min={question.min}
              max={question.max}
              step={question.step}
              value={Number(answers[question.id]) || (question.min ?? 0)}
              onChange={(_, value) => onAnswer(question.id, value as number)}
              valueLabelDisplay="auto"
              marks={[
                { value: question.min || 0, label: question.min },
                { value: question.max || 10, label: question.max },
              ]}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextClick = async () => {
    if (currentQuestion === questions.length - 1) {
      setIsSubmitting(true);
      try {
        await onSubmit(); // Call onSubmit when on the last question (Finish button)
      } catch (error) {
        setIsSubmitting(false);
      }
    } else {
      onNext(); // Call onNext for intermediate questions
    }
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{
            display: 'flex', 
            justifyContent: isArabic ? 'flex-end' : 'flex-start',
            alignItems: 'center', 
            mb: 2, 
            direction: isArabic ? 'rtl' : 'ltr' 
          }}>
            <Typography variant="h6">
              {isArabic 
                ? `السؤال ${currentQuestion + 1} من ${questions.length}`
                : `Question ${currentQuestion + 1} of ${questions.length}`
              }
            </Typography>
          </Box>
          <Box dir={isArabic ? 'rtl' : 'ltr'}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'divider',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                }
              }}
            />
          </Box>
        </Box>
          

        <Fade in={true} timeout={300}>
          <Box>
            <Typography variant="body1" sx={{ 
                mb: 3, 
                fontSize: '1.1rem',
                direction: isArabic ? 'rtl' : 'ltr',
                textAlign: 'center',
                width: '100%'
              }}>
              {isArabic ? question.ar.text : question.en.text}
            </Typography>
            <Box sx={{ direction: isArabic ? 'rtl' : 'ltr' }}>
              {renderInput()}
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mt: 4,
              flexDirection: isArabic ? 'row-reverse' : 'row'
            }}>
              <Button
                variant="outlined"
                onClick={onPrevious}
                sx={{ visibility: currentQuestion === 0 ? 'hidden' : 'visible' }}
              >
                {isArabic ? 'السابق' : 'Previous'}
              </Button>
              {/* Changed onClick to handleNextClick */}
              <Button 
                onClick={handleNextClick}
                disabled={isSubmitting}
                variant={currentQuestion === questions.length - 1 ? "contained" : "outlined"}
                color="primary"
                sx={{
                  minWidth: 100,
                  '&.Mui-disabled': {
                    backgroundColor: currentQuestion === questions.length - 1 ? 'action.disabledBackground' : 'transparent',
                    color: 'text.disabled'
                  }
                }}
              > 
                {currentQuestion === questions.length - 1
                  ? (isSubmitting 
                      ? (isArabic ? 'جارٍ الإرسال...' : 'Submitting...')
                      : (isArabic ? 'إنهاء' : 'Finish'))
                  : (isArabic ? 'التالي' : 'Next')}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Paper>
    </Box>
  );
};

export default QuizContainer;
