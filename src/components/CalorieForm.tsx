import React, { useState } from 'react';
import { UserData, Goal, ActivityLevel } from '../types';
import { ACTIVITY_LEVELS, validateUserData } from '../utils/calculations';
import UnitToggle from './UnitToggle';

interface CalorieFormProps {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

const GOAL_OPTIONS = [
  { value: 'lose_weight' as Goal, label: 'Lose Weight', description: 'Create a calorie deficit' },
  { value: 'maintain_weight' as Goal, label: 'Maintain Weight', description: 'Keep current weight' },
  { value: 'gain_weight' as Goal, label: 'Gain Weight', description: 'Create a calorie surplus' }
];

const CalorieForm: React.FC<CalorieFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    age: 25,
    gender: 'male',
    height: 170,
    weight: 70,
    heightUnit: 'cm',
    weightUnit: 'kg',
    activityLevel: 'moderately_active',
    goal: 'maintain_weight'
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (field: keyof UserData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateUserData(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      age: 25,
      gender: 'male',
      height: 170,
      weight: 70,
      heightUnit: 'cm',
      weightUnit: 'kg',
      activityLevel: 'moderately_active',
      goal: 'maintain_weight'
    });
    setErrors([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="form-section">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="input-field"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Age *
            </label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
              className="input-field"
              min="13"
              max="120"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender *
          </label>
          <div className="flex space-x-4">
            {['male', 'female', 'other'].map((gender) => (
              <label key={gender} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female' | 'other')}
                  className="mr-2"
                  required
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {gender}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Physical Measurements */}
      <div className="form-section">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Physical Measurements
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height *
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                className="input-field flex-1"
                min="0"
                step="0.1"
                required
              />
              <UnitToggle
                value={formData.heightUnit}
                onChange={(unit) => handleInputChange('heightUnit', unit)}
                options={[
                  { value: 'cm', label: 'cm' },
                  { value: 'inches', label: 'inches' }
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight *
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                className="input-field flex-1"
                min="0"
                step="0.1"
                required
              />
              <UnitToggle
                value={formData.weightUnit}
                onChange={(unit) => handleInputChange('weightUnit', unit)}
                options={[
                  { value: 'kg', label: 'kg' },
                  { value: 'lbs', label: 'lbs' }
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Level */}
      <div className="form-section">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Activity Level *
        </h3>
        
        <div className="space-y-3">
          {ACTIVITY_LEVELS.map((activity) => (
            <label key={activity.value} className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <input
                type="radio"
                name="activityLevel"
                value={activity.value}
                checked={formData.activityLevel === activity.value}
                onChange={(e) => handleInputChange('activityLevel', e.target.value as ActivityLevel)}
                className="mt-1 mr-3"
                required
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {activity.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div className="form-section">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Goal *
        </h3>
        
        <div className="space-y-3">
          {GOAL_OPTIONS.map((goal) => (
            <label key={goal.value} className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <input
                type="radio"
                name="goal"
                value={goal.value}
                checked={formData.goal === goal.value}
                onChange={(e) => handleInputChange('goal', e.target.value as Goal)}
                className="mt-1 mr-3"
                required
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {goal.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {goal.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="text-sm text-red-800 dark:text-red-200">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex-1 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Calculating...
            </>
          ) : (
            'Calculate Calories'
          )}
        </button>
        
        <button
          type="button"
          onClick={handleReset}
          className="btn-secondary flex-1"
        >
          Reset Form
        </button>
      </div>
    </form>
  );
};

export default CalorieForm; 