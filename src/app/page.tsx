import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center gap-y-5 text-center pt-24">
    <h1>Welcome to my blog</h1>

    <Link href="/posts" className="underline">View Posts</Link>
</main>
  );
}
