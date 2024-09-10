import { useRef } from 'react';
import useDragAndDrop from '../hooks/useDragAndDrop';

import { GoGoal, GoFileSymlinkFile } from 'react-icons/go';

interface DropboxPropsType {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
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

    setFiles(Array.from(event.target.files));
  };

  return (
    <div
      className={`w-[90%] xl:w-3/5 h-[45vh] flex flex-col justify-center items-center gap-4 bg-black/20 dark:bg-white/20 border rounded-lg border-dashed backdrop-blur cursor-pointer ${
        isDragOver ? 'border-white' : 'border-white/50'
      }`}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, setFiles)}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      {isDragOver ? <GoGoal className="size-12" /> : <GoFileSymlinkFile className="size-12" />}
      <p className="text-2xl text-center font-semibold">
        {isDragOver ? 'Oui juste là !' : 'Cliquez ou déposez vos fichiers ici'}
      </p>
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
