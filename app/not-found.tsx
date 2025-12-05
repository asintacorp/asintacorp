"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="max-w-md text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-primary">404</CardTitle>
          <CardDescription className="text-lg mt-2">
            The page you’re looking for doesn’t seem to exist.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Maybe you mistyped the URL, or the page has been moved. Let’s get
            you back on track.
          </p>

          <Button asChild className="w-full">
            <Link href="/">Go Back Home</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
