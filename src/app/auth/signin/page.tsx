import { AuthForm } from "@/components/auth/auth-form";
import { Package } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">CampusClaim</h1>
          <p className="text-muted-foreground">
            Smart Lost & Found Portal for Your Campus
          </p>
        </div>
        <AuthForm mode="signin" />
      </div>
    </div>
  );
}
