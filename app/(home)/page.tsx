import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <div className="h-[50rem] w-full  dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {/* Container for title and description */}
        <div className="relative z-20 flex flex-col items-center">
          {/* Title */}
          <p className="text-4xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4">
            Learn Cloud & DevOps
          </p>
          {/* Description */}
          <p className="text-lg sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
            DevOps is the union of people, <strong>process</strong>, and{" "}
            <strong>products</strong> to enable continuous delivery of value to
            your <strong>end users</strong>.
          </p>
          <Link href="/docs">
            <Button className="m-5 from-neutral-200 to-neutral-500">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
