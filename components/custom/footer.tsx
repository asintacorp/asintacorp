import Link from "next/link";
import { Globe, Facebook } from "lucide-react";

const container = "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full my-12">
      <div
        className={`${container} w-full py-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:items-center sm:gap-6`}
      >
        <div className="flex items-center gap-4">
          <Link
            href="https://www.facebook.com/asintarchs"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          © {year} - asintacorp.
        </p>
      </div>
    </footer>
  );
}
