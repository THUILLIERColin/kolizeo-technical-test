import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen font-sans">
      <main className="m-auto p-4 max-w-4xl w-full">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Unity Remote Config Demo</h1>
            <p className="text-muted-foreground">
              Sélectionnez un club pour voir sa configuration Unity Remote Config
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Metz Handball</CardTitle>
                <CardDescription>Configuration pour le Metz Handball</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/metzhandball">Voir la configuration</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FC Metz</CardTitle>
                <CardDescription>Configuration pour le FC Metz</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/fcmetz">Voir la configuration</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test d&apos;erreur</CardTitle>
                <CardDescription>Tester la gestion des erreurs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="destructive" className="w-full">
                  <Link href="/error">Voir l&apos;erreur</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thème</CardTitle>
                <CardDescription>Basculer entre mode clair et sombre</CardDescription>
              </CardHeader>
              <CardContent>
                <ModeToggle />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
