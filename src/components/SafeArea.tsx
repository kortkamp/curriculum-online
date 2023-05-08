interface SafeAreaProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

function SafeArea({ children, className = '' }: SafeAreaProps) {
  return (
    <div
      className={`max-w-[1024px] mx-auto px-10 ${className}`}
    >
      {children}
    </div>
  );
}

export default SafeArea;
