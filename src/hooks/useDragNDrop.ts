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

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    console.log(files);
  }, []);

  return {
    isDragOver,
    handleDragOver,
    handleDrop,
    handleDragLeave,
  };
};

export default useDragAndDrop;
