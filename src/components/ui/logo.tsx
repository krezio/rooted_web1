export function Logo({ className = "", textClassName = "" }: { className?: string, textClassName?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className={`font-display font-bold tracking-tight leading-none ${textClassName}`}>ROOTED</span>
      <span className="font-serif italic text-[0.4em] tracking-[0.3em] uppercase mt-1 opacity-80">Flowers by RS</span>
    </div>
  );
}
