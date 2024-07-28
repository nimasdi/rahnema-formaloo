import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FieldsProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'radio' | 'multiselect';
  name?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  options?: Option[]; // for select, multiselect, checkbox, and radio
  value?: string | number | string[];
  label?: string;
}

const Fields = ({
  type,
  name,
  onClick,
  onChange,
  placeholder,
  className,
  options,
  value,
  label,
}: FieldsProps) => {
  switch (type) {
    case 'text':
    case 'number':
    case 'email':
    case 'password':
      return (
        <label className="block">
          {label && <span className="block mb-1">{label}</span>}
          <input
            className={className}
            name={name}
            onClick={onClick}
            onChange={onChange}
            type={type}
            required
            placeholder={placeholder}
            value={value as string | number}
          />
        </label>
      );
    case 'select':
      return (
        <label className="block">
          {label && <span className="block mb-1">{label}</span>}
          <select
            className={className}
            name={name}
            onClick={onClick}
            onChange={onChange}
            value={value as string | number}
            required
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      );
    case 'checkbox':
      return (
        <label className="block">
          {label && <span className="block mb-1">{label}</span>}
          {options?.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                className={className}
                name={name}
                onClick={onClick}
                onChange={onChange}
                type="checkbox"
                value={option.value}
                checked={(value as string[]).includes(option.value)}
              />
              <span className="ml-2">{option.label}</span>
            </div>
          ))}
        </label>
      );
    case 'radio':
      return (
        <label className="block">
          {label && <span className="block mb-1">{label}</span>}
          {options?.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                className={className}
                name={name}
                onClick={onClick}
                onChange={onChange}
                type="radio"
                value={option.value}
                checked={value === option.value}
              />
              <span className="ml-2">{option.label}</span>
            </div>
          ))}
        </label>
      );
    case 'multiselect':
      return (
        <label className="block">
          {label && <span className="block mb-1">{label}</span>}
          <select
            className={className}
            name={name}
            onClick={onClick}
            onChange={onChange}
            value={value as string[]}
            multiple
            required
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      );
    default:
      return null;
  }
};

export default Fields;
