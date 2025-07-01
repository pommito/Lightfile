import { FaFileCirclePlus, FaFileZipper } from "react-icons/fa6";
import FileInfo from "./FileInfo";
import JSZip from "jszip";
import { useState, useEffect } from "react";

interface FilesListPropsType {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FilesList = ({ files, setFiles }: FilesListPropsType) => {
  const [optimizedFiles, setOptimizedFiles] = useState<
    Map<File, { optimizedFile: File | null; isOptimizing: boolean }>
  >(new Map());

  // Initialize optimization tracking when files change
  useEffect(() => {
    const newOptimizedFiles = new Map();
    files.forEach((file) => {
      if (!optimizedFiles.has(file)) {
        newOptimizedFiles.set(file, {
          optimizedFile: null,
          isOptimizing: true,
        });
      } else {
        newOptimizedFiles.set(file, optimizedFiles.get(file)!);
      }
    });
    setOptimizedFiles(newOptimizedFiles);
  }, [files]);

  const handleOptimizationComplete = (
    originalFile: File,
    optimizedFile: File
  ) => {
    setOptimizedFiles((prev) => {
      const newMap = new Map(prev);
      newMap.set(originalFile, { optimizedFile, isOptimizing: false });
      return newMap;
    });
  };

  const allFilesOptimized =
    files.length > 0 &&
    Array.from(optimizedFiles.values()).every(
      (info) => !info.isOptimizing && info.optimizedFile !== null
    );
  const handleAddMoreFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newFilesToAdd = Array.from(event.target.files);

    setFiles((prevFiles) => [...prevFiles, ...newFilesToAdd]);
  };

  const handleFileDelete = (fileToDelete: File) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  /**
   * Download all optimized files as a zip
   */
  const handleDownloadAllFiles = async () => {
    if (!allFilesOptimized) return;

    const zip = new JSZip();

    // Add all optimized files to the zip
    optimizedFiles.forEach((info) => {
      if (info.optimizedFile) {
        zip.file(info.optimizedFile.name, info.optimizedFile);
      }
    });

    const content = await zip.generateAsync({ type: "blob" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "Lightfiles_optimized.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" w-[90%] xl:w-3/5 text-black  border border-white overflow-hidden rounded-lg">
      <div className="w-full flex flex-row justify-end items-center px-5 py-4 gap-3 bg-white/50">
        <div className="mr-auto">
          <h2 className="font-semibold">{`Vous avez ajouté ${
            files.length
          } fichier${files.length > 1 ? "s" : ""}`}</h2>
          {files.length > 0 && (
            <p className="text-sm text-gray-600">
              {
                Array.from(optimizedFiles.values()).filter(
                  (info) => !info.isOptimizing
                ).length
              }{" "}
              / {files.length} fichier{files.length > 1 ? "s" : ""} optimisé
              {files.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
        <label
          className="flex flex-row items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100 font-semibold  text-sm rounded-lg px-3 py-3 cursor-pointer"
          htmlFor="file"
        >
          <span className="hidden md:inline">Ajouter des fichiers</span>{" "}
          <FaFileCirclePlus />
        </label>
        {files.length > 1 && (
          <button
            className={`flex flex-row items-center gap-2 font-semibold text-sm rounded-lg px-3 py-3 ${
              allFilesOptimized
                ? "bg-blue-600 hover:bg-blue-700 text-white border border-blue-800 cursor-pointer"
                : "bg-gray-200 text-gray-500 border border-gray-300 cursor-not-allowed"
            }`}
            onClick={allFilesOptimized ? handleDownloadAllFiles : undefined}
            disabled={!allFilesOptimized}
          >
            <span className="hidden md:inline">
              {allFilesOptimized
                ? "Tout télécharger en zip"
                : "Optimisation en cours..."}
            </span>
            <FaFileZipper />
          </button>
        )}
        <input
          type="file"
          id="file"
          multiple
          className="hidden"
          accept="image/*"
          onChange={handleAddMoreFiles}
        />
      </div>
      <div className="flex flex-col gap-3 md:gap-6  px-2 py-2 md:px-5 md:py-5 bg-white">
        {files.map((file, index) => (
          <FileInfo
            key={index}
            file={file}
            handleDelete={handleFileDelete}
            onOptimizationComplete={handleOptimizationComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default FilesList;
