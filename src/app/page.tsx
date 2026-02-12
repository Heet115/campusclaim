import { Button } from "@/components/ui/button";
import { Package, Search, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <Package className="w-10 h-10 text-primary" />
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              CampusClaim
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Smart Lost & Found Portal for Your Campus
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Digitize your campus lost-and-found process with a centralized
              platform for reporting, searching, and claiming lost items.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8"
            >
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-16 w-full">
            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-background/50 backdrop-blur">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Easy Search</h3>
              <p className="text-sm text-muted-foreground">
                Quickly find lost items with powerful search and filtering
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-background/50 backdrop-blur">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Secure Claims</h3>
              <p className="text-sm text-muted-foreground">
                Structured verification process with admin approval
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-background/50 backdrop-blur">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Real-time Updates</h3>
              <p className="text-sm text-muted-foreground">
                Track claim status and get instant notifications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
