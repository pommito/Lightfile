import JSZip from 'jszip';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { ImDownload } from 'react-icons/im';

import FileInfo from './FileInfo';

interface FilesListPropsType {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  handleDelete: (file: File) => void;
}

const FilesList = ({ files, setFiles, handleDelete }: FilesListPropsType) => {
  console.log(files);

  const handleDownloadAllFiles = async () => {
    const zip = new JSZip();

    files.forEach((file) => {
      zip.file(file.name, file);
    });

    const content = await zip.generateAsync({ type: 'blob' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'Lightfiles.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddMoreFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newFilesToAdd = Array.from(event.target.files);

    setFiles((prevFiles) => [...prevFiles, ...newFilesToAdd]);
  };

  return (
    <div className="w-3/5 text-black  border border-white overflow-hidden rounded-lg">
      <div className="w-full flex flex-row justify-end items-center px-5 py-4 gap-3 bg-white/50">
        <h2 className="font-semibold mr-auto">{`Vous avez ajouté ${files.length} fichier${
          files.length > 1 ? 's' : ''
        }`}</h2>
        <label
          className="flex flex-row items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold  text-sm rounded-lg px-4 py-4 cursor-pointer"
          htmlFor="file"
        >
          Ajouter des fichiers <FaFileCirclePlus />
        </label>
        <input type="file" id="file" multiple className="hidden" accept="image/*" onChange={handleAddMoreFiles} />
        <button
          className="flex flex-row items-center gap-2 bg-blue-600 text-white font-semibold text-sm rounded-lg px-4 py-4"
          onClick={handleDownloadAllFiles}
        >
          Tout Télécharger <ImDownload />
        </button>
      </div>
      <div className="flex flex-col gap-6 px-5 py-5 bg-white">
        {files.map((file, index) => (
          <FileInfo key={index} file={file} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default FilesList;
