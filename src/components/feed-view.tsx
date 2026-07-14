"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, Info, Megaphone, PenLine, Plus, Sparkles } from "lucide-react";
import { FeedCard } from "@/components/feed-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { feedPosts } from "@/lib/mock-data";
import type { Category } from "@/lib/types";

const filters: (Category | "For you" | "Saved")[] = ["For you", "Official", "Academics", "Events", "Opportunities", "Clubs", "Sports", "Student life", "Saved"];

export function FeedView({ communityOnly = false }: { communityOnly?: boolean }) {
  const [filter, setFilter] = useState<Category | "For you" | "Saved">(communityOnly ? "Student life" : "For you");
  const [liked, setLiked] = useState<Set<string>>(() => new Set());
  const [saved, setSaved] = useState<Set<string>>(() => new Set(["post-2"]));
  const [message, setMessage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingPost, setPendingPost] = useState<string | null>(null);

  const visiblePosts = useMemo(() => {
    const base = communityOnly ? feedPosts.filter((post) => post.authorType !== "official") : feedPosts;
    if (filter === "For you") return base;
    if (filter === "Saved") return base.filter((post) => saved.has(post.id));
    return base.filter((post) => post.category === filter);
  }, [communityOnly, filter, saved]);

  function toggleSet(setter: React.Dispatch<React.SetStateAction<Set<string>>>, id: string) {
    setter((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function submitPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPendingPost(String(form.get("title") || "Your community post"));
    setDialogOpen(false);
    setMessage("Submitted for review. You will be notified when a moderator approves it.");
    event.currentTarget.reset();
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-primary">{communityOnly ? "Campus community" : "Tuesday, 14 July"}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">{communityOnly ? "Discover campus life" : "Good afternoon, Kwame."}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{communityOnly ? "Verified groups and moderated student voices—all in one calm feed." : "Here’s what matters to you today."}</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="h-10 gap-2"><Plus /> Create student post</Button></DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <form onSubmit={submitPost}>
              <DialogHeader><DialogTitle>Share with campus</DialogTitle><DialogDescription>Student posts are reviewed before publication. Your verified name will appear publicly.</DialogDescription></DialogHeader>
              <div className="grid gap-4 py-5">
                <div className="grid gap-2"><Label htmlFor="post-title">Post title</Label><Input id="post-title" name="title" required maxLength={90} placeholder="What should students know?" /></div>
                <div className="grid gap-2"><Label htmlFor="post-category">Category</Label><Select name="category" defaultValue="Student life"><SelectTrigger id="post-category" className="w-full"><SelectValue /></SelectTrigger><SelectContent>{filters.filter((item) => !["For you", "Saved", "Official"].includes(item)).map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div>
                <div className="grid gap-2"><Label htmlFor="post-body">Details</Label><Textarea id="post-body" name="body" required rows={5} placeholder="Add clear details, location and dates…" /></div>
                <Alert><Info /><AlertTitle>Community standard</AlertTitle><AlertDescription>No anonymous claims, private information, harassment or unverified advertising.</AlertDescription></Alert>
              </div>
              <DialogFooter><Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button type="submit">Submit for review</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {message && <Alert className="mt-6 border-primary/20 bg-secondary"><CheckCircle2 /><AlertTitle>Done</AlertTitle><AlertDescription className="flex items-center justify-between gap-4">{message}<button type="button" onClick={() => setMessage(null)} className="text-xs font-bold text-primary">Dismiss</button></AlertDescription></Alert>}

      {!communityOnly && (
        <Card className="mt-6 overflow-hidden border-0 bg-[#103d2a] text-white shadow-none">
          <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-red-500 text-white"><Megaphone className="size-5" /></span>
            <div className="flex-1"><div className="flex items-center gap-2"><p className="eyebrow text-[#f6d96f]">Priority · All students</p><Badge className="bg-white/10 text-white">2 days left</Badge></div><h2 className="mt-2 text-lg font-bold tracking-[-0.03em]">Academic registration closes Friday at 5:00 PM</h2><p className="mt-1 text-xs leading-5 text-white/58">Complete registration early and report portal difficulties before the deadline.</p></div>
            <Button className="bg-[#f3c941] text-[#173526] hover:bg-[#f7d666]" onClick={() => setMessage("Registration deadline added to your reminders.")}><Clock3 /> Remind me</Button>
          </CardContent>
        </Card>
      )}

      <div className="hide-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2">
        {filters.filter((item) => !communityOnly || item !== "Official").map((item) => <Button key={item} size="sm" variant={filter === item ? "default" : "outline"} className={cn("shrink-0", filter !== item && "bg-white")} onClick={() => setFilter(item)}>{item}</Button>)}
      </div>

      <div className="mt-4 grid items-start gap-6 xl:grid-cols-[minmax(0,720px)_320px]">
        <div className="space-y-4">
          <button type="button" onClick={() => setDialogOpen(true)} className="flex w-full items-center gap-3 rounded-2xl border bg-white p-4 text-left shadow-none transition-colors hover:bg-muted/60">
            <Avatar className="size-9"><AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">KA</AvatarFallback></Avatar><span className="flex-1 text-sm text-muted-foreground">Share something useful with campus…</span><PenLine className="size-4 text-muted-foreground" />
          </button>

          {pendingPost && <Card className="border-dashed bg-amber-50/60 py-0 shadow-none"><CardContent className="flex items-center gap-4 p-5"><span className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-700"><Clock3 className="size-5" /></span><div><Badge variant="outline" className="border-amber-300 text-amber-700">Pending moderation</Badge><p className="mt-2 text-sm font-bold">{pendingPost}</p></div></CardContent></Card>}

          {visiblePosts.map((post) => <FeedCard key={post.id} post={post} liked={liked.has(post.id)} saved={saved.has(post.id)} onLike={() => toggleSet(setLiked, post.id)} onSave={() => toggleSet(setSaved, post.id)} onMessage={setMessage} />)}
          {visiblePosts.length === 0 && <Card className="border-dashed py-0 shadow-none"><CardContent className="grid min-h-56 place-items-center p-8 text-center"><div><Sparkles className="mx-auto size-7 text-primary" /><h2 className="mt-4 font-bold">Nothing here yet</h2><p className="mt-2 text-sm text-muted-foreground">Try another topic or save a post for later.</p></div></CardContent></Card>}
        </div>

        <aside className="hidden space-y-4 xl:block">
          <Card className="py-0 shadow-none">
            <CardHeader className="border-b p-5"><CardTitle className="flex items-center gap-2 text-base"><CalendarDays className="size-4 text-primary" /> Coming up</CardTitle></CardHeader>
            <CardContent className="space-y-5 p-5">
              {[{ day: "17", mon: "JUL", title: "Registration deadline", meta: "5:00 PM · All students" }, { day: "19", mon: "JUL", title: "Campus clean-up", meta: "6:30 AM · Library" }, { day: "24", mon: "JUL", title: "Innovation challenge", meta: "Applications close" }].map((item) => <div key={item.title} className="flex gap-3"><div className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-center"><div><p className="text-sm font-bold leading-4">{item.day}</p><p className="text-[9px] font-bold text-primary">{item.mon}</p></div></div><div><p className="text-sm font-bold leading-5">{item.title}</p><p className="mt-1 text-[11px] text-muted-foreground">{item.meta}</p></div></div>)}
              <Button variant="outline" className="w-full">View calendar</Button>
            </CardContent>
          </Card>
          <Card className="border-0 bg-[#f3c941] py-0 text-[#173526] shadow-none"><CardContent className="p-5"><Sparkles className="size-5" /><p className="mt-8 text-lg font-bold tracking-[-0.03em]">Your feed is shaped by you.</p><p className="mt-2 text-xs leading-5 text-[#173526]/65">Engineering · Level 300 · Sunyani campus</p><Button variant="outline" size="sm" className="mt-5 border-[#173526]/20 bg-transparent">Edit interests</Button></CardContent></Card>
        </aside>
      </div>
    </div>
  );
}
