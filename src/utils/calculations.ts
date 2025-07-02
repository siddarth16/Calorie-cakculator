import { UserData, CalculationResult, ActivityLevelOption } from '../types';

// Activity level multipliers for TDEE calculation
export const ACTIVITY_LEVELS: ActivityLevelOption[] = [
  {
    value: 'sedentary',
    label: 'Sedentary',
    description: 'Little or no exercise, desk job',
    multiplier: 1.2
  },
  {
    value: 'lightly_active',
    label: 'Lightly Active',
    description: 'Light exercise/sports 1-3 days/week',
    multiplier: 1.375
  },
  {
    value: 'moderately_active',
    label: 'Moderately Active',
    description: 'Moderate exercise/sports 3-5 days/week',
    multiplier: 1.55
  },
  {
    value: 'very_active',
    label: 'Very Active',
    description: 'Hard exercise/sports 6-7 days a week',
    multiplier: 1.725
  },
  {
    value: 'extra_active',
    label: 'Extra Active',
    description: 'Very hard exercise, physical job or training twice a day',
    multiplier: 1.9
  }
];

// Weight loss/gain calorie adjustments
const WEIGHT_LOSS_MILD = 0.85; // 15% deficit
const WEIGHT_LOSS_MODERATE = 0.75; // 25% deficit
const WEIGHT_LOSS_AGGRESSIVE = 0.65; // 35% deficit
const WEIGHT_GAIN_MILD = 1.1; // 10% surplus
const WEIGHT_GAIN_MODERATE = 1.2; // 20% surplus
const WEIGHT_GAIN_AGGRESSIVE = 1.3; // 30% surplus

/**
 * Convert height from inches to cm
 */
export const inchesToCm = (inches: number): number => {
  return inches * 2.54;
};

/**
 * Convert height from cm to inches
 */
export const cmToInches = (cm: number): number => {
  return cm / 2.54;
};

/**
 * Convert weight from lbs to kg
 */
export const lbsToKg = (lbs: number): number => {
  return lbs * 0.453592;
};

/**
 * Convert weight from kg to lbs
 */
export const kgToLbs = (kg: number): number => {
  return kg * 2.20462;
};

/**
 * Calculate BMR using Mifflin-St Jeor formula
 * BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5 (for males)
 * BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161 (for females)
 */
export const calculateBMR = (userData: UserData): number => {
  // Convert to metric units for calculation
  const weightKg = userData.weightUnit === 'lbs' ? lbsToKg(userData.weight) : userData.weight;
  const heightCm = userData.heightUnit === 'inches' ? inchesToCm(userData.height) : userData.height;
  
  let bmr: number;
  
  if (userData.gender === 'male') {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * userData.age) + 5;
  } else if (userData.gender === 'female') {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * userData.age) - 161;
  } else {
    // For 'other' gender, use average of male and female calculations
    const maleBMR = (10 * weightKg) + (6.25 * heightCm) - (5 * userData.age) + 5;
    const femaleBMR = (10 * weightKg) + (6.25 * heightCm) - (5 * userData.age) - 161;
    bmr = (maleBMR + femaleBMR) / 2;
  }
  
  return Math.round(bmr);
};

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 */
export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const activity = ACTIVITY_LEVELS.find(level => level.value === activityLevel);
  if (!activity) {
    throw new Error('Invalid activity level');
  }
  
  return Math.round(bmr * activity.multiplier);
};

/**
 * Calculate calorie recommendations for different goals
 */
export const calculateRecommendations = (tdee: number) => {
  return {
    maintain: Math.round(tdee),
    mild_loss: Math.round(tdee * WEIGHT_LOSS_MILD),
    moderate_loss: Math.round(tdee * WEIGHT_LOSS_MODERATE),
    aggressive_loss: Math.round(tdee * WEIGHT_LOSS_AGGRESSIVE),
    mild_gain: Math.round(tdee * WEIGHT_GAIN_MILD),
    moderate_gain: Math.round(tdee * WEIGHT_GAIN_MODERATE),
    aggressive_gain: Math.round(tdee * WEIGHT_GAIN_AGGRESSIVE)
  };
};

/**
 * Generate personalized summary message
 */
export const generateSummary = (userData: UserData, result: CalculationResult): string => {
  const name = userData.name || 'there';
  const activityLevel = ACTIVITY_LEVELS.find(level => level.value === userData.activityLevel);
  
  let summary = `Hi ${name}! Based on your profile (${userData.age} years old, ${userData.height}${userData.heightUnit}, ${userData.weight}${userData.weightUnit}), `;
  summary += `your Basal Metabolic Rate (BMR) is ${result.bmr.toLocaleString()} calories per day. `;
  summary += `With your ${activityLevel?.label.toLowerCase()} lifestyle, your Total Daily Energy Expenditure (TDEE) is ${result.tdee.toLocaleString()} calories. `;
  
  switch (userData.goal) {
    case 'lose_weight':
      summary += `To lose weight safely, aim for ${result.recommendations.mild_loss.toLocaleString()}-${result.recommendations.moderate_loss.toLocaleString()} calories per day.`;
      break;
    case 'gain_weight':
      summary += `To gain weight, aim for ${result.recommendations.mild_gain.toLocaleString()}-${result.recommendations.moderate_gain.toLocaleString()} calories per day.`;
      break;
    default:
      summary += `To maintain your current weight, aim for ${result.recommendations.maintain.toLocaleString()} calories per day.`;
  }
  
  return summary;
};

/**
 * Main calculation function
 */
export const calculateCalories = (userData: UserData): CalculationResult => {
  const bmr = calculateBMR(userData);
  const tdee = calculateTDEE(bmr, userData.activityLevel);
  const recommendations = calculateRecommendations(tdee);
  
  const result: CalculationResult = {
    bmr,
    tdee,
    recommendations,
    summary: ''
  };
  
  result.summary = generateSummary(userData, result);
  
  return result;
};

/**
 * Validate user input data
 */
export const validateUserData = (userData: UserData): string[] => {
  const errors: string[] = [];
  
  if (userData.age < 13 || userData.age > 120) {
    errors.push('Age must be between 13 and 120 years');
  }
  
  if (userData.height <= 0) {
    errors.push('Height must be greater than 0');
  }
  
  if (userData.weight <= 0) {
    errors.push('Weight must be greater than 0');
  }
  
  if (userData.heightUnit === 'inches' && userData.height > 120) {
    errors.push('Height in inches seems too high. Please check your input.');
  }
  
  if (userData.heightUnit === 'cm' && userData.height > 300) {
    errors.push('Height in cm seems too high. Please check your input.');
  }
  
  if (userData.weightUnit === 'lbs' && userData.weight > 1000) {
    errors.push('Weight in lbs seems too high. Please check your input.');
  }
  
  if (userData.weightUnit === 'kg' && userData.weight > 450) {
    errors.push('Weight in kg seems too high. Please check your input.');
  }
  
  return errors;
}; 