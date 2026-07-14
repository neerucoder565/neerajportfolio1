import { createFileRoute } from "@tanstack/react-router";
import { Panel, Section } from "@/components/SiteShell";
import { Award, Upload, Trash2, FileText, X, LogOut, Pencil, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase as supabaseTyped } from "@/integrations/supabase/client";
// The certificates table lives outside the generated Database types until the
// schema migration is applied in Supabase; cast the client for these queries.
const supabase = supabaseTyped as any;

const OWNER_EMAIL = "neerajmadan2006@gmail.com";
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
  note: string | null;
  url: string;
};

function Certificates() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [preview, setPreview] = useState<Cert | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isOwner = email?.toLowerCase() === OWNER_EMAIL;

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("certificates")
      .select("id,title,storage_path,mime_type,created_at,note")
      .order("created_at", { ascending: false });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    const rows: Cert[] = (data ?? []).map((r: any) => {
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(r.storage_path);
      return { ...r, note: r.note ?? null, url: pub.publicUrl };
    });
    setCerts(rows);
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: any) => {
      setEmail(data.session?.user?.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e: any, session: any) => {
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

  const startEdit = (c: Cert) => {
    setEditingId(c.id);
    setDraftNote(c.note ?? "");
  };

  const saveNote = async (c: Cert) => {
    if (!isOwner) return;
    const trimmed = draftNote.trim();
    const { error: err } = await supabase
      .from("certificates")
      .update({ note: trimmed.length ? trimmed : null })
      .eq("id", c.id);
    if (err) {
      setError(err.message);
      return;
    }
    setEditingId(null);
    setDraftNote("");
    await load();
  };

  return (
    <>
      <Section eyebrow="CREDENTIALS" title="Certificates">
        <div className="space-y-6">
          {isOwner && (
            <Panel>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <Award className="text-neon" size={22} strokeWidth={1.5} />
                  <span className="text-xs uppercase tracking-[0.25em] text-neon">Upload</span>
                </div>
                <button
                  onClick={signOut}
                  className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-neon flex items-center gap-1"
                >
                  <LogOut size={12} /> Sign out
                </button>
              </div>
              <label
                className={`corners flex flex-col items-center justify-center gap-2 border border-dashed border-border hover:border-neon transition-colors cursor-pointer p-6 bg-background/40 ${uploading ? "opacity-50 pointer-events-none" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFiles(e.dataTransfer.files);
                }}
              >
                <Upload size={20} className="text-neon" />
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
              {error && <div className="mt-3 text-[11px] text-red-400 break-words">{error}</div>}
            </Panel>
          )}

          {loading ? (
            <Panel>
              <div className="text-center py-10 text-muted-foreground text-sm">Loading...</div>
            </Panel>
          ) : certs.length === 0 ? (
            <Panel>
              <div className="text-center py-10 text-muted-foreground text-sm">No certificates uploaded yet.</div>
            </Panel>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certs.map((c) => {
                const isImg = c.mime_type.startsWith("image/");
                const editing = editingId === c.id;
                return (
                  <Panel key={c.id} className="group flex flex-col">
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

                    {/* Owner-editable notes below the certificate */}
                    <div className="mt-3 pt-3 border-t border-border/60">
                      {editing ? (
                        <div className="space-y-2">
                          <textarea
                            value={draftNote}
                            onChange={(e) => setDraftNote(e.target.value)}
                            rows={3}
                            placeholder="Add a short note about this certificate..."
                            className="w-full bg-background/60 border border-border focus:border-neon outline-none px-2 py-1.5 text-xs text-foreground resize-y"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => saveNote(c)}
                              className="inline-flex items-center gap-1 border border-neon text-neon px-2 py-1 text-[10px] uppercase tracking-[0.2em] hover:bg-neon hover:text-primary-foreground transition-colors"
                            >
                              <Check size={12} /> Save
                            </button>
                            <button
                              onClick={() => { setEditingId(null); setDraftNote(""); }}
                              className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-2">
                          {c.note ? (
                            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                              {c.note}
                            </p>
                          ) : (
                            <p className="text-[11px] italic text-muted-foreground/60">
                              {isOwner ? "No note yet." : ""}
                            </p>
                          )}
                          {isOwner && (
                            <button
                              onClick={() => startEdit(c)}
                              className="shrink-0 text-muted-foreground hover:text-neon transition-colors"
                              aria-label="Edit note"
                              title="Edit note"
                            >
                              <Pencil size={13} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </Panel>
                );
              })}
            </div>
          )}

          {/* Subtle owner sign-in link — visible only to a signed-out visitor */}
          {!email && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={signIn}
                className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 hover:text-neon transition-colors"
              >
                Owner sign-in
              </button>
            </div>
          )}
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
