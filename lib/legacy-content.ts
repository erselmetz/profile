import { readFileSync } from "node:fs";
import { join } from "node:path";
import { profile } from "./profile";

export function getAboutMarkup(): string {
  let markup = readFileSync(
    join(process.cwd(), "content", "about.html"),
    "utf8",
  );

  markup = markup.replace(
    /<a href="#" class="([^"]*email-link[^"]*)"/g,
    `<a href="mailto:${profile.personal.email}" class="$1"`,
  );
  markup = markup.replace(
    /<a href="#" class="([^"]*social-link[^"]*)" data-platform="([^"]+)"/g,
    (anchor, classes: string, platform: string) => {
      const url =
        platform === "facebook" || platform === "github" || platform === "linkedin"
          ? profile.social[platform]
          : undefined;
      return url
        ? `<a href="${url}" class="${classes}" data-platform="${platform}" rel="noopener noreferrer"`
        : anchor;
    },
  );

  if (
    !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
    !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  ) {
    markup = markup
      .replace('autocomplete="name" required>', 'autocomplete="name" required disabled>')
      .replace('autocomplete="email" required>', 'autocomplete="email" required disabled>')
      .replace('rows="5" required>', 'rows="5" required disabled>')
      .replace(
        'class="button button-primary">Send message',
        'class="button button-primary" disabled>Send message',
      )
      .replace(
        '<span class="message_status" role="status" aria-live="polite"></span>',
        `<span class="message_status" role="status" aria-live="polite">The contact form is not configured yet. Please email <a href="mailto:${profile.personal.email}">${profile.personal.email}</a>.</span>`,
      );
  }

  return markup;
}
