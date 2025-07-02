export interface UserData {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  heightUnit: 'cm' | 'inches';
  weightUnit: 'kg' | 'lbs';
  activityLevel: ActivityLevel;
  goal: Goal;
  targetWeight?: number;
  targetTimeline?: number;
}

export type ActivityLevel = 
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'extra_active';

export type Goal = 'lose_weight' | 'maintain_weight' | 'gain_weight';

export interface CalculationResult {
  bmr: number;
  tdee: number;
  recommendations: {
    maintain: number;
    mild_loss: number;
    moderate_loss: number;
    aggressive_loss: number;
    mild_gain: number;
    moderate_gain: number;
    aggressive_gain: number;
  };
  summary: string;
}

export interface ActivityLevelOption {
  value: ActivityLevel;
  label: string;
  description: string;
  multiplier: number;
}

export interface GoalOption {
  value: Goal;
  label: string;
  description: string;
}

export interface UnitToggleProps {
  value: 'cm' | 'inches' | 'kg' | 'lbs';
  onChange: (unit: 'cm' | 'inches' | 'kg' | 'lbs') => void;
  options: { value: string; label: string }[];
} 