# literal-blog

Minimal Astro blog with a built-in CMS at `/admin`, deployable to Cloudflare in one click.

> This is the theme powering **[doedja.com](https://doedja.com)**. The private blog is kept in a separate repo; this is the stripped, generic version.

- Markdown posts in `src/content/posts/{category}/*.md`
- Pages in `src/content/pages/*.md`
- Sveltia CMS at `/admin`, logs in with GitHub, commits to your repo
- Runs as a single Cloudflare Worker with static assets — no separate worker for OAuth

## Deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/doedja/literal-blog)

If you fork under a different username, update the button URL in your README to match.

### Setup

1. **Fork and deploy.** Click the button above. Cloudflare forks this repo to your GitHub and creates a Worker project. The first build runs `bun run build` automatically.

2. **Register a GitHub OAuth app** at https://github.com/settings/developers → **New OAuth App**:
   - Homepage URL: `https://<your-worker-url>`
   - Authorization callback URL: `https://<your-worker-url>/api/auth/callback`

   Copy the Client ID. Generate a client secret and copy that too.

3. **Add environment variables** in Cloudflare → your Worker → Settings → Variables and Secrets:

   | Name | Value | Type |
   |---|---|---|
   | `GITHUB_REPO` | `your-username/your-fork` | plaintext |
   | `GITHUB_BRANCH` | `main` (optional) | plaintext |
   | `GITHUB_CLIENT_ID` | from step 2 | secret |
   | `GITHUB_CLIENT_SECRET` | from step 2 | secret |

4. **Redeploy** (Deployments tab → latest → Retry). Then visit `/admin` and log in with GitHub.

## Local development

```bash
bun install
bun run dev           # Astro dev server (no worker routes)
bun run dev:worker    # Full worker + assets via wrangler
```

For `/admin` to work locally you also need a `.dev.vars` file with the env vars. See `.env.example`.

Edit posts in `src/content/posts/`, pages in `src/content/pages/`. Push to trigger a rebuild.

## Customize

- **Site metadata**: `site.config.ts`
- **Navigation**: `src/layouts/Base.astro`
- **Styles**: `src/styles/global.css`
- **Post template**: `src/layouts/Post.astro`
- **CMS collections**: `src/api/admin-config.ts` — add fields or new categories here

## Add a category

1. Create `src/content/posts/<category>/` and drop markdown files in.
2. Add a matching collection entry in `src/api/admin-config.ts`.
3. Push. The home page, archive, and RSS pick it up automatically.

## License

MIT
