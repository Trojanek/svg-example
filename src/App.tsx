import { useState, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getInit, selectStatus, selectProject } from 'store/canvasSlice';
import Picture from 'components/Picture';

const App = () => {
  const [id, setId] = useState('');
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const project = useAppSelector(selectProject);
  const dispatchFetch = () => dispatch(getInit(id || undefined));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value.trim());
  };

  return (
    <div>
      <div className="search">
        <input
          type="text"
          value={id}
          placeholder=""
          onChange={handleChange}
        />
        <button aria-label="Fetch" onClick={dispatchFetch}>
          Fetch
        </button>
      </div>
      <Picture status={status} project={project} />
    </div>
  );
};

export default App;
