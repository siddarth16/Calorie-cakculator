import { describe, it, expect } from 'vitest';
import { 
  calculateBMR, 
  calculateTDEE, 
  calculateRecommendations, 
  validateUserData,
  inchesToCm,
  cmToInches,
  lbsToKg,
  kgToLbs
} from '../utils/calculations';
import { UserData } from '../types';

describe('Unit Conversions', () => {
  it('should convert inches to cm correctly', () => {
    expect(inchesToCm(70)).toBeCloseTo(177.8, 1);
    expect(inchesToCm(60)).toBeCloseTo(152.4, 1);
  });

  it('should convert cm to inches correctly', () => {
    expect(cmToInches(170)).toBeCloseTo(66.9, 1);
    expect(cmToInches(180)).toBeCloseTo(70.9, 1);
  });

  it('should convert lbs to kg correctly', () => {
    expect(lbsToKg(150)).toBeCloseTo(68.0, 1);
    expect(lbsToKg(200)).toBeCloseTo(90.7, 1);
  });

  it('should convert kg to lbs correctly', () => {
    expect(kgToLbs(70)).toBeCloseTo(154.3, 1);
    expect(kgToLbs(80)).toBeCloseTo(176.4, 1);
  });
});

describe('BMR Calculations', () => {
  const testUserData: UserData = {
    name: 'Test User',
    age: 30,
    gender: 'male',
    height: 175,
    weight: 70,
    heightUnit: 'cm',
    weightUnit: 'kg',
    activityLevel: 'moderately_active',
    goal: 'maintain_weight'
  };

  it('should calculate BMR for male correctly', () => {
    const bmr = calculateBMR(testUserData);
    // Expected: (10 × 70) + (6.25 × 175) - (5 × 30) + 5 = 700 + 1093.75 - 150 + 5 = 1648.75
    expect(bmr).toBe(1649);
  });

  it('should calculate BMR for female correctly', () => {
    const femaleData = { ...testUserData, gender: 'female' as const };
    const bmr = calculateBMR(femaleData);
    // Expected: (10 × 70) + (6.25 × 175) - (5 × 30) - 161 = 700 + 1093.75 - 150 - 161 = 1482.75
    expect(bmr).toBe(1483);
  });

  it('should calculate BMR for other gender correctly', () => {
    const otherData = { ...testUserData, gender: 'other' as const };
    const bmr = calculateBMR(otherData);
    // Expected: average of male and female = (1649 + 1483) / 2 = 1566
    expect(bmr).toBe(1566);
  });

  it('should handle imperial units correctly', () => {
    const imperialData = {
      ...testUserData,
      height: 69, // inches
      weight: 154, // lbs
      heightUnit: 'inches' as const,
      weightUnit: 'lbs' as const
    };
    const bmr = calculateBMR(imperialData);
    // Should be approximately the same as metric calculation
    expect(bmr).toBeGreaterThan(1500);
    expect(bmr).toBeLessThan(1700);
  });
});

describe('TDEE Calculations', () => {
  it('should calculate TDEE with different activity levels', () => {
    const bmr = 1500;
    
    expect(calculateTDEE(bmr, 'sedentary')).toBe(1800); // 1500 * 1.2
    expect(calculateTDEE(bmr, 'lightly_active')).toBe(2063); // 1500 * 1.375
    expect(calculateTDEE(bmr, 'moderately_active')).toBe(2325); // 1500 * 1.55
    expect(calculateTDEE(bmr, 'very_active')).toBe(2588); // 1500 * 1.725
    expect(calculateTDEE(bmr, 'extra_active')).toBe(2850); // 1500 * 1.9
  });

  it('should throw error for invalid activity level', () => {
    expect(() => calculateTDEE(1500, 'invalid' as any)).toThrow('Invalid activity level');
  });
});

describe('Recommendation Calculations', () => {
  it('should calculate weight loss recommendations correctly', () => {
    const tdee = 2000;
    const recommendations = calculateRecommendations(tdee);
    
    expect(recommendations.maintain).toBe(2000);
    expect(recommendations.mild_loss).toBe(1700); // 2000 * 0.85
    expect(recommendations.moderate_loss).toBe(1500); // 2000 * 0.75
    expect(recommendations.aggressive_loss).toBe(1300); // 2000 * 0.65
  });

  it('should calculate weight gain recommendations correctly', () => {
    const tdee = 2000;
    const recommendations = calculateRecommendations(tdee);
    
    expect(recommendations.mild_gain).toBe(2200); // 2000 * 1.1
    expect(recommendations.moderate_gain).toBe(2400); // 2000 * 1.2
    expect(recommendations.aggressive_gain).toBe(2600); // 2000 * 1.3
  });
});

describe('Input Validation', () => {
  const validUserData: UserData = {
    name: 'Test User',
    age: 25,
    gender: 'male',
    height: 170,
    weight: 70,
    heightUnit: 'cm',
    weightUnit: 'kg',
    activityLevel: 'moderately_active',
    goal: 'maintain_weight'
  };

  it('should pass validation for valid data', () => {
    const errors = validateUserData(validUserData);
    expect(errors).toHaveLength(0);
  });

  it('should fail validation for age too young', () => {
    const invalidData = { ...validUserData, age: 10 };
    const errors = validateUserData(invalidData);
    expect(errors).toContain('Age must be between 13 and 120 years');
  });

  it('should fail validation for age too old', () => {
    const invalidData = { ...validUserData, age: 150 };
    const errors = validateUserData(invalidData);
    expect(errors).toContain('Age must be between 13 and 120 years');
  });

  it('should fail validation for negative height', () => {
    const invalidData = { ...validUserData, height: -10 };
    const errors = validateUserData(invalidData);
    expect(errors).toContain('Height must be greater than 0');
  });

  it('should fail validation for negative weight', () => {
    const invalidData = { ...validUserData, weight: -10 };
    const errors = validateUserData(invalidData);
    expect(errors).toContain('Weight must be greater than 0');
  });

  it('should fail validation for unrealistic height in inches', () => {
    const invalidData = { ...validUserData, height: 150, heightUnit: 'inches' as const };
    const errors = validateUserData(invalidData);
    expect(errors).toContain('Height in inches seems too high. Please check your input.');
  });

  it('should fail validation for unrealistic height in cm', () => {
    const invalidData = { ...validUserData, height: 400, heightUnit: 'cm' as const };
    const errors = validateUserData(invalidData);
    expect(errors).toContain('Height in cm seems too high. Please check your input.');
  });

  it('should fail validation for unrealistic weight in lbs', () => {
    const invalidData = { ...validUserData, weight: 1500, weightUnit: 'lbs' as const };
    const errors = validateUserData(invalidData);
    expect(errors).toContain('Weight in lbs seems too high. Please check your input.');
  });

  it('should fail validation for unrealistic weight in kg', () => {
    const invalidData = { ...validUserData, weight: 500, weightUnit: 'kg' as const };
    const errors = validateUserData(invalidData);
    expect(errors).toContain('Weight in kg seems too high. Please check your input.');
  });
}); 