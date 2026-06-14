# Decap CMS setup

This project hosts Decap CMS from the same Vercel deployment as the website.

## Admin URL

Production CMS URL:

```txt
https://www.naganamedia.com/admin
```

The CMS edits the GitHub repository directly. Blog content is still stored as markdown and images in this repo, so the existing static blog build flow remains intact.

## Content locations

```txt
Blog markdown files: _posts/*.md
CMS image uploads:  public/assets/blog/uploads/*
Public image URLs:  /assets/blog/uploads/*
```

Existing blog posts in `_posts` are visible/editable in the CMS because the `blogs` collection points to that folder.

## GitHub OAuth app

Create a GitHub OAuth App:

```txt
GitHub -> Settings -> Developer settings -> OAuth Apps -> New OAuth App
```

Use:

```txt
Application name: Nagana Media CMS
Homepage URL: https://www.naganamedia.com
Authorization callback URL: https://www.naganamedia.com/api/decap/callback?provider=github
```

Then add the generated credentials to Vercel environment variables.

## Vercel environment variables

Required:

```txt
GITHUB_CLIENT_ID=<GitHub OAuth app client id>
GITHUB_CLIENT_SECRET=<GitHub OAuth app client secret>
```

Recommended:

```txt
DECAP_CMS_SITE_URL=https://www.naganamedia.com
DECAP_CMS_GITHUB_SCOPE=repo,user
```

`DECAP_CMS_SITE_URL` keeps the OAuth callback stable even when Vercel preview URLs are used.

## Access model

CMS users should sign in with GitHub and need write access to the repository, or access through the owning GitHub organization/team.

The CMS is configured with:

```yml
publish_mode: editorial_workflow
```

So authors can save drafts, move content through review, and publish through the CMS workflow instead of directly editing raw markdown.

## Publishing flow

```txt
Team opens /admin
  -> signs in with GitHub
  -> creates/edits blog
  -> uploads images if needed
  -> publishes
  -> Decap commits markdown/images to GitHub
  -> Vercel auto-builds from the commit
  -> /blogs/[slug] is generated statically
```

## Important follow-up

The current `next-sitemap.config.cjs` still has a manually maintained `postDates` object. Now that blog publishing can happen from the CMS, that should be replaced with sitemap data derived from `_posts` or a native `src/app/sitemap.ts` route.
