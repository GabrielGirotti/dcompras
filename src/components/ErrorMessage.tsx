export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="font-poppins text-red text-sm">{children}</div>;
}
