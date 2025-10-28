-- Create chat messages table for global chat room
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  username text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.chat_messages enable row level security;

-- RLS Policies for chat messages
create policy "Chat messages are viewable by everyone"
  on public.chat_messages for select
  using (true);

create policy "Authenticated users can insert chat messages"
  on public.chat_messages for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own messages"
  on public.chat_messages for delete
  using (auth.uid() = user_id);

-- Admins can delete any message
create policy "Admins can delete any message"
  on public.chat_messages for delete
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.is_admin = true
    )
  );

-- Create index for faster queries
create index if not exists chat_messages_created_at_idx on public.chat_messages(created_at desc);
create index if not exists chat_messages_user_id_idx on public.chat_messages(user_id);
