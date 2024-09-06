import Header from './Components/Header';
import Footer from './Components/Footer';

import { ImDropbox } from 'react-icons/im';

function App() {
  return (
    <div className="w-screen h-screen max-h-screen overflow-hidden">
      <Header />
      <main className="h-[85vh] flex flex-col items-center gap-4 px-8 py-6 ">
        <h1 className="text-5xl mt-8">Free file converter</h1>
        <p className="text-l w-1/2 text-center mb-6">
          Introducing FileFlex – your go-to online tool for unlimited and free multimedia conversion, all processed
          locally on your device for enhanced privacy and security. Easily convert images, audio, and videos without any
          restrictions. Start converting now and streamline your content effortlessly with FileFlex!
        </p>
        <div className="w-3/5 h-1/2 flex flex-col justify-center items-center gap-4 bg-white/20 border rounded-lg border-dashed border-white/50 cursor-pointer">
          <ImDropbox className="size-16" />
          <p className="text-xl">Click or Drop your files here !</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
