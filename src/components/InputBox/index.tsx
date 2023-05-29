import React from 'react';
import './InputBox.scss';

interface InputBoxProps {
  placeholderText: string;
  typeoutEffect?: boolean;
  customeStyle?: React.CSSProperties;
}

const InputBox: React.FC<InputBoxProps> = ({ placeholderText, typeoutEffect = false, customeStyle }) => {
  const [placeholder, setPlaceholder] = React.useState('');
  const currentIndexRef = React.useRef(0);
  const [blurred, setBlurred] = React.useState(false);

  React.useEffect(() => {
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

  const onBlur = () => {
    currentIndexRef.current = 0;
    setBlurred(true);
  };

  return (
    <input className='input-box' placeholder={placeholder} style={customeStyle} onBlur={onBlur} onFocus={onFocus} />
  );
};

export default InputBox;
