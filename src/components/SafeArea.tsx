interface SafeAreaProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

const SafeArea = ({ children, className = '' }: SafeAreaProps) => (
  <div
    className={`max-w-[1024px] mx-auto px-10 ${className}`}
  >
    {children}
  </div>
);

export { SafeArea };
