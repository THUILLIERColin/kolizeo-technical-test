import type { ClubConfig, RemoteConfigResponse, UnityAnonymousAuthResponse } from '@/types/unity';

const MOCK_CONFIGS: Record<string, ClubConfig> = {
  MetzHandball_Config: {
    title: 'Metz Handball',
    color: '#FF6B35',
  },
  FcMetz_Config: {
    title: 'FC Metz',
    color: '#8B0000',
  },
};


export function clubNameToConfigKey(clubName: string): string {
  if (!clubName) {
    throw new Error('Le nom du club ne peut pas être vide');
  }
  if (clubName.toLowerCase() === 'metzhandball') {
    return 'MetzHandball_Config';
  }
  if (clubName.toLowerCase() === 'fcmetz') {
    return 'FcMetz_Config';
  }
  const capitalized = clubName.charAt(0).toUpperCase() + clubName.slice(1);
  return `${capitalized}_Config`;
}

async function getUnityAuthToken(): Promise<string> {
  const projectId = process.env.UNITY_PROJECT_ID;

  if (!projectId) {
    throw new Error('UNITY_PROJECT_ID non configuré');
  }

  const response = await fetch('https://services.api.unity.com/auth/v1/authentication/anonymous', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ProjectId: projectId,
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Erreur Unity Auth:', errorText);
    throw new Error("Échec de l'authentification Unity");
  }

  const data: UnityAnonymousAuthResponse = await response.json();
  return data.token;
}

export async function getRemoteConfigForClub(clubName: string): Promise<ClubConfig> {
  if (process.env.MOCK === 'true') {
    console.log(`[MOCK] Récupération de la config pour: ${clubName}`);
    const configKey = clubNameToConfigKey(clubName);
    const mockConfig = MOCK_CONFIGS[configKey];

    if (!mockConfig) {
      throw new Error(`[MOCK] Configuration non trouvée pour le club: ${clubName}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    return mockConfig;
  }

  try {
    const token = await getUnityAuthToken();

    const projectId = process.env.UNITY_PROJECT_ID;
    const environmentId = process.env.UNITY_ENVIRONMENT_ID || 'production';

    const response = await fetch(
      `https://remote-config.unity3d.com/client/v1/projects/${projectId}/environments/${environmentId}/configs`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur Remote Config:', errorText);
      throw new Error('Échec de la récupération du Remote Config');
    }

    const data: RemoteConfigResponse = await response.json();

    const configKey = clubNameToConfigKey(clubName);
    const clubConfigValue = data.configs[configKey];

    if (!clubConfigValue) {
      throw new Error(`Configuration non trouvée pour le club: ${clubName} (clé: ${configKey})`);
    }

    let clubConfig: ClubConfig;
    if (typeof clubConfigValue === 'string') {
      clubConfig = JSON.parse(clubConfigValue);
    } else {
      clubConfig = clubConfigValue as ClubConfig;
    }

    if (!clubConfig.title || !clubConfig.color) {
      throw new Error('Configuration du club invalide: title et color requis');
    }

    return clubConfig;
  } catch (error) {
    console.error(`Erreur lors de la récupération du Remote Config pour ${clubName}:`, error);
    throw error;
  }
}
