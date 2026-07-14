"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowLeft, BarChart3, Bell, Check, CheckCircle2, ChevronRight, CircleAlert, FileText, Flag, Gauge, LayoutDashboard, Megaphone, Menu, MessageSquareWarning, MoreHorizontal, Plus, Search, ShieldCheck, Users, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { moderationQueue as initialQueue, supportCases } from "@/lib/mock-data";
import type { CaseStatus } from "@/lib/types";

const stats = [
  { label: "Students reached", value: "6,842", trend: "+12% this week", icon: Users },
  { label: "Active support cases", value: "28", trend: "7 need attention", icon: MessageSquareWarning },
  { label: "Pending moderation", value: "3", trend: "Oldest: 51 min", icon: Flag },
  { label: "Open consultations", value: "2", trend: "1,248 responses", icon: BarChart3 },
];

function AdminNav() {
  return (
    <nav className="space-y-1 px-3" aria-label="Administration navigation">
      {[{ icon: LayoutDashboard, label: "Overview", active: true }, { icon: Megaphone, label: "Publishing" }, { icon: Flag, label: "Moderation", count: 3 }, { icon: MessageSquareWarning, label: "Support cases", count: 7 }, { icon: BarChart3, label: "Consultations" }, { icon: ShieldCheck, label: "Projects" }].map((item) => <button type="button" key={item.label} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${item.active ? "bg-white/10 text-white" : "text-white/52 hover:bg-white/6 hover:text-white"}`}><item.icon className="size-4.5" />{item.label}{item.count && <span className="ml-auto grid size-5 place-items-center rounded-full bg-[#f3c941] text-[10px] font-bold text-[#173526]">{item.count}</span>}</button>)}
    </nav>
  );
}

export function AdminDashboard() {
  const [queue, setQueue] = useState(initialQueue);
  const [caseStatuses, setCaseStatuses] = useState<Record<string, CaseStatus>>(() => Object.fromEntries(supportCases.map((item) => [item.id, item.status])));
  const [message, setMessage] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  function moderate(id: string, action: "approved" | "rejected") {
    setQueue((current) => current.filter((item) => item.id !== id));
    setMessage(`Student post ${action}. The author has been notified.`);
  }

  function publish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateOpen(false);
    setMessage("Announcement scheduled and added to the audit trail.");
    event.currentTarget.reset();
  }

  return (
    <div className="min-h-screen bg-[#f5f6f5]">
      <aside className="fixed inset-y-0 left-0 hidden w-[250px] flex-col bg-[#102f23] text-white lg:flex">
        <div className="flex h-18 items-center px-5"><Link href="/" aria-label="SRC Connect home"><Image src="/images/uenr-logo.png" alt="UENR" width={170} height={45} className="h-8 w-auto" /></Link></div>
        <div className="mx-4 mb-5 rounded-xl border border-[#f3c941]/20 bg-[#f3c941]/8 px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#f3c941]">Administration</p><p className="mt-1 text-xs text-white/50">SRC Secretariat · 2026</p></div>
        <AdminNav />
        <div className="mt-auto border-t border-white/10 p-4"><Link href="/connect" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 hover:bg-white/6 hover:text-white"><ArrowLeft className="size-4" /> Student experience</Link><div className="mt-3 flex items-center gap-3 rounded-xl p-3"><Avatar className="size-9"><AvatarFallback className="bg-[#f3c941] text-xs font-bold text-[#173526]">BA</AvatarFallback></Avatar><div><p className="text-xs font-bold">Bernard A.</p><p className="text-[10px] text-white/45">System administrator</p></div></div></div>
      </aside>

      <div className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex h-18 items-center gap-3 border-b bg-white/92 px-4 backdrop-blur-xl sm:px-7">
          <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open admin navigation"><Menu /></Button></SheetTrigger><SheetContent side="left" className="w-[290px] border-0 bg-[#102f23] text-white"><SheetHeader><SheetTitle className="text-left text-white">SRC Administration</SheetTitle></SheetHeader><AdminNav /></SheetContent></Sheet>
          <div className="relative hidden max-w-sm flex-1 sm:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="h-10 border-0 bg-muted pl-9" placeholder="Search cases, posts or projects…" /></div>
          <Badge variant="outline" className="ml-auto"><span className="mr-1.5 size-1.5 rounded-full bg-emerald-500" /> All systems operational</Badge>
          <Button variant="ghost" size="icon" aria-label="Admin notifications"><Bell /></Button>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}><DialogTrigger asChild><Button><Plus /> New announcement</Button></DialogTrigger><DialogContent><form onSubmit={publish}><DialogHeader><DialogTitle>Publish an official update</DialogTitle><DialogDescription>This content will be visibly marked as official and added to the audit log.</DialogDescription></DialogHeader><div className="grid gap-4 py-5"><div className="grid gap-2"><Label htmlFor="admin-title">Title</Label><Input id="admin-title" required placeholder="Clear, action-oriented title" /></div><div className="grid gap-2"><Label htmlFor="admin-body">Details</Label><Textarea id="admin-body" required rows={5} placeholder="Include the source, dates and next action…" /></div><div className="grid gap-2"><Label>Audience</Label><Select defaultValue="all"><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All students</SelectItem><SelectItem value="sun">Sunyani campus</SelectItem><SelectItem value="engineering">School of Engineering</SelectItem></SelectContent></Select></div></div><DialogFooter><Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button><Button type="submit">Schedule update</Button></DialogFooter></form></DialogContent></Dialog>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow text-primary">Tuesday, 14 July 2026</p><h1 className="mt-2 text-3xl font-bold tracking-[-0.05em]">Administration overview</h1><p className="mt-2 text-sm text-muted-foreground">Publish clearly, respond promptly and leave a trustworthy record.</p></div><Badge className="w-fit bg-amber-100 text-amber-800">Prototype data</Badge></div>

          {message && <Alert className="mt-5 border-emerald-200 bg-emerald-50 text-emerald-900"><CheckCircle2 /><AlertTitle>Action completed</AlertTitle><AlertDescription className="flex items-center justify-between gap-4">{message}<button type="button" onClick={() => setMessage(null)} className="text-xs font-bold">Dismiss</button></AlertDescription></Alert>}

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <Card key={stat.label} className="py-0 shadow-none"><CardContent className="p-5"><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary"><stat.icon className="size-4.5" /></span><MoreHorizontal className="size-4 text-muted-foreground" /></div><p className="mt-6 text-3xl font-bold tracking-[-0.06em]">{stat.value}</p><p className="mt-1 text-xs font-semibold">{stat.label}</p><p className="mt-3 text-[11px] text-muted-foreground">{stat.trend}</p></CardContent></Card>)}</div>

          <Tabs defaultValue="overview" className="mt-7 flex-col">
            <TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="moderation">Moderation <Badge className="ml-1 bg-amber-100 text-amber-800">{queue.length}</Badge></TabsTrigger><TabsTrigger value="cases">Support cases</TabsTrigger><TabsTrigger value="audit">Audit trail</TabsTrigger></TabsList>

            <TabsContent value="overview" className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_.7fr]">
              <Card className="py-0 shadow-none"><CardHeader className="flex flex-row items-center justify-between border-b p-6"><div><CardTitle className="text-base">Student reach</CardTitle><p className="mt-1 text-xs text-muted-foreground">Weekly active students across the platform</p></div><Badge variant="secondary"><Activity /> Live</Badge></CardHeader><CardContent className="p-6"><div className="flex h-64 items-end gap-3">{[38, 47, 42, 61, 66, 73, 81].map((value, index) => <div key={value + index} className="flex h-full flex-1 flex-col justify-end gap-2"><div className="group relative rounded-t-md bg-primary/15 transition-colors hover:bg-primary" style={{ height: `${value}%` }}><span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 text-[10px] font-bold group-hover:block">{value}%</span></div><span className="text-center text-[10px] font-semibold text-muted-foreground">{["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"][index]}</span></div>)}</div></CardContent></Card>
              <Card className="border-0 bg-[#102f23] py-0 text-white shadow-none"><CardContent className="flex h-full min-h-80 flex-col p-6"><Gauge className="size-6 text-[#f3c941]" /><p className="mt-auto text-6xl font-bold tracking-[-0.08em]">4h 12m</p><h2 className="mt-3 text-xl font-bold tracking-[-0.035em]">Median first response</h2><p className="mt-2 text-xs leading-5 text-white/50">Inside the one-working-day support standard.</p><div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#f3c941]"><CheckCircle2 className="size-4" /> 84% acknowledged on time</div></CardContent></Card>
            </TabsContent>

            <TabsContent value="moderation" className="mt-5">
              <Card className="py-0 shadow-none"><CardHeader className="border-b p-6"><CardTitle className="text-base">Student post review</CardTitle><p className="text-xs text-muted-foreground">Verified organizations bypass this queue; student submissions require approval.</p></CardHeader><CardContent className="p-0">{queue.length === 0 ? <div className="grid min-h-64 place-items-center p-8 text-center"><div><CheckCircle2 className="mx-auto size-8 text-emerald-600" /><h2 className="mt-4 font-bold">Queue cleared</h2><p className="mt-2 text-sm text-muted-foreground">All student submissions have been reviewed.</p></div></div> : <Table><TableHeader><TableRow><TableHead>Submission</TableHead><TableHead>Category</TableHead><TableHead>Risk</TableHead><TableHead>Received</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader><TableBody>{queue.map((item) => <TableRow key={item.id}><TableCell><p className="font-semibold">{item.title}</p><p className="mt-1 text-xs text-muted-foreground">{item.author}</p></TableCell><TableCell><Badge variant="secondary">{item.category}</Badge></TableCell><TableCell><Badge className={item.risk === "Review" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}>{item.risk === "Review" && <CircleAlert />}{item.risk}</Badge></TableCell><TableCell className="text-xs text-muted-foreground">{item.submittedAt}</TableCell><TableCell><div className="flex justify-end gap-2"><Button size="sm" variant="outline" className="text-red-700" onClick={() => moderate(item.id, "rejected")}><X /> Reject</Button><Button size="sm" onClick={() => moderate(item.id, "approved")}><Check /> Approve</Button></div></TableCell></TableRow>)}</TableBody></Table>}</CardContent></Card>
            </TabsContent>

            <TabsContent value="cases" className="mt-5"><Card className="py-0 shadow-none"><CardHeader className="border-b p-6"><CardTitle className="text-base">Support case workload</CardTitle><p className="text-xs text-muted-foreground">Sensitive case titles are hidden from roles without safeguarding access.</p></CardHeader><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Reference</TableHead><TableHead>Case</TableHead><TableHead>Assigned office</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{supportCases.map((item) => <TableRow key={item.id}><TableCell className="font-mono text-xs">{item.id}</TableCell><TableCell><p className="font-semibold">{item.private ? "Protected student case" : item.title}</p><p className="text-xs text-muted-foreground">{item.category} · Updated {item.updatedAt}</p></TableCell><TableCell className="text-sm">{item.assignedTo}</TableCell><TableCell><Select value={caseStatuses[item.id]} onValueChange={(value) => { setCaseStatuses((current) => ({ ...current, [item.id]: value as CaseStatus })); setMessage(`${item.id} updated to ${value}.`); }}><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent>{["Received", "In review", "Assigned", "Resolved"].map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}</SelectContent></Select></TableCell></TableRow>)}</TableBody></Table></CardContent></Card></TabsContent>

            <TabsContent value="audit" className="mt-5"><Card className="py-0 shadow-none"><CardHeader className="border-b p-6"><CardTitle className="text-base">Recent administrative activity</CardTitle></CardHeader><CardContent className="p-6"><div className="space-y-6">{[{ icon: Megaphone, title: "Registration reminder published", meta: "General Secretary · 09:42" }, { icon: FileText, title: "Project milestone evidence updated", meta: "Academic Committee · 08:15" }, { icon: CheckCircle2, title: "Support case SRC-260701-0834 resolved", meta: "Welfare Committee · Yesterday" }, { icon: Flag, title: "Two student posts approved", meta: "Content Moderator · Yesterday" }].map((item) => <div key={item.title} className="flex gap-4"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><item.icon className="size-4" /></span><div className="flex-1 border-b pb-5"><p className="text-sm font-semibold">{item.title}</p><p className="mt-1 text-xs text-muted-foreground">{item.meta}</p></div><ChevronRight className="size-4 text-muted-foreground" /></div>)}</div></CardContent></Card></TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
