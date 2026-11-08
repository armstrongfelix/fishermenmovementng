export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-site px-[18px] sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
