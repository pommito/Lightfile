import { useRef } from 'react';
import useDragAndDrop from '../hooks/useDragAndDrop';

import { ImDropbox } from 'react-icons/im';

interface DropboxPropsType {
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
}

const Dropbox = ({ setFiles }: DropboxPropsType) => {
  const { isDragOver, handleDragOver, handleDrop, handleDragLeave } = useDragAndDrop();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    console.log(event.target.files);

    setFiles(Array.from(event.target.files));
  };

  return (
    <div
      className={`w-3/5 h-1/2 flex flex-col justify-center items-center gap-4 bg-white/20 border rounded-lg border-dashed backdrop-blur cursor-pointer ${
        isDragOver ? 'border-blue-700' : 'border-white/50'
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <ImDropbox className="size-16" />
      <p className="text-xl">Click or Drop your files here !</p>
      <input
        type="file"
        id="file"
        multiple
        className="hidden"
        accept="image/*"
        ref={inputRef}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Dropbox;
