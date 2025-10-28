-- Create private messages table
create table if not exists public.private_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.private_messages enable row level security;

-- RLS Policies for private messages
create policy "Users can view messages they sent or received"
  on public.private_messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can send private messages"
  on public.private_messages for insert
  with check (auth.uid() = sender_id);

create policy "Users can update messages they received (mark as read)"
  on public.private_messages for update
  using (auth.uid() = receiver_id);

create policy "Users can delete messages they sent"
  on public.private_messages for delete
  using (auth.uid() = sender_id);

-- Create indexes
create index if not exists private_messages_sender_id_idx on public.private_messages(sender_id);
create index if not exists private_messages_receiver_id_idx on public.private_messages(receiver_id);
create index if not exists private_messages_created_at_idx on public.private_messages(created_at desc);
