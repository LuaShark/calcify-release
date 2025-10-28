-- Create announcements table (admin only)
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.announcements enable row level security;

-- RLS Policies for announcements
create policy "Everyone can view announcements"
  on public.announcements for select
  using (true);

create policy "Only admins can create announcements"
  on public.announcements for insert
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.is_admin = true
    )
  );

create policy "Only admins can delete announcements"
  on public.announcements for delete
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.is_admin = true
    )
  );

-- Create index
create index if not exists announcements_created_at_idx on public.announcements(created_at desc);
