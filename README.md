# Calorie Calculator

A comprehensive, production-ready web application for calculating daily calorie needs using the scientifically validated Mifflin-St Jeor formula. Built with React, TypeScript, and Tailwind CSS.

![Calorie Calculator Screenshot](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Calorie+Calculator+Screenshot)

## 🌟 Features

### Core Functionality
- **Accurate BMR Calculation**: Uses the Mifflin-St Jeor formula for precise Basal Metabolic Rate calculations
- **TDEE Estimation**: Calculates Total Daily Energy Expenditure based on activity level
- **Personalized Recommendations**: Provides calorie targets for weight loss, maintenance, and weight gain
- **Unit Flexibility**: Support for both metric (cm/kg) and imperial (inches/lbs) units
- **Comprehensive Input Validation**: Ensures realistic and valid user inputs

### User Experience
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Real-time Validation**: Instant feedback on form inputs
- **Loading States**: Smooth user experience with loading animations
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### Advanced Features
- **PDF Export**: Save calculation results as a professional PDF report
- **Social Sharing**: Share results on social media platforms
- **Copy to Clipboard**: Easy copying of results for personal use
- **Detailed Explanations**: Comprehensive information about calculations and formulas
- **Persistent Settings**: Remembers user preferences (dark mode, etc.)

## 🚀 Live Demo

[View Live Demo](https://your-calorie-calculator.onrender.com)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and optimized builds
- **Testing**: Vitest with React Testing Library
- **Icons**: Lucide React for beautiful, consistent icons
- **Deployment**: Render for automatic deployments

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

## 🔧 Installation & Setup

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/calorie-calculator.git
   cd calorie-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI

# Code Quality
npm run lint         # Check for linting errors
npm run lint:fix     # Fix linting errors automatically
```

## 🧪 Testing

The application includes comprehensive tests for all calculation logic:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test -- --coverage

# Run tests in watch mode
npm run test -- --watch
```

### Test Coverage
- Unit conversion functions (inches/cm, lbs/kg)
- BMR calculations for all gender options
- TDEE calculations with activity level multipliers
- Input validation for edge cases
- Recommendation calculations for different goals

## 🚀 Deployment

### Render Deployment (Recommended)

1. **Fork/Clone the repository** to your GitHub account

2. **Connect to Render**
   - Sign up at [render.com](https://render.com)
   - Click "New +" and select "Static Site"
   - Connect your GitHub repository

3. **Configure Build Settings**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: Static Site

4. **Deploy**
   - Render will automatically build and deploy your site
   - Your app will be available at `https://your-app-name.onrender.com`

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Any static hosting service

## 📊 Calculation Methodology

### BMR Formula (Mifflin-St Jeor)
- **Male**: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
- **Female**: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
- **Other**: Average of male and female calculations

### Activity Level Multipliers
- **Sedentary**: × 1.2 (Little or no exercise, desk job)
- **Lightly Active**: × 1.375 (Light exercise/sports 1-3 days/week)
- **Moderately Active**: × 1.55 (Moderate exercise/sports 3-5 days/week)
- **Very Active**: × 1.725 (Hard exercise/sports 6-7 days a week)
- **Extra Active**: × 1.9 (Very hard exercise, physical job or training twice a day)

### Weight Goal Adjustments
- **Weight Loss**: 15-35% calorie deficit
- **Weight Maintenance**: No adjustment
- **Weight Gain**: 10-30% calorie surplus

## 🎨 Customization

### Styling
The app uses Tailwind CSS with a custom design system. Key customization points:

- **Colors**: Defined in `tailwind.config.js` under the `theme.extend.colors` section
- **Typography**: Uses Inter font family with custom font weights
- **Components**: Reusable component classes in `src/index.css`

### Configuration
- **Activity Levels**: Modify `ACTIVITY_LEVELS` in `src/utils/calculations.ts`
- **Validation Rules**: Update `validateUserData` function for custom validation
- **PDF Template**: Customize PDF generation in `src/utils/pdfGenerator.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Ensure responsive design
- Maintain accessibility standards
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mifflin-St Jeor Formula**: Scientific basis for BMR calculations
- **Tailwind CSS**: Utility-first CSS framework
- **React Team**: Amazing frontend library
- **Vite**: Fast build tool and dev server
- **Render**: Reliable hosting platform

## 📞 Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/yourusername/calorie-calculator/issues)
- **Email**: your-email@example.com
- **Documentation**: Check the About section in the app

## 🔮 Future Enhancements

- [ ] Body fat percentage integration
- [ ] Macro-nutrient breakdown
- [ ] Meal planning suggestions
- [ ] Progress tracking
- [ ] Multiple calculation methods (Katch-McArdle, etc.)
- [ ] Mobile app version
- [ ] Integration with fitness trackers

---

**Built with ❤️ by [Your Name]**

*This calculator is for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider before making significant changes to your diet or exercise routine.*