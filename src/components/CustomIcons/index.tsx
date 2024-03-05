import React, {ReactNode} from 'react';

interface CustomIconProps {
  size?: number;
  color?: string;
  children: ReactNode; // Accepts any ReactNode as a child
}

const CustomIcon: React.FC<CustomIconProps> = ({
  size = 24,
  color = 'white',
  children,
}) => {
  return (
    <>{React.cloneElement(children as React.ReactElement, {size, color})}</>
  );
};

export default CustomIcon;
