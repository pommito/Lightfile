import { useRef } from 'react';
import useDragAndDrop from '../hooks/useDragAndDrop';

import { ImDropbox } from 'react-icons/im';

const Dropbox = () => {
  const { isDragOver, handleDragOver, handleDrop, handleDragLeave } = useDragAndDrop();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      className={`w-3/5 h-1/2 flex flex-col justify-center items-center gap-4 bg-white/20 border rounded-lg border-dashed backdrop-blur cursor-pointer ${
        isDragOver ? 'border-blue-700' : 'border-white/50'
      }`}
    >
      <ImDropbox className="size-16" />
      <p className="text-xl">Click or Drop your files here !</p>
      <input type="file" id="file" multiple className="hidden" accept="image/*" ref={inputRef} />
    </div>
  );
};

export default Dropbox;
