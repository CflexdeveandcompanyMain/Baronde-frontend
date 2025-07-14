export default function ErrorMessage({ message }: { message: string }) {
  if (!message) return <div></div>;
  return <p className="text-xs font-medium font-all text-red-600">{message}</p>;
}
