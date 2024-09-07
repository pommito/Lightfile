import { useState } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Dropbox from './Components/Dropbox';
import FilesList from './Components/FilesList';

function App() {
  const [fileList, setFileList] = useState<File[]>([]);

  const handleFileDelete = (fileToDelete: File) => {
    setFileList(fileList.filter((file) => file !== fileToDelete));
  };

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center gap-4 px-8 py-6 ">
        <h1 className="text-5xl mt-8 ">Optimisez en un clic vos images pour le web.</h1>
        <p className="text-l w-1/2 text-center mb-12">
          En seulement quelques secondes, obtenez une version optimisée de vos images pour améliorer les performances de
          votre projet web.
        </p>
        {fileList && fileList.length > 0 ? (
          <FilesList files={fileList} setFiles={setFileList} handleDelete={handleFileDelete} />
        ) : (
          <Dropbox setFiles={setFileList} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
