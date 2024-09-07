import { FaTrashAlt, FaLongArrowAltRight } from 'react-icons/fa';
import { ImDownload } from 'react-icons/im';
import { formatImageSize } from '../utils/image';

interface FileInfoPropsType {
  file: File;
}

const FileInfo = ({ file }: FileInfoPropsType) => {
  const { name, size } = file;
  const url = URL.createObjectURL(file);

  const formatedSize = formatImageSize(size);

  console.log(file);

  return (
    <div className="w-full max-h-16 relative flex items-center justify-start gap-5 border border-blue-600">
      <div className="w-16 h-16 relative">
        <img src={url} alt="description" className="w-full h-full object-cover rounded-lg" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-md font-semibold">{name}</p>
        <p className="text-sm flex items-center gap-2">
          {formatedSize}
          <FaLongArrowAltRight />
          <span className="font-bold text-blue-500">20 Kb</span>
        </p>
      </div>
      <button className="flex flex-row items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold ml-auto text-sm rounded-lg px-4 py-4">
        Télécharger <ImDownload />
      </button>
      <button className="text-red-600 hover:bg-red-100 rounded-lg px-4 py-4 text-sm">
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default FileInfo;
