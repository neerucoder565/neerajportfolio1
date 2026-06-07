import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Mail, Phone, Github, Linkedin, Send, Paperclip, X, Pencil } from "lucide-react";
import { Panel, Section } from "@/components/SiteShell";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void;
      send: (serviceId: string, templateId: string, params: Record<string, unknown>) => Promise<unknown>;
    };
  }
}

const EMAILJS_SERVICE_ID = "service_sprxe28";
const EMAILJS_TEMPLATE_ID = "template_u1nsr7c";
const EMAILJS_PUBLIC_KEY = "1F_8QdHWtlV2JcMMY";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Neeraj K" },
      { name: "description", content: "Get in touch with Neeraj K for hardware and embedded systems collaboration." },
      { property: "og:title", content: "Contact — Neeraj K" },
      { property: "og:description", content: "Email, LinkedIn, GitHub and direct message form." },
    ],
  }),
  component: Contact,
});

const OWNER_EMAIL = "neerajmadan2006@gmail.com";

const CHANNELS = [
  { icon: Mail, label: "Email", value: OWNER_EMAIL, href: `mailto:${OWNER_EMAIL}` },
  { icon: Phone, label: "Phone", value: "+91 88257 69448", href: "tel:+918825769448" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/neeraj-k-301386328", href: "https://www.linkedin.com/in/neeraj-k-301386328" },
  { icon: Github, label: "GitHub", value: "github.com/Neeraj0410", href: "https://github.com/Neeraj0410" },
];

function Contact() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [composeOpen, setComposeOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  const reset = () => {
    setFrom(""); setName(""); setSubject(""); setBody(""); setFiles([]); setStatus(null);
  };

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...picked].slice(0, 10));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const attachmentsLine = files.length
      ? `\n\nAttachments mentioned by sender:\n- ${files.map((f) => f.name).join("\n- ")}`
      : "";

    const message = `Subject: ${subject}\n\n${body}${attachmentsLine}`;

    if (typeof window === "undefined" || !window.emailjs) {
      setStatus({ type: "err", msg: "Email service not loaded. Please refresh and try again." });
      setSending(false);
      return;
    }

    window.emailjs.init(EMAILJS_PUBLIC_KEY);
    window.emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name,
        email: from,
        message,
      })
      .then(() => {
        setStatus({ type: "ok", msg: "Message sent successfully!" });
        reset();
        setTimeout(() => { setComposeOpen(false); setStatus(null); }, 1800);
      })
      .catch((err: unknown) => {
        console.error(err);
        setStatus({ type: "err", msg: "Failed to send. Please try again." });
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <Section eyebrow="TRANSMISSION" title="Open A Channel">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="corners relative flex items-center gap-4 border border-border bg-card/40 p-5 glow-border-hover group"
            >
              <div className="size-12 grid place-items-center border border-neon/50 text-neon group-hover:bg-neon group-hover:text-primary-foreground transition-colors">
                <c.icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] text-neon tracking-[0.3em]">{c.label.toUpperCase()}</div>
                <div className="text-sm">{c.value}</div>
              </div>
            </a>
          ))}
        </div>

        <Panel>
          <div className="text-xs text-neon tracking-[0.3em] mb-6">// SEND MESSAGE</div>
          <button
            type="button"
            onClick={() => setComposeOpen(true)}
            className="inline-flex items-center gap-2 bg-neon text-primary-foreground px-5 py-3 text-xs uppercase tracking-[0.25em] font-medium hover:opacity-90 transition"
          >
            <Pencil size={14} /> Compose
          </button>
        </Panel>
      </div>

      <Dialog open={composeOpen} onOpenChange={(o) => { setComposeOpen(o); if (!o) reset(); }}>
        <DialogContent className="max-w-2xl p-0 border border-neon/40 bg-card">
          <DialogHeader className="px-5 py-3 border-b border-border bg-background/60">
            <DialogTitle className="text-xs text-neon tracking-[0.3em] font-display uppercase">
              // New Message
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={onSend} className="flex flex-col">
            <div className="flex items-center gap-3 px-5 py-2 border-b border-border">
              <span className="text-[10px] text-neon tracking-[0.3em] w-16">FROM</span>
              <input
                type="email"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 px-5 py-2 border-b border-border">
              <span className="text-[10px] text-neon tracking-[0.3em] w-16">NAME</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 px-5 py-2 border-b border-border">
              <span className="text-[10px] text-neon tracking-[0.3em] w-16">TO</span>
              <span className="flex-1 text-sm text-muted-foreground">{OWNER_EMAIL}</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2 border-b border-border">
              <span className="text-[10px] text-neon tracking-[0.3em] w-16">SUBJECT</span>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>

            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              placeholder="Write your message..."
              className="bg-transparent px-5 py-4 text-sm resize-none focus:outline-none min-h-[220px]"
            />

            {files.length > 0 && (
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 border border-border bg-background/60 px-3 py-1.5 text-xs">
                    <Paperclip size={12} className="text-neon" />
                    <span className="max-w-[180px] truncate">{f.name}</span>
                    <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-foreground">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {status && (
              <div className={`px-5 py-2 text-xs ${status.type === "ok" ? "text-neon" : "text-destructive"}`}>
                {status.msg}
              </div>
            )}

            <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-background/60">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 bg-neon text-primary-foreground px-5 py-2.5 text-xs uppercase tracking-[0.25em] font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send"} <Send size={14} />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-neon/60 transition"
                title="Attach files"
              >
                <Paperclip size={14} /> Attach
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={onPickFiles}
                className="hidden"
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
