import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

export interface ConsentModalProps { // Exporting for App.tsx import
  isOpen: boolean; 
  isArabic: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onAccept,
  onDecline,
  isArabic,
}) => {
  return (
    <Dialog 
      open={isOpen}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          p: 2.5,
          direction: isArabic ? 'rtl' : 'ltr',
          maxWidth: '400px !important',
          mx: 'auto',
          borderRadius: 2,
          '& .MuiDialogContent-root': {
            textAlign: isArabic ? 'right' : 'left'
          }
        }
      }}
    >
      <DialogTitle sx={{ 
        p: 0,
        mb: 2,
        textAlign: 'center',
        fontSize: '1.25rem',
        fontWeight: 500,
      }}>
        {isArabic ? 'موافقة الخصوصية' : 'Privacy Consent'}
      </DialogTitle>
      
      <DialogContent sx={{ p: 0, mb: 4 }}>
        <Typography sx={{ 
          fontSize: '1.rem',
          lineHeight: 1.5,
        }}>
          {isArabic 
            ? 'هذا التقييم الصحي مجهول تماماً. بالمتابعة، أنت توافق على مشاركة معلوماتك الصحية لأغراض التقييم فقط'
            : 'This health assessment is completely anonymous. By proceeding, you agree to share your health information for assessment purposes only.'
          }
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ 
        p: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {isArabic ? (
          <>
            <Button
              onClick={onAccept}
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                minWidth: '80px',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              أوافق
            </Button>
            <Button
              onClick={onDecline}
              variant="outlined"
              sx={{
                color: 'text.primary',
                borderColor: 'divider',
                minWidth: '80px'
              }}
            >
              رفض
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={onDecline}
              variant="outlined"
              sx={{
                color: 'text.primary',
                borderColor: 'divider',
                minWidth: '80px'
              }}
            >
              Decline
            </Button>
            <Button
              onClick={onAccept}
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                minWidth: '80px',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              I Agree
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConsentModal;
