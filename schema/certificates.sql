-- Run this in the Supabase SQL Editor (once) to enable the Certificates feature.
-- Dashboard: https://supabase.com/dashboard/project/qgjktmxzwwrqppoyvssc/sql

-- 1. Metadata table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  storage_path TEXT NOT NULL UNIQUE,
  mime_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.certificates TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view certificates" ON public.certificates;
CREATE POLICY "Anyone can view certificates"
  ON public.certificates FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Owner can insert certificates" ON public.certificates;
CREATE POLICY "Owner can insert certificates"
  ON public.certificates FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'neerajmohan0410@gmail.com');

DROP POLICY IF EXISTS "Owner can update certificates" ON public.certificates;
CREATE POLICY "Owner can update certificates"
  ON public.certificates FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'neerajmohan0410@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'neerajmohan0410@gmail.com');

DROP POLICY IF EXISTS "Owner can delete certificates" ON public.certificates;
CREATE POLICY "Owner can delete certificates"
  ON public.certificates FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'neerajmohan0410@gmail.com');

-- 2. Storage bucket (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

-- 3. Storage policies
DROP POLICY IF EXISTS "Public read of certificate files" ON storage.objects;
CREATE POLICY "Public read of certificate files"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'certificates');

DROP POLICY IF EXISTS "Owner can upload certificate files" ON storage.objects;
CREATE POLICY "Owner can upload certificate files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'certificates'
    AND (auth.jwt() ->> 'email') = 'neerajmohan0410@gmail.com'
  );

DROP POLICY IF EXISTS "Owner can update certificate files" ON storage.objects;
CREATE POLICY "Owner can update certificate files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'certificates'
    AND (auth.jwt() ->> 'email') = 'neerajmohan0410@gmail.com'
  )
  WITH CHECK (
    bucket_id = 'certificates'
    AND (auth.jwt() ->> 'email') = 'neerajmohan0410@gmail.com'
  );

DROP POLICY IF EXISTS "Owner can delete certificate files" ON storage.objects;
CREATE POLICY "Owner can delete certificate files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'certificates'
    AND (auth.jwt() ->> 'email') = 'neerajmohan0410@gmail.com'
  );
