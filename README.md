# literal-blog

Minimal Astro blog with a built-in CMS at `/admin`, deployable to Cloudflare Pages in one click.

- Markdown posts in `src/content/posts/{category}/*.md`
- Pages in `src/content/pages/*.md`
- Sveltia CMS at `/admin`, logs in with GitHub, commits to your repo
- OAuth proxy runs as a Cloudflare Pages Function (no separate worker)

## Deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/doedja/literal-blog)

If you fork under a different username, update the button URL in this README to match.

### Setup

1. **Fork and deploy.** Click the button above. Cloudflare forks this repo to your GitHub and creates a Pages project.

2. **Register a GitHub OAuth app** at https://github.com/settings/developers → **New OAuth App**:
   - Homepage URL: `https://<your-pages-url>`
   - Authorization callback URL: `https://<your-pages-url>/api/auth/callback`

   Copy the Client ID. Generate a client secret and copy that too.

3. **Add environment variables** in Cloudflare Pages → your project → Settings → Environment variables. Set these on both Production and Preview:

   | Name | Value |
   |---|---|
   | `GITHUB_REPO` | `your-username/your-fork` |
   | `GITHUB_CLIENT_ID` | from step 2 |
   | `GITHUB_CLIENT_SECRET` | from step 2 |
   | `GITHUB_BRANCH` | `main` (optional, default) |

4. **Redeploy** (Deployments tab → Retry deployment on the latest). Then visit `/admin` and log in with GitHub.

## Local development

```bash
bun install
bun run dev
```

Edit posts in `src/content/posts/`, pages in `src/content/pages/`. Push to trigger a rebuild.

## Customize

- **Site metadata**: `site.config.ts`
- **Navigation**: `src/layouts/Base.astro`
- **Styles**: `src/styles/global.css`
- **Post template**: `src/layouts/Post.astro`
- **CMS collections**: `functions/api/admin-config.ts` — add fields or new categories here

## Add a category

1. Create `src/content/posts/<category>/` and drop markdown files in.
2. Add a matching collection entry in `functions/api/admin-config.ts`.
3. Push. The home page, archive, and RSS pick it up automatically.

## License

MIT
