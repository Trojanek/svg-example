import Rectangle from 'types/Rectangle';
import degreesToRadians from './degreesToRadians';

type GetBoundsSize = Pick<Rectangle, 'size' | 'rotation'>;

const getBoundsSize = ({ size, rotation }: GetBoundsSize) => {
  const x = size[0] / 2;
  const y = size[1] / 2;
  const rotationInRadians = degreesToRadians(rotation);
  const sin = Math.sin(rotationInRadians);
  const cos = Math.cos(rotationInRadians);

  // alternatywnie, zamiast znajdować wartość maksymalną,
  // moglibyśmy polegać na ćwirtce, w której zawiera się wektor

  // rotation matrix
  const boundsWidth =
    2 * Math.max(Math.abs(y * sin + x * cos), Math.abs(y * sin - x * cos));
  const boundsHeight =
    2 * Math.max(Math.abs(y * cos + x * sin ), Math.abs(y * cos - x * sin));

  return [boundsWidth, boundsHeight];
};

export default getBoundsSize;
