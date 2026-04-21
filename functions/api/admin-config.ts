interface Env {
  GITHUB_REPO: string;
  GITHUB_BRANCH?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const repo = context.env.GITHUB_REPO;
  const branch = context.env.GITHUB_BRANCH ?? 'main';

  if (!repo) {
    return new Response(JSON.stringify({ error: 'GITHUB_REPO env var not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const origin = new URL(context.request.url).origin;

  const postFields = [
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'description', label: 'Description', widget: 'string', required: false },
    { name: 'date', label: 'Date', widget: 'datetime' },
    { name: 'updated', label: 'Updated', widget: 'datetime', required: false },
    { name: 'draft', label: 'Draft', widget: 'boolean', default: true },
    { name: 'body', label: 'Body', widget: 'markdown' },
  ];

  const config = {
    backend: {
      name: 'github',
      repo,
      branch,
      base_url: origin,
      auth_endpoint: 'api/auth',
    },
    media_folder: 'public/images',
    public_folder: '/images',
    collections: [
      {
        name: 'life',
        label: 'Life',
        folder: 'src/content/posts/life',
        create: true,
        slug: '{{slug}}',
        extension: 'md',
        format: 'frontmatter',
        fields: postFields,
      },
      {
        name: 'finance',
        label: 'Finance',
        folder: 'src/content/posts/finance',
        create: true,
        slug: '{{slug}}',
        extension: 'md',
        format: 'frontmatter',
        fields: postFields,
      },
      {
        name: 'projects',
        label: 'Projects',
        folder: 'src/content/posts/projects',
        create: true,
        slug: '{{slug}}',
        extension: 'md',
        format: 'frontmatter',
        fields: postFields,
      },
      {
        name: 'pages',
        label: 'Pages',
        folder: 'src/content/pages',
        create: true,
        slug: '{{slug}}',
        extension: 'md',
        format: 'frontmatter',
        fields: [
          { name: 'title', label: 'Title', widget: 'string' },
          { name: 'body', label: 'Body', widget: 'markdown' },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(config), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-store',
    },
  });
};
