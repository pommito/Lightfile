import { FaFileDownload, FaTrashAlt, FaLongArrowAltRight } from 'react-icons/fa';

import placeholder from '../assets/placeholder.png';

const FileInfo = () => {
  return (
    <div className="w-full max-h-16 relative flex items-center justify-start gap-5 border border-blue-600">
      <div className="w-16 h-16 relative">
        <img src={placeholder} alt="description" className="object-cover rounded-lg" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-md font-semibold">Le nom du fichier vient ici</p>
        <p className="text-sm flex items-center gap-2">
          130 Kb
          <FaLongArrowAltRight />
          <span className="font-bold text-blue-500">20 Kb</span>
        </p>
      </div>
      <button className="flex flex-row items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold ml-auto text-sm rounded-lg px-4 py-4">
        Télécharger <FaFileDownload />
      </button>
      <button className="text-red-600 hover:bg-red-100 rounded-lg px-4 py-4 text-sm">
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default FileInfo;
