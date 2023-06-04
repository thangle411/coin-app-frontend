import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './InputBox.scss';
import { useDebounce } from '../../hooks';

interface InputBoxProps {
  placeholderText: string;
  setSearchString: React.Dispatch<string>;
  typeoutEffect?: boolean;
  customeStyle?: React.CSSProperties;
}

const InputBox: React.FC<InputBoxProps> = ({
  placeholderText,
  setSearchString,
  typeoutEffect = false,
  customeStyle,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const currentIndexRef = useRef(0);
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    if (!typeoutEffect) setPlaceholder(placeholderText);

    const typeOutPlaceholder = () => {
      if (currentIndexRef.current < placeholderText.length) {
        const currentText = placeholderText.slice(0, currentIndexRef.current + 1);
        setPlaceholder(currentText);
        currentIndexRef.current++;
        setTimeout(typeOutPlaceholder, 30); // Adjust the typing speed by changing the delay
      }
    };

    typeOutPlaceholder();
  }, [blurred]);

  const debounce = useDebounce(() => {
    setSearchString(inputValue);
  }, 500);

  const onFocus = () => {
    setPlaceholder('');
    setBlurred(false);
  };

  const onBlur = () => {
    currentIndexRef.current = 0;
    setBlurred(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      setSearchString(inputValue);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debounce();
  };

  return (
    <input
      className='input-box'
      placeholder={placeholder}
      style={customeStyle}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
};

export default InputBox;
