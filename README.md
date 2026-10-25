# Syncly

Syncly is a team workspace application for organizing projects, tasks, documents, and members. It is in early development: authentication and the shared workspace layout are implemented, with collaboration features still being built.

The application currently runs in [`frontend/`](frontend) using Next.js for both the UI and authentication API. [`backend/`](backend) is a placeholder and has no separate service to run.

## Current features

- Email and password signup, login, and logout with Better Auth and SQLite.
- Session checks that redirect unauthenticated workspace visitors to `/login`.
- A dashboard that greets the signed-in user.
- A responsive, collapsible sidebar with workspace navigation and a sample workspace switcher.
- Light, dark, and system themes. Press `D` outside an input to switch between light and dark mode.

The project, task, document, and member pages are placeholders. Workspace creation, persistent workspace switching, search, account settings, social sign-in, and password recovery are not implemented yet; their visible controls are UI scaffolding.

## Tech stack

| Area | Technology |
| --- | --- |
| Application | Next.js 16 App Router, React 19, TypeScript |
| Styling and components | Tailwind CSS 4, shadcn/ui, React Aria Components |
| Icons | Lucide React, React Icons |
| Authentication | Better Auth with email and password |
| Database | SQLite through `better-sqlite3` |
| Themes | `@wrksz/themes` |
| Tooling | pnpm, ESLint, Prettier |

## Local setup

### 1. Prepare dependencies

Install Node.js 22 or newer (`better-sqlite3` requires it) and pnpm 10.26 or newer, which supports the repository's `allowBuilds` configuration. From the repository root:

```sh
cd frontend
```

In [`frontend/pnpm-workspace.yaml`](frontend/pnpm-workspace.yaml), change the existing `better-sqlite3: false` entry under `allowBuilds` to `better-sqlite3: true`, preserving the other entries. This allows the native SQLite dependency to install its binary. See pnpm's [build settings](https://github.com/pnpm/pnpm/blob/main/pnpm/docs/settings/build.md#allowbuilds).

Then install the locked dependencies:

```sh
pnpm install --frozen-lockfile
```

If dependencies were already installed with SQLite builds disabled, run `pnpm rebuild better-sqlite3` after changing the setting.

### 2. Configure the environment

Copy [`frontend/.env.example`](frontend/.env.example) to `frontend/.env`. From inside `frontend/`, use:

```sh
cp .env.example .env
```

On Windows PowerShell, use `Copy-Item .env.example .env`. Keep an existing `.env` if you have already configured one.

Generate a secret:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Set these values in `.env`:

| Variable | Value |
| --- | --- |
| `BETTER_AUTH_SECRET` | The generated secret, replacing the example placeholder |
| `BETTER_AUTH_URL` | `http://localhost:3005` for local development |

The `.env` file and local database files are ignored by Git.

### 3. Initialize authentication tables

From `frontend/`, run the [Better Auth migration command](https://better-auth.com/docs/concepts/cli#migrate):

```sh
pnpm dlx auth@latest migrate --config ./lib/auth.ts
```

Review and confirm the migration prompt. The authentication configuration opens `auth.db` relative to the working directory, so running this command from `frontend/` creates and initializes `frontend/auth.db`. Creating the database file alone does not create the required tables.

### 4. Start the app

```sh
pnpm dev
```

Open [http://localhost:3005](http://localhost:3005). Visit `/signup` to create an account, or `/login` to sign in. Successful authentication redirects to `/dashboard`.

## Commands

Run all commands from `frontend/`.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server on port 3005 |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build on Next.js's default port, 3000 |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Check TypeScript types without emitting JavaScript |
| `pnpm format` | Format TypeScript and TSX files with Prettier |

To run a production build locally with the same URL as the example environment:

```sh
pnpm build
pnpm start --port 3005
```

For another host or port, set `BETTER_AUTH_URL` to the URL serving the app. The current SQLite setup needs a writable, persistent filesystem for `auth.db`.

## Routes

| Route | Current behavior |
| --- | --- |
| `/` | Landing page |
| `/signup` | Email and password registration |
| `/login` | Email and password login |
| `/dashboard` | Signed-in greeting and workspace creation placeholder |
| `/my-tasks`, `/projects`, `/tasks`, `/documents`, `/members` | Workspace layout with placeholder page content |
| `/api/auth/*` | Better Auth endpoints |

The dashboard and other workspace pages use a shared sidebar that checks the session before rendering.

## Project structure

```text
Syncly/
|-- frontend/
|   |-- app/
|   |   |-- (workspace)/     # Shared layout and workspace pages
|   |   |-- api/auth/       # Better Auth route handlers
|   |   |-- login/          # Login page
|   |   `-- signup/         # Registration page
|   |-- components/        # Forms, navigation, themes, and UI components
|   |-- hooks/             # Shared React hooks
|   |-- lib/               # Authentication configuration and utilities
|   |-- .env.example       # Environment variable template
|   `-- package.json       # Dependencies and scripts
|-- backend/               # Placeholder for future backend work
`-- LICENSE
```

## License

Released under the [MIT License](LICENSE).
