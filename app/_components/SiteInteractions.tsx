"use client";

import emailjs from "@emailjs/browser";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";

type EmailConfiguration = {
  publicKey?: string;
  serviceId?: string;
  templateId?: string;
};

type ImagePreview = {
  alt: string;
  src: string;
} | null;

export function SiteInteractions({
  emailConfiguration,
}: {
  emailConfiguration: EmailConfiguration;
}) {
  const [imagePreview, setImagePreview] = useState<ImagePreview>(null);
  const pathname = usePathname();
  const isEmailConfigured = Boolean(
    emailConfiguration.publicKey &&
      emailConfiguration.serviceId &&
      emailConfiguration.templateId,
  );

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".profile-name").forEach((element) => {
      element.textContent = profile.personal.name;
    });
    document.querySelectorAll<HTMLElement>(".profile-location").forEach((element) => {
      element.textContent = profile.personal.location;
    });
    document.querySelectorAll<HTMLElement>(".profile-profession").forEach((element) => {
      element.textContent = profile.personal.profession;
    });
    document.querySelectorAll<HTMLElement>(".email-text").forEach((element) => {
      element.textContent = profile.personal.email;
    });
    document.querySelectorAll<HTMLAnchorElement>(".email-link").forEach((link) => {
      link.href = `mailto:${profile.personal.email}`;
    });
    document.querySelectorAll<HTMLAnchorElement>(".social-link[data-platform]").forEach((link) => {
      const platform = link.dataset.platform;
      const url =
        platform === "facebook" || platform === "github" || platform === "linkedin"
          ? profile.social[platform]
          : undefined;
      if (url) {
        link.href = url;
        link.rel = "noopener noreferrer";
      }
    });

    const contactForm = document.forms.namedItem("sendEmail");
    const status = contactForm?.querySelector<HTMLElement>(".message_status");
    const formControls = contactForm?.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement
    >("input, textarea, button");

    if (contactForm && status && formControls) {
      if (!isEmailConfigured) {
        status.textContent = "The contact form is not configured yet. Please email me directly.";
        formControls.forEach((control) => {
          control.disabled = true;
        });
      }

      const submitContactForm = async (event: SubmitEvent) => {
        event.preventDefault();
        const { publicKey, serviceId, templateId } = emailConfiguration;
        if (!publicKey || !serviceId || !templateId) {
          status.textContent = "The contact form is not configured yet. Please email me directly.";
          return;
        }
        if (!contactForm.reportValidity()) {
          return;
        }

        const formData = new FormData(contactForm);
        const submitButton =
          contactForm.querySelector<HTMLButtonElement>('button[type="submit"]');

        if (submitButton) {
          submitButton.disabled = true;
        }
        status.textContent = "Sending your message...";

        try {
          await emailjs.send(
            serviceId,
            templateId,
            {
              title: "Portfolio message",
              name: String(formData.get("from_name") ?? ""),
              email: String(formData.get("from_email") ?? ""),
              message: String(formData.get("message") ?? ""),
              time: new Date().toLocaleString(),
            },
            publicKey,
          );
          contactForm.reset();
          status.textContent = "Your message was sent successfully.";
        } catch (error) {
          console.error("EmailJS failed to send the contact message.", error);
          status.textContent = "Unable to send your message right now. Please email me directly.";
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
          }
        }
      };

      contactForm.addEventListener("submit", submitContactForm);
      return () => {
        contactForm.removeEventListener("submit", submitContactForm);
      };
    }
  }, [
    isEmailConfigured,
    pathname,
    emailConfiguration.publicKey,
    emailConfiguration.serviceId,
    emailConfiguration.templateId,
  ]);

  useEffect(() => {
    function handleImageClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof HTMLImageElement) || !target.matches("img.image")) {
        return;
      }
      setImagePreview({ src: target.src, alt: target.alt || "Project image" });
    }

    document.addEventListener("click", handleImageClick);
    return () => document.removeEventListener("click", handleImageClick);
  }, []);

  return (
    <>
      <div className="site-interactions" aria-hidden="true" />
      {imagePreview && (
        <div
          className="imageShowModal w3-modal"
          role="dialog"
          aria-modal="true"
          aria-label={imagePreview.alt}
          style={{ display: "block" }}
          onClick={() => setImagePreview(null)}
        >
          <div
            className="w3-modal-content w3-animate-zoom"
            style={{ maxWidth: "90%", marginTop: 50 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="w3-container w3-black">
              <button
                className="w3-button w3-display-topright"
                type="button"
                aria-label="Close image preview"
                onClick={() => setImagePreview(null)}
              >
                &times;
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="imageShow" src={imagePreview.src} alt={imagePreview.alt} style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
