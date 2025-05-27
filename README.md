# PE101 Wellness Assessment | A health assessment tool developed for PE101 course - SAHSS School at German Jordanian University (GJU) under the supervision of Dr. Fawwaz Al-Saqqar.

A bilingual (English/Arabic) health assessment application built with React, Material-UI, and Vite. This application helps users evaluate their overall wellness across multiple health dimensions.


##  Features

- Bilingual support (English/Arabic)
- Dark/Light theme
- Responsive design for all devices
- Interactive questionnaire
- Real-time scoring system
- API integration with MongoDB backend

##  Technology Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI)
- **State Management**: React Context
- **Styling**: MUI Theme System + CSS
- **HTTP Client**: Axios
- **Backend**: Express.js + MongoDB

##  Scoring System

The assessment uses a 100-point scoring system that evaluates various health and lifestyle factors. Points are deducted based on specific conditions:

### BMI Impact (-20 or -10 points)
- **Severe**: -20 points if BMI < 18.5 (underweight) or BMI ≥ 30 (obese)
- **Moderate**: -10 points if BMI ≥ 25 (overweight)

### Sleep Habits (-15 or -7 points)
- **Severe**: -15 points if sleep < 5 hours or > 10 hours
- **Moderate**: -7 points if sleep < 6 hours or > 9 hours

### Physical Activity (-15, -10, or -5 points)
- **Severe**: -15 points for 0 days of activity
- **Moderate**: -10 points for 1-2 days of activity
- **Light**: -5 points for 3-4 days of activity

### Nutrition (-15, -10, or -5 points)
- **Poor**: -15 points for 0 servings of fruits/vegetables
- **Fair**: -10 points for 1-2 servings
- **Moderate**: -5 points for 3-4 servings

### Smoking Habits (-10 or -5 points)
- **Regular**: -10 points for regular smoking
- **Occasional**: -5 points for occasional smoking

### Other Lifestyle Factors (-5 or -2 points each)
- **Stress**: -5 points for high or very high stress levels
- **Water**: -5 points for less than 1 liter daily
- **Fast Food**:
  - -5 points for 3+ times per week
  - -2 points for 1-2 times per week
- **Coffee**: -5 points for 4 or more cups daily
- **Energy Drinks**:
  - -5 points for daily consumption
  - -2 points for weekly consumption

### Score Calculation
1. Starting score: 100 points
2. Deductions are applied based on answers
3. Final score is rounded and cannot go below 0

### Score Interpretation
- **90-100**: Excellent health habits
- **80-89**: Good health habits with minor areas for improvement
- **70-79**: Average health habits with several areas needing attention
- **60-69**: Below average health habits requiring lifestyle changes
- **Below 60**: Poor health habits requiring significant lifestyle improvements
  
##  Backend Integration

The application communicates with a Node.js/Express backend that:
- Stores assessment results in MongoDB
- Handles user authentication (planned feature)
- Manages data persistence
- Provides API endpoints for:
  - Submitting assessment results
  - Retrieving historical data (planned feature)
  - Managing user profiles (planned feature)

##  Future Improvements

1. **User Authentication**
   - Implement secure login system
   - Add user profiles
   - Enable result history tracking

2. **Enhanced Analytics**
   - Visual representation of results
   - Progress tracking over time
   - Comparative analysis
     
3. **AI-Enhanced Assessment**
   - Implement machine learning for more accurate scoring
   - Use AI to provide personalized health recommendations
   - Analyze patterns in user responses for predictive health insights
   - Integrate natural language processing for detailed feedback

4. **Additional Features**
   - Personalized recommendations
   - PDF export of results
   - Email notification

5. **Technical Enhancements**
   - Implement PWA capabilities
   - Add offline mode
   - Improve accessibility
   - Add unit tests
   - Implement E2E testing

##  Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

##  Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=your_backend_api_url
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
