import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Turn Your <span className="text-primary">Podcasts</span> Into <br />{" "}
          Viral <span className="text-primary">Clips</span>
        </h1>
        <p className="text-muted-foreground mt-6 max-w-5xl text-center text-2xl font-semibold">
          Effortlessly transform entire video podcasts into engaging short
          clips, perfect for Instagram Reels and YouTube Shorts.
        </p>
        <Button
          size="lg"
          className="mt-6 h-[60px] cursor-pointer text-xl font-semibold"
          asChild
        >
          <Link href="/dashboard">Get stated for free</Link>
        </Button>
      </div>
    </main>
  );
}
