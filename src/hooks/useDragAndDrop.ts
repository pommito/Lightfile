import { useState, useCallback } from 'react';

const useDragAndDrop = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, setFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
      event.preventDefault();
      setIsDragOver(false);

      const files = event.dataTransfer.files;

      setFiles(Array.from(files));
    },
    []
  );

  return {
    isDragOver,
    handleDragOver,
    handleDrop,
    handleDragLeave,
  };
};

export default useDragAndDrop;
