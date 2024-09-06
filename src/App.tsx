import Header from './Components/Header';

function App() {
  return (
    <div className="w-screen h-screen max-h-screen overflow-hidden">
      <Header />
      <main className="h-[90vh] flex flex-col items-center gap-4 px-8 py-6 ">
        <h1 className="text-5xl mt-8">Free file converter</h1>
        <p className="text-l w-1/2 text-center mb-6">
          Introducing FileFlex – your go-to online tool for unlimited and free multimedia conversion, all processed
          locally on your device for enhanced privacy and security. Easily convert images, audio, and videos without any
          restrictions. Start converting now and streamline your content effortlessly with FileFlex!
        </p>
        <div className="w-3/5 h-1/2 border-2 rounded-lg border-dotted border-blue-900 "></div>
      </main>
    </div>
  );
}

export default App;
