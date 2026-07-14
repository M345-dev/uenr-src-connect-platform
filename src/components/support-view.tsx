"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronRight, Clock3, FileText, Headphones, LockKeyhole, Plus, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supportCases as initialCases } from "@/lib/mock-data";
import type { SupportCase } from "@/lib/types";

const statusStyles: Record<SupportCase["status"], string> = {
  Received: "bg-blue-50 text-blue-700",
  "In review": "bg-amber-50 text-amber-700",
  Assigned: "bg-violet-50 text-violet-700",
  Resolved: "bg-emerald-50 text-emerald-700",
};

export function SupportView() {
  const [cases, setCases] = useState(initialCases);
  const [open, setOpen] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [category, setCategory] = useState<SupportCase["category"]>("Academic");
  const [createdId, setCreatedId] = useState<string | null>(null);

  function submitCase(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = `SRC-260714-${String(1100 + cases.length).padStart(4, "0")}`;
    const newCase: SupportCase = {
      id,
      category,
      title: String(form.get("title") || "Student concern"),
      createdAt: "Today",
      updatedAt: "Just now",
      status: "Received",
      assignedTo: "SRC Support Desk",
      private: anonymous,
    };
    setCases((current) => [newCase, ...current]);
    setCreatedId(id);
    setOpen(false);
    setAnonymous(false);
    event.currentTarget.reset();
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow text-primary">Student support centre</p><h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Help should have a clear path.</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Send a concern to the right office, keep the reference number and follow every update.</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="h-10"><Plus /> Submit a concern</Button></DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <form onSubmit={submitCase}>
              <DialogHeader><DialogTitle>Submit a student concern</DialogTitle><DialogDescription>Describe the issue clearly. The support desk will route it to the responsible office.</DialogDescription></DialogHeader>
              <div className="grid gap-4 py-5">
                <div className="grid gap-2"><Label htmlFor="case-category">Category</Label><Select value={category} onValueChange={(value) => setCategory(value as SupportCase["category"])}><SelectTrigger id="case-category" className="w-full"><SelectValue /></SelectTrigger><SelectContent>{["Academic", "Welfare", "Security", "Facilities"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div>
                <div className="grid gap-2"><Label htmlFor="case-title">Short title</Label><Input id="case-title" name="title" required maxLength={90} placeholder="Summarize the problem" /></div>
                <div className="grid gap-2"><Label htmlFor="case-details">What happened?</Label><Textarea id="case-details" name="details" required rows={5} placeholder="Include dates, location and what support you need…" /></div>
                <div className="grid gap-2"><Label htmlFor="case-location">Location or service</Label><Input id="case-location" name="location" placeholder="For example: Engineering Block B" /></div>
                {(category === "Security" || category === "Welfare") && <div className="flex items-start gap-3 rounded-xl border bg-muted/50 p-4"><Switch id="case-private" checked={anonymous} onCheckedChange={setAnonymous} /><div><Label htmlFor="case-private">Protect my identity from the receiving office</Label><p className="mt-1 text-xs leading-5 text-muted-foreground">Authorized safeguarding officers can still contact you privately if immediate support is required.</p></div></div>}
                <Alert><LockKeyhole /><AlertTitle>Private by design</AlertTitle><AlertDescription>Your case is visible only to you and authorized officers. Sensitive details never appear in the public feed.</AlertDescription></Alert>
              </div>
              <DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Submit securely</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {createdId && <Alert className="mt-6 border-emerald-200 bg-emerald-50 text-emerald-900"><CheckCircle2 /><AlertTitle>Concern received</AlertTitle><AlertDescription>Your reference is <strong>{createdId}</strong>. Keep it for follow-up.</AlertDescription></Alert>}

      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_330px]">
        <div className="space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-lg font-bold tracking-[-0.03em]">Your cases</h2><Badge variant="secondary">{cases.filter((item) => item.status !== "Resolved").length} active</Badge></div>
          {cases.map((item) => (
            <Card key={item.id} className="py-0 shadow-none">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><FileText className="size-5" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2"><Badge variant="outline">{item.category}</Badge><Badge className={statusStyles[item.status]}>{item.status}</Badge>{item.private && <Badge variant="outline"><LockKeyhole /> Protected</Badge>}</div>
                    <h3 className="mt-3 text-base font-bold tracking-[-0.02em]">{item.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground"><span className="font-mono">{item.id}</span><span>Assigned: {item.assignedTo}</span><span>Updated {item.updatedAt}</span></div>
                    <div className="mt-5 grid grid-cols-4 gap-2" aria-label={`Case progress: ${item.status}`}>
                      {["Received", "In review", "Assigned", "Resolved"].map((step, index) => { const currentIndex = ["Received", "In review", "Assigned", "Resolved"].indexOf(item.status); return <div key={step}><div className={`h-1.5 rounded-full ${index <= currentIndex ? "bg-primary" : "bg-muted"}`} /><p className="mt-1.5 hidden text-[9px] font-semibold text-muted-foreground sm:block">{step}</p></div>; })}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" aria-label={`Open case ${item.id}`}><ChevronRight /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <aside className="space-y-4">
          <Card className="border-0 bg-[#103d2a] py-0 text-white shadow-none"><CardContent className="p-6"><ShieldAlert className="size-6 text-[#f3c941]" /><h2 className="mt-10 text-xl font-bold tracking-[-0.035em]">Is someone in immediate danger?</h2><p className="mt-3 text-sm leading-6 text-white/60">Do not wait for a support ticket. Contact campus security or emergency services now.</p><Button className="mt-6 w-full bg-[#f3c941] text-[#173526] hover:bg-[#f7d666]">Emergency directory <ArrowRight /></Button></CardContent></Card>
          <Card className="py-0 shadow-none"><CardHeader className="p-5 pb-3"><CardTitle className="flex items-center gap-2 text-base"><Headphones className="size-4 text-primary" /> Service directory</CardTitle></CardHeader><CardContent className="space-y-1 p-3 pt-0">{["SRC Secretariat", "Academic Affairs", "Counselling Unit", "Campus Security"].map((service) => <button type="button" key={service} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold hover:bg-muted">{service}<ChevronRight className="size-4 text-muted-foreground" /></button>)}</CardContent></Card>
          <Alert><Clock3 /><AlertTitle>Response standard</AlertTitle><AlertDescription>New concerns should receive an acknowledgement within one working day.</AlertDescription></Alert>
        </aside>
      </div>
    </div>
  );
}
