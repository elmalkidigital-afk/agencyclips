'use client';

import { useUser } from '@/firebase/provider';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, LogIn, LogOut, Sparkles, BookMarked, Image as ImageIcon } from 'lucide-react';

export default function ProfilPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error('Erreur de connexion:', e);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Erreur de déconnexion:', e);
    }
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background p-4 pb-24">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Connectez-vous</h1>
            <p className="text-muted-foreground text-sm max-w-xs">
              Accédez à toutes les fonctionnalités : générations illimitées, historique, favoris.
            </p>
          </div>
          <Button onClick={handleSignIn} size="lg" className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            Se connecter avec Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center pt-6 pb-2">
          <h1 className="text-2xl font-bold text-hikma-gradient inline-block">Mon Profil</h1>
        </div>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'Utilisateur'} />
              <AvatarFallback className="text-lg">
                {user.displayName?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold truncate">{user.displayName || 'Utilisateur'}</h2>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Sparkles className="h-6 w-6 text-primary mb-2" />
              <span className="text-xl font-bold">∞</span>
              <span className="text-xs text-muted-foreground">Générations</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <BookMarked className="h-6 w-6 text-primary mb-2" />
              <span className="text-xl font-bold">Pro</span>
              <span className="text-xs text-muted-foreground">Statut</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <ImageIcon className="h-6 w-6 text-primary mb-2" />
              <span className="text-xl font-bold">HD</span>
              <span className="text-xs text-muted-foreground">Qualité</span>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Compte</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              className="w-full flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
