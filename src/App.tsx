import Header from './Components/Header';
import Footer from './Components/Footer';
import Dropbox from './Components/Dropbox';

function App() {
  return (
    <div className="w-screen h-screen max-h-screen overflow-hidden bg-custom-gradient">
      <Header />
      <main className="h-[85vh] flex flex-col items-center gap-4 px-8 py-6 ">
        <h1 className="text-5xl mt-8">Free file converter</h1>
        <p className="text-l w-1/2 text-center mb-6">
          Introducing FileFlex – your go-to online tool for unlimited and free multimedia conversion, all processed
          locally on your device for enhanced privacy and security. Easily convert images, audio, and videos without any
          restrictions. Start converting now and streamline your content effortlessly with FileFlex!
        </p>
        <Dropbox />
      </main>
      <Footer />
    </div>
  );
}

export default App;
