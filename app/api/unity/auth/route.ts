import { NextResponse } from 'next/server';
import type { UnityAnonymousAuthResponse } from '@/types/unity';

/**
 * POST /api/unity/auth
 * Authentifie anonymement avec Unity et retourne un token d'accès
 */
export async function POST() {
  try {
    const projectId = process.env.UNITY_PROJECT_ID;

    if (!projectId) {
      return NextResponse.json({ error: 'UNITY_PROJECT_ID non configuré' }, { status: 500 });
    }

    const response = await fetch(
      `https://services.api.unity.com/auth/v1/authentication/anonymous`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ProjectId: projectId,
        },
        body: JSON.stringify({}),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur Unity Auth:', errorText);
      return NextResponse.json(
        { error: "Échec de l'authentification Unity" },
        { status: response.status },
      );
    }

    const data: UnityAnonymousAuthResponse = await response.json();

    return NextResponse.json({
      success: true,
      token: data.token,
      userId: data.id,
    });
  } catch (error) {
    console.error("Erreur lors de l'authentification Unity:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
