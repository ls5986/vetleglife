-- Idempotent creation of email_templates table
create table if not exists public.email_templates (
  key text primary key,
  subject text not null,
  html text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure initial templates exist (upsert by key)
insert into public.email_templates (key, subject, html)
values
  ('client_completion', 'Your application is complete', '<div>Thank you for completing your application.</div>'),
  ('rep_completion', 'New completed application received', '<div>A client completed their application.</div>')
on conflict (key) do update set
  subject = excluded.subject,
  html = excluded.html,
  updated_at = now();


