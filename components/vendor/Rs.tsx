export function Rs({ value, className }: { value: number; className?: string }) {
  return (
    <span className={className}>
      <span className="text-[10px] font-medium align-baseline mr-0.5">₨</span>
      {value.toLocaleString("en-LK")}
    </span>
  );
}

export function rsString(value: string): { isCurrency: boolean; amount: string } {
  if (!value.startsWith("₨")) return { isCurrency: false, amount: value };
  return { isCurrency: true, amount: value.replace("₨ ", "") };
}
