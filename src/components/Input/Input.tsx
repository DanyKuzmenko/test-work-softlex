import React, { ChangeEvent } from 'react';
import './Input.scss';

interface IProps {
  placeholder?: string;
  isResultCheckbox?: boolean;
  handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
  disabled?: boolean;
}

const Input: React.FC<IProps> = ({
                                   placeholder = '',
                                   isResultCheckbox,
                                   handleInputChange,
                                   value,
                                   disabled = false,
                                 }) => (
  <input
    className={isResultCheckbox ? 'input input_active' : 'input'}
    type='number'
    placeholder={placeholder}
    onChange={handleInputChange}
    value={value}
    disabled={disabled}
  />
);

export default Input;
