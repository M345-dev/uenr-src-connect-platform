# UENR SRC Connect

SRC Connect is an official-ready digital campus companion for the University of Energy and Natural Resources Student Representative Council.

It is organized around four student needs:

- timely, relevant campus information;
- a moderated campus community;
- trackable student support;
- visible student voice and SRC accountability.

## Product surfaces

- `/` — public website and product introduction
- `/connect` — responsive student experience with feed, community, support and voice modules
- `/admin` — publishing, moderation, support-case and accountability administration preview

The current deployment runs with realistic prototype records so the complete experience can be evaluated without exposing real student data. Interactive actions—including post moderation, support-case creation and voting—work in the browser session.

## Technology

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS 4
- shadcn/ui with Radix primitives
- Plus Jakarta Sans through `next/font`
- Supabase Auth and Postgres-ready clients
- Versioned Supabase migration with explicit grants and Row Level Security

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run check
```

## Connect Supabase

1. Create or select a Supabase project.
2. Copy `.env.example` to `.env.local` and add the Project URL and publishable key.
3. Link the CLI project:

   ```bash
   npx supabase login
   npx supabase link --project-ref <project-ref>
   ```

4. Review and apply the migration in `supabase/migrations`:

   ```bash
   npx supabase db push
   npx supabase db lint --linked --level error --fail-on error
   ```

The migration implements student profiles, administrative roles, verified organizations, targeted content, moderated community posts, interactions, reports, support cases, project milestones, consultations and verified votes. Every exposed table has explicit Data API grants and Row Level Security.

The frontend currently uses prototype records in `src/lib/mock-data.ts`. Replace those selectors with the prepared Supabase clients after a project is linked and institutional authentication rules are confirmed.

## Institutional launch checklist

- Confirm UENR student identity source and permitted email domain.
- Assign publisher, moderator, support officer and administrator roles.
- Configure production SMTP and approved authentication redirects.
- Verify support escalation standards and emergency contacts.
- Confirm media permissions for the official UENR images listed in `docs/IMAGE_SOURCES.md`.
- Complete privacy, retention and safeguarding review before accepting real support cases.

## Current verification

- ESLint passes without warnings.
- TypeScript and production compilation pass.
- Public, student and administration screens were checked in a browser at desktop and mobile sizes.
- Student support submission, voting and admin moderation were tested end-to-end in prototype mode.

`npm audit` currently reports two moderate findings in the version of PostCSS bundled inside Next.js. The advisory has no upstream fix available at the time of this build; review again before institutional launch.
