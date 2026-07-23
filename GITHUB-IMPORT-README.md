# CRM Solutions — GitHub Import

This package contains the source used by the live CRM Solutions site in ChatGPT Sites.

## Upload to the existing GitHub repository

1. Extract `crm-solutions-github-source.zip` on your computer.
2. Open the empty `crm-solutions` repository on GitHub.
3. Select **Add file → Upload files**.
4. Open the extracted `crm-solutions-github-source` folder and drag all its contents onto the GitHub upload page.
5. Enter the commit message `Import CRM Solutions source`.
6. Select **Commit changes**.

Keep the GitHub repository **Private** because the project contains backend and payment architecture.

## Important before Vercel

The current source was built for ChatGPT Sites and its Cloudflare-compatible runtime. The public pages and backend code are included, but the project still needs a Vercel/Supabase adaptation before production deployment. Do not add API keys to GitHub, source files, or `.env` files committed to the repository. Add them later in **Vercel → Project → Settings → Environment Variables**.

