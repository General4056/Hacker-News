import { useState } from 'react';
import { useValidation } from './useValidation';

export const useInput = (initialValue: string, validations: any) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const valid = useValidation(value, validations);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  const clear = () => {
    setValue('');
    setIsDirty(false);
    valid.setInputValid(true);
  };

  return {
    value,
    setValue,
    clear,
    onChange,
    onBlur,
    isDirty,
    ...valid
  };
};
