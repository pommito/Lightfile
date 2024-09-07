import { useState } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Dropbox from './Components/Dropbox';
import FileInfo from './Components/FileInfo';

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

        <div className="w-3/5 flex flex-col gap-6 px-5 py-5 bg-white text-black">
          <FileInfo />
          <FileInfo />
          <FileInfo />
          <FileInfo />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
