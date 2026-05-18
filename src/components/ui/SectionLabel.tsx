interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: Props) {
  return (
    <div
      className={`section-label inline-flex items-center gap-[10px] font-mono text-[0.7rem] tracking-[0.2em] uppercase text-accent mb-4 ${className}`}
    >
      {children}
    </div>
  );
}
