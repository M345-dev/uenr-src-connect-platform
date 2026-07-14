create extension if not exists pgcrypto with schema extensions;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create type public.admin_role as enum ('publisher', 'moderator', 'support_officer', 'project_manager', 'administrator');
create type public.content_kind as enum ('announcement', 'event', 'opportunity', 'deadline');
create type public.author_kind as enum ('official', 'organization', 'student');
create type public.moderation_status as enum ('pending', 'approved', 'rejected', 'removed');
create type public.case_status as enum ('received', 'in_review', 'assigned', 'resolved');
create type public.project_status as enum ('planning', 'in_progress', 'completed');

create table public.student_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 100),
  student_number text unique,
  campus text not null default 'Sunyani',
  school text,
  level smallint check (level in (100, 200, 300, 400, 500, 600)),
  avatar_url text,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.admin_role not null,
  granted_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  initials text not null,
  description text,
  logo_url text,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  can_publish boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  kind public.content_kind not null,
  title text not null check (char_length(title) between 4 and 140),
  body text not null,
  media_url text,
  priority smallint not null default 0 check (priority between 0 and 2),
  campus text,
  school text,
  level smallint,
  starts_at timestamptz,
  expires_at timestamptz,
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  author_type public.author_kind not null,
  category text not null,
  title text not null check (char_length(title) between 4 and 100),
  body text not null check (char_length(body) between 4 and 3000),
  media_url text,
  status public.moderation_status not null default 'pending',
  moderation_note text,
  moderated_by uuid references auth.users(id) on delete set null,
  moderated_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (author_type = 'organization' and organization_id is not null)
    or (author_type <> 'organization' and author_id is not null)
  )
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 1000),
  status public.moderation_status not null default 'approved',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.post_interactions (
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('like', 'bookmark')),
  created_at timestamptz not null default now(),
  primary key (post_id, user_id, kind)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  post_id uuid references public.community_posts(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  reason text not null,
  status text not null default 'open' check (status in ('open', 'reviewing', 'closed')),
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  check ((post_id is not null)::integer + (comment_id is not null)::integer = 1)
);

create table public.support_cases (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  reporter_id uuid not null references auth.users(id) on delete restrict,
  category text not null check (category in ('academic', 'welfare', 'security', 'facilities')),
  title text not null check (char_length(title) between 4 and 120),
  details text not null,
  location text,
  protect_identity boolean not null default false,
  status public.case_status not null default 'received',
  assigned_role public.admin_role,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.support_case_events (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.support_cases(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  status public.case_status not null,
  public_message text,
  internal_note text,
  created_at timestamptz not null default now()
);

create table public.src_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  owner text not null,
  status public.project_status not null default 'planning',
  progress smallint not null default 0 check (progress between 0 and 100),
  evidence_url text,
  published boolean not null default false,
  administration_year text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.src_projects(id) on delete cascade,
  label text not null,
  completed boolean not null default false,
  evidence_url text,
  completed_at timestamptz,
  sort_order smallint not null default 0
);

create table public.consultations (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  description text not null,
  campus text,
  school text,
  level smallint,
  opens_at timestamptz not null,
  closes_at timestamptz not null,
  published boolean not null default false,
  outcome text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (closes_at > opens_at)
);

create table public.consultation_options (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid not null references public.consultations(id) on delete cascade,
  label text not null,
  sort_order smallint not null default 0
);

create table public.consultation_votes (
  consultation_id uuid not null references public.consultations(id) on delete cascade,
  option_id uuid not null references public.consultation_options(id) on delete cascade,
  voter_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (consultation_id, voter_id)
);

create index content_items_published_idx on public.content_items (published_at desc) where published_at is not null;
create index content_items_targeting_idx on public.content_items (campus, school, level);
create index community_posts_status_published_idx on public.community_posts (status, published_at desc);
create index community_posts_author_idx on public.community_posts (author_id);
create index comments_post_idx on public.comments (post_id, created_at);
create index reports_status_idx on public.reports (status, created_at);
create index support_cases_reporter_idx on public.support_cases (reporter_id, created_at desc);
create index support_cases_status_idx on public.support_cases (status, assigned_role);
create index support_case_events_case_idx on public.support_case_events (case_id, created_at);
create index projects_year_idx on public.src_projects (administration_year, published);
create index consultation_votes_option_idx on public.consultation_votes (option_id);

create or replace function private.has_admin_role(required_roles public.admin_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and exists (
    select 1
    from public.admin_roles
    where user_id = (select auth.uid())
      and role = any(required_roles)
  );
$$;

revoke all on function private.has_admin_role(public.admin_role[]) from public;
grant usage on schema private to authenticated;
grant execute on function private.has_admin_role(public.admin_role[]) to authenticated;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger student_profiles_updated_at before update on public.student_profiles for each row execute function private.set_updated_at();
create trigger content_items_updated_at before update on public.content_items for each row execute function private.set_updated_at();
create trigger community_posts_updated_at before update on public.community_posts for each row execute function private.set_updated_at();
create trigger comments_updated_at before update on public.comments for each row execute function private.set_updated_at();
create trigger support_cases_updated_at before update on public.support_cases for each row execute function private.set_updated_at();
create trigger projects_updated_at before update on public.src_projects for each row execute function private.set_updated_at();
create trigger consultations_updated_at before update on public.consultations for each row execute function private.set_updated_at();

alter table public.student_profiles enable row level security;
alter table public.admin_roles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.content_items enable row level security;
alter table public.community_posts enable row level security;
alter table public.comments enable row level security;
alter table public.post_interactions enable row level security;
alter table public.reports enable row level security;
alter table public.support_cases enable row level security;
alter table public.support_case_events enable row level security;
alter table public.src_projects enable row level security;
alter table public.project_milestones enable row level security;
alter table public.consultations enable row level security;
alter table public.consultation_options enable row level security;
alter table public.consultation_votes enable row level security;

grant select, insert, update on public.student_profiles to authenticated;
grant select on public.organizations to anon, authenticated;
grant select on public.content_items to anon, authenticated;
grant select, insert, update on public.community_posts to authenticated;
grant select on public.community_posts to anon;
grant select, insert, update on public.comments to authenticated;
grant select on public.comments to anon;
grant select, insert, delete on public.post_interactions to authenticated;
grant insert, select on public.reports to authenticated;
grant insert, select on public.support_cases to authenticated;
grant select on public.support_case_events to authenticated;
grant select on public.src_projects, public.project_milestones to anon, authenticated;
grant select on public.consultations, public.consultation_options to anon, authenticated;
grant insert, select on public.consultation_votes to authenticated;
grant select, insert, update, delete on public.admin_roles, public.organization_members to authenticated;
grant insert, update, delete on public.organizations, public.content_items, public.reports, public.support_cases, public.support_case_events, public.src_projects, public.project_milestones, public.consultations, public.consultation_options to authenticated;

create policy "Students read own profile" on public.student_profiles for select to authenticated using ((select auth.uid()) = id or (select private.has_admin_role(array['administrator']::public.admin_role[])));
create policy "Students create own profile" on public.student_profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy "Students update own profile" on public.student_profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "Administrators read roles" on public.admin_roles for select to authenticated using ((select private.has_admin_role(array['administrator']::public.admin_role[])));
create policy "Administrators manage roles" on public.admin_roles for all to authenticated using ((select private.has_admin_role(array['administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['administrator']::public.admin_role[])));

create policy "Organizations are public" on public.organizations for select to anon, authenticated using (verified_at is not null);
create policy "Administrators manage organizations" on public.organizations for all to authenticated using ((select private.has_admin_role(array['administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['administrator']::public.admin_role[])));
create policy "Members read own memberships" on public.organization_members for select to authenticated using (user_id = (select auth.uid()) or (select private.has_admin_role(array['administrator']::public.admin_role[])));
create policy "Administrators manage memberships" on public.organization_members for all to authenticated using ((select private.has_admin_role(array['administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['administrator']::public.admin_role[])));

create policy "Published content is public" on public.content_items for select to anon, authenticated using (published_at is not null and published_at <= now() and (expires_at is null or expires_at > now()));
create policy "Publishers manage content" on public.content_items for all to authenticated using ((select private.has_admin_role(array['publisher','administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['publisher','administrator']::public.admin_role[])));

create policy "Approved community posts are public" on public.community_posts for select to anon, authenticated using (status = 'approved' and published_at is not null);
create policy "Students read own submissions" on public.community_posts for select to authenticated using (author_id = (select auth.uid()));
create policy "Students submit pending posts" on public.community_posts for insert to authenticated with check (author_id = (select auth.uid()) and author_type = 'student' and status = 'pending');
create policy "Students edit own pending posts" on public.community_posts for update to authenticated using (author_id = (select auth.uid()) and status = 'pending') with check (author_id = (select auth.uid()) and author_type = 'student' and status = 'pending');
create policy "Verified organizations publish" on public.community_posts for insert to authenticated with check (author_type = 'organization' and status = 'approved' and exists (select 1 from public.organization_members where organization_id = community_posts.organization_id and user_id = (select auth.uid()) and can_publish));
create policy "Moderators manage posts" on public.community_posts for all to authenticated using ((select private.has_admin_role(array['moderator','publisher','administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['moderator','publisher','administrator']::public.admin_role[])));

create policy "Approved comments are public" on public.comments for select to anon, authenticated using (status = 'approved');
create policy "Students comment as themselves" on public.comments for insert to authenticated with check (author_id = (select auth.uid()) and status = 'approved' and exists (select 1 from public.community_posts where id = comments.post_id and status = 'approved'));
create policy "Students edit own comments" on public.comments for update to authenticated using (author_id = (select auth.uid())) with check (author_id = (select auth.uid()));
create policy "Moderators manage comments" on public.comments for all to authenticated using ((select private.has_admin_role(array['moderator','administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['moderator','administrator']::public.admin_role[])));

create policy "Students manage own interactions" on public.post_interactions for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "Students submit reports" on public.reports for insert to authenticated with check (reporter_id = (select auth.uid()));
create policy "Students read own reports" on public.reports for select to authenticated using (reporter_id = (select auth.uid()) or (select private.has_admin_role(array['moderator','administrator']::public.admin_role[])));
create policy "Moderators manage reports" on public.reports for all to authenticated using ((select private.has_admin_role(array['moderator','administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['moderator','administrator']::public.admin_role[])));

create policy "Students create own support cases" on public.support_cases for insert to authenticated with check (reporter_id = (select auth.uid()) and status = 'received');
create policy "Students read own support cases" on public.support_cases for select to authenticated using (reporter_id = (select auth.uid()) or (select private.has_admin_role(array['support_officer','administrator']::public.admin_role[])));
create policy "Support officers manage cases" on public.support_cases for update to authenticated using ((select private.has_admin_role(array['support_officer','administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['support_officer','administrator']::public.admin_role[])));
create policy "Students read public case events" on public.support_case_events for select to authenticated using ((internal_note is null and exists (select 1 from public.support_cases where id = support_case_events.case_id and reporter_id = (select auth.uid()))) or (select private.has_admin_role(array['support_officer','administrator']::public.admin_role[])));
create policy "Support officers manage events" on public.support_case_events for all to authenticated using ((select private.has_admin_role(array['support_officer','administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['support_officer','administrator']::public.admin_role[])));

create policy "Published projects are public" on public.src_projects for select to anon, authenticated using (published = true);
create policy "Project managers manage projects" on public.src_projects for all to authenticated using ((select private.has_admin_role(array['project_manager','administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['project_manager','administrator']::public.admin_role[])));
create policy "Published milestones are public" on public.project_milestones for select to anon, authenticated using (exists (select 1 from public.src_projects where id = project_milestones.project_id and published = true));
create policy "Project managers manage milestones" on public.project_milestones for all to authenticated using ((select private.has_admin_role(array['project_manager','administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['project_manager','administrator']::public.admin_role[])));

create policy "Published consultations are public" on public.consultations for select to anon, authenticated using (published = true);
create policy "Publishers manage consultations" on public.consultations for all to authenticated using ((select private.has_admin_role(array['publisher','administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['publisher','administrator']::public.admin_role[])));
create policy "Published consultation options are public" on public.consultation_options for select to anon, authenticated using (exists (select 1 from public.consultations where id = consultation_options.consultation_id and published = true));
create policy "Publishers manage consultation options" on public.consultation_options for all to authenticated using ((select private.has_admin_role(array['publisher','administrator']::public.admin_role[]))) with check ((select private.has_admin_role(array['publisher','administrator']::public.admin_role[])));
create policy "Students cast one verified vote" on public.consultation_votes for insert to authenticated with check (voter_id = (select auth.uid()) and exists (select 1 from public.consultations where id = consultation_votes.consultation_id and published = true and now() between opens_at and closes_at) and exists (select 1 from public.consultation_options where id = consultation_votes.option_id and consultation_id = consultation_votes.consultation_id));
create policy "Students read own vote" on public.consultation_votes for select to authenticated using (voter_id = (select auth.uid()) or (select private.has_admin_role(array['publisher','administrator']::public.admin_role[])));
