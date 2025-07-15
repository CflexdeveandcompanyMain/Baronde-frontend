export default function ErrorMessage({ message }: { message: string }) {
  if (!message) return <div></div>;
  return <p className="text-sm font-medium font-all text-red-500">{message}</p>;
}
