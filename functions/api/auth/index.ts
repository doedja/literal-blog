interface Env {
  GITHUB_CLIENT_ID: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const provider = url.searchParams.get('provider');
  const siteId = url.searchParams.get('site_id');

  if (provider !== 'github') {
    return new Response('Unsupported provider', { status: 400 });
  }

  const state = crypto.randomUUID();
  const scope = 'repo,user';
  const redirectUri = `${url.origin}/api/auth/callback`;

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', context.env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', scope);
  authorizeUrl.searchParams.set('state', state);

  const cookie = [
    `sveltia-auth-state=${state}`,
    'Path=/api/auth',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=600`,
  ].join('; ');

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      'Set-Cookie': cookie,
    },
  });
};
