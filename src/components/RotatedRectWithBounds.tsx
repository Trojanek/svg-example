import fontColorContrast from 'font-color-contrast';
import Rectangle from 'types/Rectangle';
import getBoundsSize from 'helpers/getBoundsSize';

type Props = Pick<Rectangle, 'center' | 'size' | 'rotation' | 'color'>;

const RotatedRectWithBounds = ({ center, size, rotation, color }: Props) => {
  const [x, y] = center;
  const [width, height] = size;

  const [boundsWidth, boundsHeight] = getBoundsSize({ size, rotation });

  const textColor = fontColorContrast(color);

  return (
    <g>
      <rect
        width={width}
        height={height}
        transform={`translate(${x - width / 2} ${y - height / 2}) rotate(${rotation} ${width / 2} ${height / 2})`}
        fill={color}
      />
      <rect
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${x - boundsWidth / 2} ${y - boundsHeight / 2})`}
        stroke="red"
        fill="none"
      />
      <circle cx={x} cy={y} r={4} fill={textColor} />
      <text x={x + 8} y={y - 4} fill={textColor}>{rotation}°</text>
    </g>
  );
};

export default RotatedRectWithBounds;
