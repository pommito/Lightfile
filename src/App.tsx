import { useState } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Dropbox from './Components/Dropbox';
import FileInfo from './Components/FileInfo';
import { FaFileDownload } from 'react-icons/fa';

function App() {
  const [fileList, setFileList] = useState<File[] | null>(null);

  return (
    <div className="w-screen">
      <Header />
      <main className="flex flex-col items-center gap-4 px-8 py-6 ">
        <h1 className="text-5xl mt-8 ">Optimisez en un clic vos images pour le web.</h1>
        <p className="text-l w-1/2 text-center mb-6">
          En seulement quelques secondes, obtenez une version optimisée de vos images pour améliorer les performances de
          votre projet web.
        </p>
        <Dropbox setFiles={setFileList} />

        <div className="w-3/5 text-black  border border-white overflow-hidden rounded-lg">
          <div className="w-full flex flex-row justify-end items-center px-5 py-4 gap-3 bg-white/50">
            <h2 className="mr-auto">Vous avez déposé 3 fichiers</h2>
            <button className="flex flex-row items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold  text-sm rounded-lg px-4 py-4">
              Ajouter des fichiers <FaFileDownload />
            </button>
            <button className="flex flex-row items-center gap-2 bg-blue-600 text-white font-semibold text-sm rounded-lg px-4 py-4">
              Tout Télécharger <FaFileDownload />
            </button>
          </div>
          <div className="flex flex-col gap-6 px-5 py-5 bg-white">
            <FileInfo />
            <FileInfo />
            <FileInfo />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
