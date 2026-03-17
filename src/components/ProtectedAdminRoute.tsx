import { ReactNode, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { Shield, LockKeyhole, LogIn } from "lucide-react";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

const getAllowedEmails = (): string[] => {
  return (import.meta.env.VITE_ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
};

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const allowedEmails = useMemo(getAllowedEmails, []);

  const isAuthorized = !!user?.email && allowedEmails.includes(user.email.toLowerCase());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleEmailPasswordSignIn = async () => {
    if (allowedEmails.length === 0) {
      toast.error("Defina VITE_ADMIN_ALLOWED_EMAILS no .env para habilitar o acesso admin.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      toast.error("Informe e-mail e senha para continuar.");
      return;
    }

    setIsSigningIn(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);
      const signedEmail = result.user.email?.toLowerCase();

      if (!signedEmail || !allowedEmails.includes(signedEmail)) {
        await signOut(auth);
        toast.error("Seu e-mail nao esta autorizado para acessar a area admin.");
        return;
      }

      toast.success("Acesso admin liberado.");
    } catch {
      toast.error("Falha no login com e-mail e senha. Confira suas credenciais.");
    } finally {
      setIsSigningIn(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <Card className="w-full max-w-lg bg-card/60 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Validando acesso admin
            </CardTitle>
            <CardDescription>Aguarde enquanto conferimos suas credenciais.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 py-10">
        <Card className="w-full max-w-lg bg-card/60 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="w-5 h-5 text-primary" />
              Area restrita
            </CardTitle>
            <CardDescription>
              Entre com e-mail e senha de uma conta autorizada para acessar a pagina de publicacoes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@exemplo.com"
              autoComplete="email"
            />
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Sua senha"
              autoComplete="current-password"
            />
            <Button onClick={handleEmailPasswordSignIn} disabled={isSigningIn} className="w-full">
              <LogIn className="w-4 h-4" />
              {isSigningIn ? "Entrando..." : "Entrar com e-mail e senha"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
