-- Create streaks table
create table if not exists public.streaks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  friend_id uuid references public.profiles(id) on delete cascade not null,
  count integer default 0 not null,
  last_interaction_date date default current_date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, friend_id)
);

-- Enable RLS
alter table public.streaks enable row level security;

-- RLS Policies for streaks
create policy "Users can view their own streaks"
  on public.streaks for select
  using (auth.uid() = user_id or auth.uid() = friend_id);

create policy "Users can create streaks"
  on public.streaks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own streaks"
  on public.streaks for update
  using (auth.uid() = user_id or auth.uid() = friend_id);

create policy "Users can delete their own streaks"
  on public.streaks for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists streaks_user_id_idx on public.streaks(user_id);
create index if not exists streaks_friend_id_idx on public.streaks(friend_id);
