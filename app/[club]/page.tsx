import { getRemoteConfigForClub } from '@/lib/remote-config';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import type { ClubConfig } from '@/types/unity';

export default async function ClubPage(props: { params: Promise<{ club: string }> }) {
  const params = await props.params;
  const clubName = params.club;

  let config: ClubConfig | null = null;
  let error: string | null = null;

  try {
    config = await getRemoteConfigForClub(clubName);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Erreur inconnue';
  }

  if (error || !config) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Club : {clubName}</h1>

          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Club non trouvé</AlertTitle>
            <AlertDescription>{error || 'Configuration non disponible'}</AlertDescription>
          </Alert>

          <Button asChild variant="outline">
            <Link href="/">← Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: config.color }}>
            {config.title}
          </h1>
          <p className="text-muted-foreground">
            Configuration pour :{' '}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              {clubName}
            </code>
          </p>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations du club</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-muted-foreground">Titre</dt>
                  <dd className="col-span-2 text-sm">{config.title}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-muted-foreground">Couleur</dt>
                  <dd className="col-span-2 flex items-center gap-2">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      {config.color}
                    </code>
                    <div
                      className="h-6 w-6 rounded-md border-2 border-border shadow-sm"
                      style={{ backgroundColor: config.color }}
                      title={config.color}
                    />
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aperçu visuel</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="rounded-lg p-8 text-center text-white shadow-inner"
                style={{ backgroundColor: config.color }}
              >
                <h3 className="text-2xl font-bold mb-2">{config.title}</h3>
                <p className="text-white/90">Bannière avec la couleur du club</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="pt-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/">← Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
