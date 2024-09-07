import { ImDropbox } from 'react-icons/im';

const Dropbox = () => {
  return (
    <div className="w-3/5 h-1/2 flex flex-col justify-center items-center gap-4 bg-white/20 border rounded-lg border-dashed border-white/50 backdrop-blur cursor-pointer">
      <ImDropbox className="size-16" />
      <p className="text-xl">Click or Drop your files here !</p>
    </div>
  );
};

export default Dropbox;
