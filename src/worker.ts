import { handleAuthStart, handleAuthCallback } from './api/auth';
import { handleAdminConfig } from './api/admin-config';

interface Env {
  ASSETS: Fetcher;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_REPO: string;
  GITHUB_BRANCH?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/auth') {
      return handleAuthStart(request, env);
    }

    if (url.pathname === '/api/auth/callback') {
      return handleAuthCallback(request, env);
    }

    if (url.pathname === '/api/admin-config') {
      return handleAdminConfig(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
