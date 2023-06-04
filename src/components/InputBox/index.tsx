import React, { useEffect, useRef, useState } from 'react';
import './InputBox.scss';

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

  const onFocus = () => {
    setPlaceholder('');
    setBlurred(false);
  };

  const onBlur = (e: React.FocusEvent) => {
    currentIndexRef.current = 0;
    setBlurred(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      setSearchString(inputValue);
    }
  };

  return (
    <input
      className='input-box'
      placeholder={placeholder}
      style={customeStyle}
      onBlur={e => {
        onBlur(e);
      }}
      onFocus={onFocus}
      onKeyDown={e => onKeyDown(e)}
      onChange={e => setInputValue(e.target.value)}
    />
  );
};

export default InputBox;
