import React from 'react';
import { UnitToggleProps } from '../types';

const UnitToggle: React.FC<UnitToggleProps> = ({ value, onChange, options }) => {
  return (
    <div className="flex items-center space-x-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value as 'cm' | 'inches' | 'kg' | 'lbs')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
            value === option.value
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default UnitToggle; 