import { FaTrashAlt, FaLongArrowAltRight } from 'react-icons/fa';
import { ImDownload } from 'react-icons/im';
import formatImageSize from '../utils/formatImageSize';
import { handleFileUploadOptimisation } from '../utils/image';
import { useEffect, useState } from 'react';
import extractFileName from '../utils/extractFileName';
import Spinner from './Spinner';

interface FileInfoPropsType {
  file: File;
  handleDelete: (file: File) => void;
}

const FileInfo = ({ file, handleDelete }: FileInfoPropsType) => {
  const [isOptimising, setIsOptimising] = useState(true);
  const [optimisedFile, setOptimisedFile] = useState<File | null>(null);

  const { name, size } = file;
  const imageUrl = URL.createObjectURL(file);
  const imageName = extractFileName(name);
  const formatedOriginalSize = formatImageSize(size);
  let sizeDifference;

  let formatedOptimisedSize;
  if (optimisedFile !== null) {
    formatedOptimisedSize = formatImageSize(optimisedFile.size);
    // generate a function that find the poucentage of the size difference
    sizeDifference = `(-${Math.round((1 - optimisedFile.size / size) * 100)}%)`;
  }

  const handleFileOptimisation = async () => {
    const newFileVersion = await handleFileUploadOptimisation(file);
    if (!newFileVersion) return;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setOptimisedFile(newFileVersion);
    setIsOptimising(false);
  };

  const handleFileDownload = () => {
    if (!optimisedFile) return;

    const optimisedImageurl = URL.createObjectURL(optimisedFile);
    const link = document.createElement('a');
    link.href = optimisedImageurl;
    link.download = optimisedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    handleFileOptimisation();
  }, [file]);

  return (
    <div className="w-full max-h-16 relative flex items-center justify-start gap-5">
      <div className="w-14 h-14 relative">
        <img src={imageUrl} alt="description" className="w-full h-full object-cover rounded-lg" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-md font-semibold">{imageName}</p>
        <p className="text-sm flex items-center gap-2">
          {formatedOriginalSize}
          {!isOptimising && (
            <>
              <FaLongArrowAltRight />
              <span className="font-bold text-blue-500">
                {formatedOptimisedSize} {sizeDifference}
              </span>
            </>
          )}
        </p>
      </div>
      {isOptimising ? (
        <button className="flex flex-row h-12 items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 font-semibold ml-auto text-sm rounded-lg px-4 py-4">
          <span>Optimisation en cours...</span>
          {''}
          <Spinner />
        </button>
      ) : (
        <button
          className="flex flex-row h-12 items-center gap-2 bg-blue-600 hover:bg-blue-700 text-blue-50 border border-blue-800 font-semibold ml-auto text-sm rounded-lg px-4 py-4"
          onClick={handleFileDownload}
        >
          <span>Télécharger</span>
          <ImDownload />
        </button>
      )}
      <button
        className="text-red-600 h-12 hover:bg-red-100 rounded-lg px-4 py-4 text-sm"
        onClick={() => handleDelete(file)}
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default FileInfo;
