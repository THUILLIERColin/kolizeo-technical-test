import { NextResponse } from 'next/server';
import { getRemoteConfigForClub } from '@/lib/remote-config';
import type { ApiRemoteConfigResponse } from '@/types/unity';

/**
 * GET /api/unity/remote-config?club={clubName}
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const club = searchParams.get('club');

  if (!club) {
    return NextResponse.json(
      { success: false, error: 'Le paramètre club est requis' } as ApiRemoteConfigResponse,
      { status: 400 },
    );
  }

  try {
    const config = await getRemoteConfigForClub(club);
    return NextResponse.json({
      success: true,
      data: config,
    } as ApiRemoteConfigResponse);
  } catch (error) {
    console.error('Erreur Remote Config API:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Échec de la récupération du Remote Config';

    return NextResponse.json({ success: false, error: errorMessage } as ApiRemoteConfigResponse, {
      status: 500,
    });
  }
}
