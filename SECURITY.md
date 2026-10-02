# Security policy

## Reporting a vulnerability

Please do not report security issues in public issues, discussions or pull requests.

Report them privately through GitHub: open the repository's **Security** tab and choose
**Report a vulnerability**, or go directly to
<https://github.com/Suraj-kumar00/DevOps/security/advisories/new>.
If that is not available to you, email the maintainer at suraj.ukumar.p@gmail.com.

Include what you found, how to reproduce it, and the impact you expect. We aim to acknowledge
reports within 7 days and will keep you updated until the issue is resolved. With your permission,
we credit reporters in the advisory.

## Scope

- The website code in this repository: the Next.js app and its API routes (`/api/search`,
  `/api/mcp`, `/api/health`), the Markdown and `llms.txt` routes, and the newsletter form.
- The CI workflows in `.github/workflows` and the `Dockerfile`.

Mistakes in documentation content are not security issues; please use the
"Content is wrong or outdated" issue form for those.

## Supported versions

Only the latest version on the `main` branch is supported.
