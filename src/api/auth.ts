interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

export async function handleAuthStart(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider');

  if (provider !== 'github') {
    return new Response('Unsupported provider', { status: 400 });
  }

  const state = crypto.randomUUID();
  const scope = 'repo,user';
  const redirectUri = `${url.origin}/api/auth/callback`;

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', scope);
  authorizeUrl.searchParams.set('state', state);

  const cookie = [
    `sveltia-auth-state=${state}`,
    'Path=/api/auth',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Max-Age=600',
  ].join('; ');

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      'Set-Cookie': cookie,
    },
  });
}

export async function handleAuthCallback(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const cookieHeader = request.headers.get('Cookie') ?? '';
  const storedState = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('sveltia-auth-state='))
    ?.slice('sveltia-auth-state='.length);

  if (!code || !state || state !== storedState) {
    return renderResult('github', 'error', { message: 'Invalid state' });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  if (!tokenRes.ok) {
    return renderResult('github', 'error', { message: 'Token exchange failed' });
  }

  const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string };

  if (!tokenData.access_token) {
    return renderResult('github', 'error', { message: tokenData.error ?? 'No token' });
  }

  return renderResult('github', 'success', {
    provider: 'github',
    token: tokenData.access_token,
  });
}

function renderResult(provider: string, status: 'success' | 'error', payload: unknown): Response {
  const message = `authorization:${provider}:${status}:${JSON.stringify(payload)}`;
  const body = `<!doctype html><html><body><script>
    (function() {
      function send() {
        window.opener && window.opener.postMessage(${JSON.stringify(message)}, '*');
      }
      window.addEventListener('message', function (e) {
        if (e.data === 'authorizing:${provider}') send();
      }, false);
      send();
    })();
  </script></body></html>`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': 'sveltia-auth-state=; Path=/api/auth; Max-Age=0',
    },
  });
}
