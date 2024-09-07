import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { ImDownload } from 'react-icons/im';
import { handleFileUploadOptimisation } from '../utils/image';
import FileInfo from './FileInfo';
import Button from './Button';

interface FilesListPropsType {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FilesList = ({ files, setFiles }: FilesListPropsType) => {
  const [isOptimising, setIsOptimising] = useState(false);
  const [optimisedFiles, setOptimisedFiles] = useState<File[]>([]);

  useEffect(() => {
    console.log('optimisedFiles', optimisedFiles);
  }, [optimisedFiles]);

  const handleAddMoreFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newFilesToAdd = Array.from(event.target.files);

    setFiles((prevFiles) => [...prevFiles, ...newFilesToAdd]);
  };

  const handleFileDelete = (fileToDelete: File) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  // const handleFileOptimisation = async () => {
  //   for (const file of files) {
  //     try {
  //       const optimisedFile = await handleFileUploadOptimisation(file); // Attendre ici pour obtenir le fichier optimisé
  //       console.log('Fichier optimisé :', optimisedFile);
  //       setOptimisedFiles((prevOptimisedFiles) => [...prevOptimisedFiles, optimisedFile]); // Mettre à jour l'état
  //     } catch (error) {
  //       console.error("Erreur lors de l'optimisation du fichier :", error);
  //     }
  //   }
  // };

  const handleFileOptimisation = async () => {
    setIsOptimising(true);

    const optimisedFilesArray = await Promise.all(
      files.map(async (file) => {
        try {
          const optimisedFile = await handleFileUploadOptimisation(file);
          console.log('Fichier optimisé :', optimisedFile);
          return optimisedFile;
        } catch (error) {
          console.error("Erreur lors de l'optimisation du fichier :", error);
          return file;
        }
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setOptimisedFiles(optimisedFilesArray as File[]);
    setIsOptimising(false);
  };

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

        {isOptimising ? (
          <Button handleCLick={handleFileOptimisation}>Optimisation en cours...</Button>
        ) : (
          <Button handleCLick={handleFileOptimisation}>
            Optimiser <ImDownload />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-6 px-5 py-5 bg-white">
        {files.map((file, index) => (
          <FileInfo key={index} file={file} handleDelete={handleFileDelete} />
        ))}
      </div>
    </div>
  );
};

export default FilesList;
