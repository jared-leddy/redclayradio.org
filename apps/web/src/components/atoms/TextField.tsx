// NPM Modules
import type { ChangeEvent } from 'react';

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  hint?: string;
};

/**
 * Labeled single-line text input styled for the dark modal forms. Controlled —
 * the parent owns `value` and receives the raw string through `onChange`.
 */
export default function TextField({ id, label, value, onChange, required = false, placeholder, hint }: TextFieldProps) {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='font-ui text-xs uppercase tracking-ui text-red-500'>
        {label}
        {required && <span className='text-red-500'> *</span>}
      </label>
      <input
        id={id}
        type='text'
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className='border border-zinc-700 bg-black px-3 py-2 font-ui text-stone-100 outline-none transition-colors focus:border-red-500'
      />
      {hint && <span className='font-ui text-xs text-stone-500'>{hint}</span>}
    </div>
  );
}
