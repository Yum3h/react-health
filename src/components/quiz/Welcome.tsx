import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  Alert,
  TextField,
  Grow, // Import Grow for animations
} from '@mui/material';

export interface WelcomeProps {
  isArabic: boolean;
  onStartQuiz: (name: string) => void;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
}

// Modified to use React.forwardRef
const Welcome = React.forwardRef<HTMLDivElement, WelcomeProps>(
  ({ onStartQuiz, isArabic, userName, setUserName }, ref) => {

    const handleStart = () => {
      onStartQuiz(userName); // Pass userName directly, can be empty
    };

    return (
      // Pass the forwarded ref to the root Box component
      <Box ref={ref} sx={{ maxWidth: 'lg', mx: 'auto', p: { xs: 2, md: 3 } }}>
        <Paper 
          elevation={3} // Add a bit more shadow
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
            borderRadius: 2, // Softer corners
            textAlign: isArabic ? 'right' : 'left', // Ensure text alignment respects isArabic
          }} 
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <Grow in={true} timeout={500}>
            <Typography
              variant="h4"
              component="h1" // More semantic for a page title
              gutterBottom // Adds margin-bottom
              sx={{
                mb: 3,
                fontWeight: 'bold', // Make title bolder
                textAlign: 'center',
                fontFamily: isArabic ? '"Cairo", sans-serif' : 'inherit',
                color: 'primary.main', // Use theme color
              }}
            >
              {isArabic
                ? 'مرحباً بكم في اختبار التقييم الصحي'
                : 'Welcome to Health Assessment Quiz'}
            </Typography>
          </Grow>

          <Grow in={true} timeout={700}>
            <Typography
              variant="body1" // Good for descriptive text
              sx={{
                mb: 4,
                fontSize: '1.1rem', // Slightly larger body text
                lineHeight: 1.7, // Improve readability
                textAlign: 'center', // Center align description
                fontFamily: isArabic ? '"Cairo", sans-serif' : 'inherit',
              }}
            >
              {isArabic
                ? 'سيقوم هذا التقييم بتقييم صحتك بناءً على عوامل مختلفة بما في ذلك مؤشر كتلة الجسم، جودة النوم، النشاط البدني، وعادات التغذية. سيتم حساب درجتك النهائية من أصل 100.'
                : 'This assessment will evaluate your health based on various factors including BMI, sleep quality, physical activity, and nutrition habits. Your final score will be calculated out of 100.'}
            </Typography>
          </Grow>

          <Grow in={true} timeout={900}>
            <Alert
              dir={isArabic ? 'rtl' : 'ltr'}
              severity="warning"
              variant="outlined"
              sx={{
                mb: 3,
                fontFamily: isArabic ? '"Cairo", sans-serif' : 'inherit',
                flexDirection: isArabic ? 'row-reverse' : 'row',
                '.MuiAlert-message': {
                  flexGrow: 1,
                  direction: isArabic ? 'rtl' : 'ltr',
                  textAlign: isArabic ? 'right' : 'left',
                  unicodeBidi: isArabic ? 'plaintext' : 'normal',
                  display: 'block', // revert to block for message
                },
                '.MuiAlert-icon': {
                  order: isArabic ? 2 : 0, // force icon to the right in RTL
                  marginRight: isArabic ? 0 : (theme) => theme.spacing(1.5),
                  marginLeft: isArabic ? (theme) => theme.spacing(1.5) : 0,
                  display: 'flex',
                  alignItems: 'center',
                },
              }}
            >
              {isArabic
                ? 'تنبيه: هذا التقييم مخصص للأغراض التعليمية والمعلوماتية فقط ولا يعتبر بديلاً عن الاستشارة الطبية المهنية. يرجى استشارة مقدم الرعاية الصحية الخاص بك لأي مخاوف صحية.'
                : 'Disclaimer: This assessment is for educational and informational purposes only and is not a substitute for professional medical advice. Please consult your healthcare provider for any health concerns.'}
            </Alert>
          </Grow>

          <Grow in={true} timeout={1100}>
            <Alert
              dir={isArabic ? 'rtl' : 'ltr'}
              severity="info"
              variant="outlined"
              sx={{
                mb: 4,
                fontFamily: isArabic ? '"Cairo", sans-serif' : 'inherit',
                flexDirection: isArabic ? 'row-reverse' : 'row',
                alignItems: 'center',

                '.MuiAlert-message': {
                  flexGrow: 1,
                  direction: isArabic ? 'rtl' : 'ltr',
                  textAlign: isArabic ? 'right' : 'left',
                  unicodeBidi: isArabic ? 'plaintext' : 'normal',
                  display: 'block', // revert to block for message
                  
                },

                '.MuiAlert-icon': {
                  order: isArabic ? 2 : 0, // force icon to the right in RTL
                  marginRight: isArabic ? 0 : (theme) => theme.spacing(1.5),
                  marginLeft: isArabic ? (theme) => theme.spacing(1.5) : 0,
                  display: 'flex',
                  alignItems: 'center',
                },
              }}
            >
              {isArabic
                ? 'ملاحظة: يرجى الإجابة على جميع الأسئلة بصدق.'
                : 'Note: Please answer all questions honestly.'}
            </Alert>
          </Grow>
          
          <Grow in={true} timeout={1300}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
              <TextField
                label={isArabic ? 'الاسم (اختياري)' : 'Name (Optional)'}
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                sx={{
                  maxWidth: 400,
                  width: '100%',
                  direction: isArabic ? 'rtl' : 'ltr',
                  fontFamily: isArabic ? '"Cairo", sans-serif' : 'inherit',

                  '& .MuiInputLabel-root': {
                    fontFamily: 'inherit',
                    transformOrigin: isArabic ? 'top right' : 'top left',
                    ...(isArabic && {
                      '&[data-shrink="true"]': {
                        transform: (theme) => `translate(-${theme.spacing(1.75)}, -9px) scale(0.75)`,
                      }
                    }),
                    ...(!isArabic && {
                        '&[data-shrink="true"]': {
                            transform: (theme) => `translate(${theme.spacing(1.75)}, -9px) scale(0.75)`,
                        }
                    })
                  },
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'inherit',
                    textAlign: isArabic ? 'right' : 'left',
                    ...(isArabic && {
                      '& .MuiOutlinedInput-notchedOutline legend': {
                        textAlign: 'right',
                      },
                    }),
                  },
                }}
              />
            </Box>
          </Grow>

          <Grow in={true} timeout={1500}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary" // Ensure it uses primary color
                size="large"
                onClick={handleStart}
                sx={{ 
                  minWidth: 220, // Slightly wider button
                  py: 1.5, // More padding vertically
                  fontSize: '1.1rem', // Larger font size
                  borderRadius: '8px', // Softer button corners
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', // Smooth transition
                  '&:hover': {
                    transform: 'scale(1.05)', // Slight scale on hover
                    boxShadow: (theme) => theme.shadows[6], // More pronounced shadow on hover
                  }
                }}
              >
                {isArabic ? 'ابدأ التقييم' : 'Start Assessment'}
              </Button>
            </Box>
          </Grow>
        </Paper>
      </Box>
    );
  }
); // Ensure the component is correctly wrapped

export default Welcome;
