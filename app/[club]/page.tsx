import { clubNameToConfigKey, getRemoteConfigForClub } from '@/lib/remote-config';

export default async function ClubPage(props: { params: Promise<{ club: string }> }) {
  const params = await props.params;

  return (
    <div>
      <h1>Club : {params.club}</h1>
      <p>Config du club : {clubNameToConfigKey(params.club)}</p>
      <pre>
        {JSON.stringify(await getRemoteConfigForClub(clubNameToConfigKey(params.club)), null, 2)}
      </pre>
    </div>
  );
}
