import { ReactNode } from 'react';

type Props = {
  size: [number, number];
  children: ReactNode;
};

const Canvas = ({ size: [width, height], children }: Props) => {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      <rect fill="whitesmoke" width="100%" height="100%" />
      {children}
    </svg>
  );
};

export default Canvas;
