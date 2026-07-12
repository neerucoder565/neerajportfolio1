import { createFileRoute } from "@tanstack/react-router";
import { Panel, Section } from "@/components/SiteShell";
import { Award, Upload, Trash2, FileText, X, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const OWNER_EMAIL = "neerajmohan0410@gmail.com";
const BUCKET = "certificates";

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
  title: string;
  storage_path: string;
  mime_type: string;
  created_at: string;
  url: string;
};

function Certificates() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [preview, setPreview] = useState<Cert | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOwner = email?.toLowerCase() === OWNER_EMAIL;

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("certificates")
      .select("id,title,storage_path,mime_type,created_at")
      .order("created_at", { ascending: false });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    const rows: Cert[] = (data ?? []).map((r) => {
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(r.storage_path);
      return { ...r, url: pub.publicUrl };
    });
    setCerts(rows);
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
    });
    load();
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/certificates" },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || !isOwner) return;
    setUploading(true);
    setError(null);
    try {
      for (const f of Array.from(files)) {
        const ext = f.name.includes(".") ? f.name.split(".").pop() : "bin";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, f, { contentType: f.type, upsert: false });
        if (upErr) throw upErr;
        const { error: insErr } = await supabase.from("certificates").insert({
          title: f.name,
          storage_path: path,
          mime_type: f.type || "application/octet-stream",
        });
        if (insErr) {
          await supabase.storage.from(BUCKET).remove([path]);
          throw insErr;
        }
      }
      if (inputRef.current) inputRef.current.value = "";
      await load();
    } catch (e: any) {
      setError(e?.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const remove = async (c: Cert) => {
    if (!isOwner) return;
    await supabase.storage.from(BUCKET).remove([c.storage_path]);
    await supabase.from("certificates").delete().eq("id", c.id);
    await load();
  };

  return (
    <>
      <Section eyebrow="CREDENTIALS" title="Certificates">
        <div className="grid lg:grid-cols-3 gap-8">
          <Panel className="lg:col-span-1 h-fit">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <Award className="text-neon" size={24} strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-[0.25em] text-neon">
                  {isOwner ? "Upload" : "Overview"}
                </span>
              </div>
              {email && (
                <button
                  onClick={signOut}
                  className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-neon flex items-center gap-1"
                >
                  <LogOut size={12} /> Sign out
                </button>
              )}
            </div>

            {isOwner ? (
              <>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Add certificate images (PNG, JPG) or PDF files. Stored in Supabase Storage.
                </p>
                <label
                  className={`corners flex flex-col items-center justify-center gap-2 border border-dashed border-border hover:border-neon transition-colors cursor-pointer p-8 bg-background/40 ${uploading ? "opacity-50 pointer-events-none" : ""}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFiles(e.dataTransfer.files);
                  }}
                >
                  <Upload size={22} className="text-neon" />
                  <span className="text-sm">{uploading ? "Uploading..." : "Click or drop files"}</span>
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
              </>
            ) : (
              <>
                <div className="border border-border bg-background/40 p-5 mb-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-neon mb-2">
                    // Status
                  </div>
                  <div className="text-sm text-foreground">
                    {loading
                      ? "Loading..."
                      : certs.length === 0
                      ? "No uploads yet."
                      : `${certs.length} certificate${certs.length === 1 ? "" : "s"} uploaded.`}
                  </div>
                </div>
                {email ? (
                  <div className="text-[11px] text-muted-foreground leading-relaxed">
                    Signed in as <span className="text-foreground">{email}</span>. Uploads are restricted to the site owner.
                  </div>
                ) : (
                  <button
                    onClick={signIn}
                    className="w-full flex items-center justify-center gap-2 border border-border hover:border-neon hover:text-neon transition-colors px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    <svg width="14" height="14" viewBox="0 0 48 48" aria-hidden><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.6 6.3 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 12.5 24 12.5c3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.6 6.3 29.1 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/><path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.7 13-4.7l-6-5.1c-1.8 1.3-4.1 2-7 2-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.7 39 16.3 43.5 24 43.5z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2 3.7-3.7 5l6 5.1c-.4.4 6.4-4.7 6.4-14.1 0-1.2-.1-2.3-.4-3.5z"/></svg>
                    Sign in with Google
                  </button>
                )}
                <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
                  Only the site owner can add or remove certificates. Everyone can view them.
                </p>
              </>
            )}

            {error && (
              <div className="mt-4 text-[11px] text-red-400 break-words">{error}</div>
            )}
          </Panel>

          <div className="lg:col-span-2">
            {loading ? (
              <Panel>
                <div className="text-center py-10 text-muted-foreground text-sm">Loading...</div>
              </Panel>
            ) : certs.length === 0 ? (
              <Panel>
                <div className="text-center py-10 text-muted-foreground text-sm">No uploads yet.</div>
              </Panel>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {certs.map((c) => {
                  const isImg = c.mime_type.startsWith("image/");
                  return (
                    <Panel key={c.id} className="group">
                      <button
                        type="button"
                        onClick={() => isImg && setPreview(c)}
                        className="block w-full aspect-[4/3] bg-background/60 border border-border overflow-hidden mb-3"
                      >
                        {isImg ? (
                          <img
                            src={c.url}
                            alt={c.title}
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
                          <div className="text-sm truncate" title={c.title}>{c.title}</div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                            {new Date(c.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <a href={c.url} target="_blank" rel="noreferrer" className="text-xs text-neon hover:underline">
                            Open
                          </a>
                          {isOwner && (
                            <button
                              onClick={() => remove(c)}
                              className="text-muted-foreground hover:text-red-400 transition-colors"
                              aria-label="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
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
            src={preview.url}
            alt={preview.title}
            className="max-w-[90vw] max-h-[85vh] object-contain border border-border"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
