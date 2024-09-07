import FileInfo from './FileInfo';

import { FaFileCirclePlus } from 'react-icons/fa6';
import { ImDownload } from 'react-icons/im';

const FilesList = () => {
  return (
    <div className="w-3/5 text-black  border border-white overflow-hidden rounded-lg">
      <div className="w-full flex flex-row justify-end items-center px-5 py-4 gap-3 bg-white/50">
        <h2 className="font-semibold mr-auto">Vous avez déposé 3 fichiers</h2>
        <button className="flex flex-row items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold  text-sm rounded-lg px-4 py-4">
          Ajouter des fichiers <FaFileCirclePlus />
        </button>
        <button className="flex flex-row items-center gap-2 bg-blue-600 text-white font-semibold text-sm rounded-lg px-4 py-4">
          Tout Télécharger <ImDownload />
        </button>
      </div>
      <div className="flex flex-col gap-6 px-5 py-5 bg-white">
        <FileInfo />
        <FileInfo />
        <FileInfo />
      </div>
    </div>
  );
};

export default FilesList;
