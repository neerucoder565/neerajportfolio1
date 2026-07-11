import { createFileRoute } from "@tanstack/react-router";
import { Panel, Section } from "@/components/SiteShell";
import { Award, Upload, Trash2, FileText, X, Lock, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const OWNER_EMAIL = "neerajmohan0410@gmail.com";
const OWNER_KEY = "neeraj:owner";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — Neeraj K" },
      { name: "description", content: "Certificates and achievements in embedded systems, hardware, and firmware engineering." },
      { property: "og:title", content: "Certificates — Neeraj K" },
      { property: "og:description", content: "Uploaded certificates and credentials." },
    ],
  }),
  component: Certificates,
});

type Cert = {
  id: string;
  name: string;
  type: string;
  dataUrl: string;
  addedAt: number;
};

const STORAGE_KEY = "neeraj:certificates";

function Certificates() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [preview, setPreview] = useState<Cert | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCerts(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
    } catch {}
  }, [certs, hydrated]);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const readers = Array.from(files).map(
      (f) =>
        new Promise<Cert>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () =>
            resolve({
              id: crypto.randomUUID(),
              name: f.name,
              type: f.type,
              dataUrl: String(r.result),
              addedAt: Date.now(),
            });
          r.onerror = reject;
          r.readAsDataURL(f);
        })
    );
    const added = await Promise.all(readers);
    setCerts((c) => [...added, ...c]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (id: string) => setCerts((c) => c.filter((x) => x.id !== id));

  return (
    <>
      <Section eyebrow="CREDENTIALS" title="Certificates">
        <div className="grid lg:grid-cols-3 gap-8">
          <Panel className="lg:col-span-1 h-fit">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-neon" size={24} strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-[0.25em] text-neon">Upload</span>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Add certificate images (PNG, JPG) or PDF files. Stored locally in your browser.
            </p>
            <label
              className="corners flex flex-col items-center justify-center gap-2 border border-dashed border-border hover:border-neon transition-colors cursor-pointer p-8 bg-background/40"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFiles(e.dataTransfer.files);
              }}
            >
              <Upload size={22} className="text-neon" />
              <span className="text-sm">Click or drop files</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                PNG · JPG · PDF
              </span>
              <input
                ref={inputRef}
                type="file"
                accept="image/*,application/pdf"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>
            <div className="mt-5 text-xs text-muted-foreground">
              // {certs.length} certificate{certs.length === 1 ? "" : "s"} stored
            </div>
          </Panel>

          <div className="lg:col-span-2">
            {certs.length === 0 ? (
              <Panel>
                <div className="text-center py-10 text-muted-foreground text-sm">
                  No certificates yet. Upload your first one from the panel.
                </div>
              </Panel>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {certs.map((c) => {
                  const isImg = c.type.startsWith("image/");
                  return (
                    <Panel key={c.id} className="group">
                      <button
                        type="button"
                        onClick={() => isImg && setPreview(c)}
                        className="block w-full aspect-[4/3] bg-background/60 border border-border overflow-hidden mb-3"
                      >
                        {isImg ? (
                          <img
                            src={c.dataUrl}
                            alt={c.name}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <FileText size={32} className="text-neon" />
                            <span className="text-[10px] uppercase tracking-[0.25em]">PDF</span>
                          </div>
                        )}
                      </button>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm truncate" title={c.name}>
                            {c.name}
                          </div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                            {new Date(c.addedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={c.dataUrl}
                            download={c.name}
                            className="text-xs text-neon hover:underline"
                          >
                            Open
                          </a>
                          <button
                            onClick={() => remove(c.id)}
                            className="text-muted-foreground hover:text-red-400 transition-colors"
                            aria-label="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </Panel>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Section>

      {preview && (
        <div
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setPreview(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-neon"
            onClick={() => setPreview(null)}
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <img
            src={preview.dataUrl}
            alt={preview.name}
            className="max-w-[90vw] max-h-[85vh] object-contain border border-border"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
