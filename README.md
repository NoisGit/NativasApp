# NativasApp

NativasApp is a modern recruitment landing page for a roller derby team. The goal is to present the team, share news, explain how to join, and receive applications through a polished frontend experience.

## Project status

This project is being rebuilt as a portfolio-ready MVP.

Current focus:

- Modern landing page.
- Recruitment application flow.
- Team news section.
- Supabase integration.
- GitHub Pages deployment.
- Clean documentation and frontend best practices.

## Tech stack

- React
- Vite
- Tailwind CSS
- React Router
- Supabase, planned for the MVP backend
- TypeScript, planned as a progressive migration

## Requirements

This is a frontend project, so it does not use `requirements.txt`. Python projects usually use that file. This app uses `package.json` and `package-lock.json` to manage dependencies.

Recommended tools:

- Node.js 20
- npm

If you use nvm:

```bash
nvm use
```

## Environment variables

Create a `.env` file using `.env.example` as reference:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Do not commit real environment values.

## Local setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Run lint:

```bash
npm run lint
```

## Quality checks

Pull requests to `develop` and `main` run a CI workflow with:

- dependency installation
- lint
- production build

## Branch workflow

- `main`: stable production branch.
- `develop`: integration branch.
- Feature branches must be created from `develop`.
- Pull requests must target `develop`.
- Production changes move from `develop` to `main` only after review and validation.

## Naming rules

- Branch names: English.
- Pull request titles: English.
- Commit messages: English.
- GitHub issues/tasks: Spanish.

## Suggested branch naming

```txt
feature/short-description
fix/short-description
chore/short-description
refactor/short-description
```

## Roadmap

- [ ] Normalize branch workflow.
- [ ] Define final frontend architecture.
- [ ] Set up Supabase.
- [ ] Build modern landing page.
- [ ] Create recruitment application form.
- [ ] Add team news section.
- [ ] Add admin MVP.
- [ ] Configure GitHub Pages.
- [ ] Add CI and tests.
- [ ] Polish responsive design and accessibility.

## Deployment

The app is prepared to deploy with GitHub Pages through GitHub Actions.

### GitHub Pages setup

1. Open repository settings.
2. Go to Pages.
3. Set source to GitHub Actions.
4. Add repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
5. Merge validated production changes into `main`.
6. The deploy workflow will build the app and publish the `dist` folder.

The Vite base path is configured for:

```txt
/NativasApp/
```
