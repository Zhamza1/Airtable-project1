type StatCardProps = {
  label: string;
  value: number | string;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="p-6 flex flex-col items-center ">
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}