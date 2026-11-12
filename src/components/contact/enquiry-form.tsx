"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { validateField } from "@/lib/validation";

const TOPICS = ["A general question", "An upcoming booking", "Feedback on a clean", "Commercial or office cleaning"];
const MESSAGE_MAX = 800;

type Field = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<Field, string>>;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  const name = validateField("fullName", values.name);
  if (name) errors.name = name;
  const email = validateField("email", values.email);
  if (email) errors.email = email;
  if (values.phone.trim()) {
    const phone = validateField("phone", values.phone);
    if (phone) errors.phone = phone;
  }
  const msg = values.message.trim();
  if (msg.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  else if (msg.length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  return errors;
}

export function EnquiryForm() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", phone: "", message: "" });
  const [topic, setTopic] = useState(TOPICS[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (f: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [f]: e.target.value };
    setValues(next);
    if (errors[f]) setErrors(validate(next));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      document.getElementById(`enquiry-${first}`)?.focus();
      return;
    }
    setSending(true);
    // Demo only: nothing is sent anywhere.
    window.setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 700);
  };

  const inputClass = (f: Field) =>
    `w-full rounded-2xl border bg-cream/60 px-4 py-3.5 text-base text-ink placeholder:text-muted/70 transition-[border-color,box-shadow,background-color] duration-200 focus:bg-white focus:outline-none ${
      errors[f] ? "border-danger focus:shadow-[0_0_0_4px_rgb(180_67_47/0.15)]" : "border-line hover:border-ink/30 focus:border-ink focus:shadow-glow"
    }`;

  const error = (f: Field) =>
    errors[f] ? (
      <p id={`enquiry-${f}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-danger">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden /> {errors[f]}
      </p>
    ) : null;

  return (
    <div className="rounded-[2rem] border border-line bg-white p-6 shadow-soft sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center" role="status">
            <CheckCircle2 className="mx-auto h-12 w-12 text-sage" aria-hidden />
            <h3 className="mt-4 font-display text-2xl text-ink">Thanks, {values.name.trim().split(" ")[0]}!</h3>
            <p className="mx-auto mt-2 max-w-sm text-ink-soft">
              In a live version, our team would reply to <strong className="text-ink">{values.email.trim()}</strong> within one working day.
            </p>
            <p className="mx-auto mt-4 max-w-sm rounded-2xl bg-stone/70 p-3 text-xs text-muted">This is a demonstration — your message has not been sent or stored.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setValues({ name: "", email: "", phone: "", message: "" });
                }}
              >
                Send another message
              </Button>
              <ButtonLink href="/quote">
                Get an instant quote <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="font-display text-2xl text-ink">Send us a message</h3>
            <p className="mt-1 text-ink-soft">For prices, the instant quote is quickest — for anything else, we&apos;re here.</p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="enquiry-name" className="text-sm font-semibold text-ink">Name</label>
                <input id="enquiry-name" autoComplete="name" value={values.name} onChange={set("name")} className={`mt-2 h-[3.25rem] ${inputClass("name")}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? "enquiry-name-error" : undefined} />
                {error("name")}
              </div>
              <div>
                <label htmlFor="enquiry-email" className="text-sm font-semibold text-ink">Email</label>
                <input id="enquiry-email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={set("email")} className={`mt-2 h-[3.25rem] ${inputClass("email")}`} aria-invalid={!!errors.email} aria-describedby={errors.email ? "enquiry-email-error" : undefined} />
                {error("email")}
              </div>
              <div>
                <label htmlFor="enquiry-phone" className="text-sm font-semibold text-ink">
                  Phone <span className="font-normal text-muted">(optional)</span>
                </label>
                <input id="enquiry-phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} className={`mt-2 h-[3.25rem] ${inputClass("phone")}`} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "enquiry-phone-error" : undefined} />
                {error("phone")}
              </div>
              <div>
                <label htmlFor="enquiry-topic" className="text-sm font-semibold text-ink">I&apos;m getting in touch about</label>
                <select id="enquiry-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="mt-2 h-[3.25rem] w-full rounded-2xl border border-line bg-cream/60 px-4 text-base text-ink focus:border-ink focus:bg-white focus:shadow-glow focus:outline-none">
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="enquiry-message" className="flex justify-between text-sm font-semibold text-ink">
                  Message <span className="text-xs font-normal text-muted">{values.message.length}/{MESSAGE_MAX}</span>
                </label>
                <textarea id="enquiry-message" rows={5} value={values.message} onChange={set("message")} className={`mt-2 min-h-32 resize-y ${inputClass("message")}`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "enquiry-message-error" : undefined} />
                {error("message")}
              </div>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2 text-xs text-muted">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> Demo form — nothing is sent or stored.
              </p>
              <Button type="submit" size="lg" disabled={sending} aria-busy={sending}>
                {sending ? "Sending…" : "Send message"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
