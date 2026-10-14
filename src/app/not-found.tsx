import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-svh flex flex-col justify-center items-center">
      <h1 className="mb-4 text-6xl text-primary">404</h1>
      <h2 className=" mb-2 text-3xl md:text-4xl text-center text-heading font-medium">
        Page not found
      </h2>
      <p className="w-full max-w-md text-center text-muted-foreground mb-6">
        The page you&apos;re looking for doesn&apos;t exist .
      </p>

      <Link
        href="/dashboard"
        className="bg-primary py-2 px-4 text-sm text-primary-foreground rounded-xl hover:bg-primary-hover transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
