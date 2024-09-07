interface ButtonPropsType {
  children: React.ReactNode;
  handleCLick: () => void;
}

const Button = ({ children, handleCLick }: ButtonPropsType) => {
  return (
    <button
      className="flex flex-row items-center gap-2 bg-blue-600 text-white font-semibold text-sm rounded-lg px-4 py-4"
      onClick={handleCLick}
    >
      {children}
    </button>
  );
};

export default Button;
