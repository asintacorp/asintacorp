"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export default function NotFound() {
  return (
    <main className="font-mono flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-xl text-center">
        <Image
          src="/img/404.webp"
          alt="Under development"
          width={360}
          height={240}
          className="mx-auto mb-6 w-full max-w-xs h-auto object-contain"
        />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-2">
          Under Development
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground mb-6">
          We’re currently working on this section of the site. Thanks for your
          patience — we’ll be back shortly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild variant="ghost" className="w-auto">
            <Link href="/">
              <ChevronLeftIcon className="size-4" />
              Go Home
            </Link>
          </Button>

          <a
            href="mailto:asinta.corp@gmail.com"
            className="inline-block px-4 py-2 rounded-md text-sm border border-muted-foreground text-muted-foreground w-auto"
            aria-label="Contact us"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
