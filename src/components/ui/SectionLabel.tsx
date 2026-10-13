export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <p className="eyebrow flex items-center gap-4">
      <span className="text-amber">{index}</span>
      <span aria-hidden className="h-px w-10 bg-white/20" />
      <span>{children}</span>
    </p>
  );
}
