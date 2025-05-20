import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';

type SubmissionStatus = 'idle' | 'pending' | 'success' | 'error';

export interface ResultsProps {
  answers: Record<string, string | number>;
  isArabic: boolean;
  onRestart: () => void;
  userName?: string;
  score: number;
  bmi: number;
  feedback: {
    bmiFeedback?: string;
    sleepFeedback?: string;
    activityFeedback?: string;
    nutritionFeedback?: string;
    lifestyleFeedback?: string[];
  };
  submissionStatus: SubmissionStatus;
  submissionError: string | null;
  assessmentId?: number;
}

const ScoreCircle = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  marginBottom: theme.spacing(4),
}));

const Results: React.FC<ResultsProps> = ({
  isArabic,
  onRestart,
  score,
  bmi,
  feedback,
  submissionStatus,
  submissionError,
}) => {
  if (submissionStatus === 'pending') {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6">{isArabic ? 'جارٍ إرسال النتائج...' : 'Submitting results...'}</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 2 }}>
      <Paper sx={{ p: 3 }} className="fade-in">
        {submissionStatus === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submissionError}
          </Alert>
        )}

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {isArabic ? 'نتائجك' : 'Your Results'}
          </Typography>
          
          <ScoreCircle>
            <CircularProgress
              variant="determinate"
              value={score}
              size={160}
              thickness={6}
              sx={{
                color: (theme) => theme.palette.primary.main,
                transform: 'rotate(-90deg) !important',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3" component="div" color="primary" sx={{ fontWeight: 'bold', mb: -1 }}>
                {score}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {isArabic ? 'من 100' : 'out of 100'}
              </Typography>
            </Box>
          </ScoreCircle>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
          {isArabic ? 'ملخص النتائج' : 'Summary'}
        </Typography>      <List>
          <ListItem>
            <ListItemText
              primary={isArabic ? 'مؤشر كتلة الجسم' : 'BMI'}
              secondary={`${bmi.toFixed(1)} - ${feedback.bmiFeedback}`}
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemText
              primary={isArabic ? 'النوم' : 'Sleep'}
              secondary={feedback.sleepFeedback}
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemText
              primary={isArabic ? 'النشاط البدني' : 'Physical Activity'}
              secondary={feedback.activityFeedback}
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemText
              primary={isArabic ? 'التغذية' : 'Nutrition'}
              secondary={feedback.nutritionFeedback}
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <Box sx={{ width: '100%' }}>
              <Typography variant="body1" color="text.primary" gutterBottom>
                {isArabic ? 'نمط الحياة' : 'Lifestyle'}
              </Typography>
              {feedback.lifestyleFeedback?.map((tip, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: index > 0 ? 1 : 0 }}
                >
                  {tip}
                </Typography>
              ))}
            </Box>
          </ListItem>
        </List>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            onClick={onRestart}
            variant="contained"
            color="primary"
            size="large"
            disabled={submissionStatus === 'idle'}
          >
            {submissionStatus === 'idle' ? (
              isArabic ? 'جارٍ الحفظ...' : 'Saving...'
            ) : (
              isArabic ? 'إعادة التقييم' : 'Take Quiz Again'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Results;
