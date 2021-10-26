import { CanvasState } from 'store/canvasSlice';
import { Canvas, RotatedRectWithBounds } from 'components';
import './Picture.css';

const Picture = ({ project, status }: CanvasState) => {
  switch (true) {
    case status === 'loading':
      return <div className="info">Loading...</div>;
    case status === 'failed':
      return <div className="info">Invalid</div>;
    case Boolean(project?.items?.length):
      return (
        <>
          {Boolean(project) && (
            <div className="info">{project?.id} / {project?.name}</div>
          )}
          <div className="canvas">
            <Canvas size={[project?.width ?? 1000, project?.height || 1000]}>
              {
                (project?.items ?? []).map(({
                  id,
                  center,
                  size,
                  rotation,
                  color,
                }) => (
                  <RotatedRectWithBounds
                    key={id}
                    center={center}
                    size={size}
                    rotation={rotation}
                    color={color}
                  />
                ))
              }
            </Canvas>
          </div>
        </>
      );
    default:
      return null;
  }
};

export default Picture;
