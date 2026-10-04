# Ersel Metz Portfolio

This portfolio uses Next.js App Router and is configured for deployment on Vercel.

## Local development

Use Node.js 22 or newer (up to Node.js 24), then install dependencies and start the development server:

```sh
npm install
npm run dev
```

The site is available at `http://localhost:3000`. Production checks are `npm run typecheck` and `npm run build`; use `npm start` to run the built site locally.

## Pages and content

- `/` — Home
- `/about` — About, education, experience, and contact
- `/projects` — Project portfolio

The Home and Projects pages are implemented as React components. The Home page includes an AI-assisted, engineer-led workflow highlight. About page details, education, experience, and contact information render from `content/about.html`. Shared profile details, metadata, social links, and the sitemap use `data/profile-data.json`; project cards are maintained in `lib/projects.ts`.

Static images and other public files belong in `public/`. Add the resume as `public/resume/Ersel_Metz_Magbanua_Resume.pdf`; until it exists, the home page shows that the resume is unavailable rather than linking to a missing file.

## Environment variables

Copy `.env.example` to `.env.local` for local overrides. Configure the following variables in Vercel Project Settings before enabling EmailJS:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL used for canonical metadata, robots, and sitemap |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS browser public key |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |

The contact form stays disabled with an explanatory message until all three EmailJS values are configured. Only the EmailJS **Public Key** belongs in these browser-exposed variables. Never put the EmailJS Private Key in the app or repository; rotate it if it has been exposed. Configure allowed origins and abuse protections in EmailJS.

## Vercel

Import this repository into Vercel and use the detected Next.js framework settings. Vercel runs the `build` script automatically. Set `NEXT_PUBLIC_SITE_URL` and the EmailJS variables in the project settings, then redeploy.
