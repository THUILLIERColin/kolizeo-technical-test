export default async function ClubPage(props: { params: Promise<{ club: string }> }) {
  const params = await props.params;

  return (
    <div>
      <h1>Club : {params.club}</h1>
    </div>
  );
}
