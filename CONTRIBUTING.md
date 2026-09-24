# Contributing

Thanks for helping build the DevOps Learning Hub. This file covers the development workflow.
The standards for writing pages live in the site itself:

- [Contributing](content/docs/%28start%29/contributing.mdx): ways to help and how a contribution gets published.
- [How pages are built](content/docs/%28start%29/page-template.mdx): the six-layer page template, the
  frontmatter contract and the available components.

Everyone taking part is expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Before you start

- **New page?** Open a "New topic" issue first, so two people do not write the same page.
- **Small fix?** Typos, broken links and outdated commands can go straight to a pull request.
- **Security issue?** Do not open a public issue; see [SECURITY.md](SECURITY.md).

## Local setup

You need Node.js 24 (see `.nvmrc`; Node 22.12 or newer also works) and npm.

```bash
git clone https://github.com/<your-username>/DevOps.git
cd DevOps
npm ci
npm run dev
```

The site runs at <http://localhost:3000>. Pages hot-reload as you edit `content/docs`.

Copy `.env.example` to `.env.local` only if you need to test the newsletter form or absolute URLs.
Every variable is optional.

## Scripts

| Command               | What it does                                                    |
| --------------------- | --------------------------------------------------------------- |
| `npm run dev`         | Development server with hot reload.                             |
| `npm run build`       | Production build. Also validates every page's frontmatter.      |
| `npm run check`       | Lint, type check, formatting check and unit tests.              |
| `npm run lint`        | [oxlint](https://oxc.rs/docs/guide/usage/linter).               |
| `npm run types:check` | Generates route types and runs `tsc`.                           |
| `npm run format`      | Formats code with Prettier (content in `content/` is excluded). |
| `npm test`            | Unit tests with Vitest.                                         |

Run `npm run check` and `npm run build` before opening a pull request; CI runs the same steps.

## Project structure

```text
app/                 Next.js routes: home, docs, blog, API, llms.txt, Open Graph images
components/          UI components (home page, docs page, MDX components)
content/docs/        Documentation pages, one folder per track
lib/                 Site config, content schema, data sources and helpers
lib/content/         Frontmatter schema, tracks, freshness and Markdown rendering (unit tested)
public/              Static assets
proxy.ts             Serves Markdown to AI agents (`/docs/<page>.md` and `Accept: text/markdown`)
```

Useful entry points:

- `lib/site.ts`: site name, repository and social links.
- `lib/content/schema.ts`: the frontmatter contract, enforced at build time.
- `content/docs/<track>/index.mdx`: a track overview and its roadmap (`planned` in the frontmatter).

## Commits and pull requests

- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages and
  pull request titles, for example `content: add GPU sharing page` or `fix: broken link in footer`.
  Allowed types: `feat`, `fix`, `docs`, `content`, `style`, `refactor`, `perf`, `test`, `build`,
  `ci`, `chore`. CI checks the pull request title.
- Sign off your commits to certify the [Developer Certificate of Origin](https://developercertificate.org/):
  `git commit -s`.
- Keep pull requests focused: one page or one fix per pull request is easiest to review.
- Fill in the pull request checklist. A maintainer reviews every change before it is merged.

## Dependencies

- Versions in `package.json` are pinned exactly and locked in `package-lock.json`.
- New releases are adopted after a 7-day cooldown (Dependabot is configured for this), unless
  they fix a security issue.
- Add a dependency only when it clearly pays for itself, and explain why in the pull request.

## License

By contributing, you agree that your content is published under
[CC BY 4.0](LICENSE-CONTENT) and your code under the [MIT License](LICENSE).
