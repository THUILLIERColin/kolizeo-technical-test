export interface UnityAnonymousAuthResponse {
  id: string;
  token: string;
}

export interface UnityAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  created_at: number;
}

export interface RemoteConfigResponse {
  configs: Record<string, unknown>;
  fetchedAt: number;
}

export interface ClubConfig {
  title: string;
  color: string;
}

export interface ApiRemoteConfigResponse {
  success: boolean;
  data?: ClubConfig;
  error?: string;
}
