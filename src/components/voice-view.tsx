"use client";

import { useState } from "react";
import { BarChart3, Check, CheckCircle2, ChevronRight, Clock3, FileCheck2, Landmark, MessageSquareQuote, Vote } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { consultation, projects } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const projectStatus = { Planning: "bg-slate-100 text-slate-700", "In progress": "bg-amber-50 text-amber-700", Completed: "bg-emerald-50 text-emerald-700" } as const;

export function VoiceView() {
  const [choice, setChoice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const totalVotes = consultation.options.reduce((sum, option) => sum + option.votes, 0) + (submitted ? 1 : 0);

  return (
    <div>
      <div><p className="eyebrow text-primary">Voice and accountability</p><h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Representation you can see.</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Shape decisions, follow commitments and see what happened after students spoke.</p></div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[1.08fr_.92fr]">
        <Card className="overflow-hidden border-0 bg-[#103d2a] py-0 text-white shadow-none">
          <CardHeader className="border-b border-white/10 p-6 sm:p-8"><div className="flex items-center justify-between gap-3"><Badge className="bg-[#f3c941] text-[#173526]">Open consultation</Badge><span className="flex items-center gap-1.5 text-xs text-white/55"><Clock3 className="size-3.5" />{consultation.closesAt}</span></div></CardHeader>
          <CardContent className="p-6 sm:p-8">
            <Vote className="size-7 text-[#f3c941]" />
            <h2 className="mt-6 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.045em] sm:text-3xl">{consultation.question}</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">{consultation.description}</p>

            {!submitted ? <div className="mt-8 space-y-3">{consultation.options.map((option) => <button type="button" key={option.id} onClick={() => setChoice(option.id)} className={cn("flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left text-sm font-semibold transition-colors", choice === option.id ? "border-[#f3c941] bg-[#f3c941]/12 text-white" : "border-white/12 bg-white/5 text-white/75 hover:bg-white/10")}><span>{option.label}</span><span className={cn("grid size-5 place-items-center rounded-full border", choice === option.id ? "border-[#f3c941] bg-[#f3c941] text-[#173526]" : "border-white/30")}>{choice === option.id && <Check className="size-3" />}</span></button>)}</div> : <div className="mt-8 space-y-5">{consultation.options.map((option) => { const votes = option.votes + (choice === option.id ? 1 : 0); const percent = Math.round((votes / totalVotes) * 100); return <div key={option.id}><div className="mb-2 flex items-center justify-between text-sm"><span className="font-semibold">{option.label}{choice === option.id && <span className="ml-2 text-[#f3c941]">Your vote</span>}</span><span className="font-bold">{percent}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#f3c941] transition-all" style={{ width: `${percent}%` }} /></div></div>; })}</div>}
            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-white/50">{totalVotes.toLocaleString()} verified student responses</p>{submitted ? <span className="flex items-center gap-2 text-sm font-bold text-[#f3c941]"><CheckCircle2 className="size-4" /> Vote recorded</span> : <Button disabled={!choice} className="bg-[#f3c941] text-[#173526] hover:bg-[#f7d666]" onClick={() => setSubmitted(true)}>Submit verified vote</Button>}</div>
          </CardContent>
        </Card>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <Card className="border-0 bg-[#f3c941] py-0 text-[#173526] shadow-none"><CardContent className="p-6 sm:p-8"><MessageSquareQuote className="size-6" /><p className="mt-10 text-5xl font-bold tracking-[-0.07em]">68%</p><h2 className="mt-3 text-xl font-bold tracking-[-0.035em]">of active projects are on track</h2><p className="mt-2 text-xs leading-5 text-[#173526]/65">Based on published milestones and updates in this prototype.</p></CardContent></Card>
          <Card className="py-0 shadow-none"><CardContent className="p-6 sm:p-8"><FileCheck2 className="size-6 text-primary" /><h2 className="mt-10 text-xl font-bold tracking-[-0.035em]">A permanent public record</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Projects and consultation outcomes remain visible when a new SRC administration takes office.</p><Button variant="outline" className="mt-6">Browse archive <ChevronRight /></Button></CardContent></Card>
        </div>
      </div>

      {submitted && <Alert className="mt-5 border-emerald-200 bg-emerald-50 text-emerald-900"><CheckCircle2 /><AlertTitle>Your voice is counted</AlertTitle><AlertDescription>The final result and SRC response will remain attached to this consultation.</AlertDescription></Alert>}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow text-primary">Commitment tracker</p><h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">Current SRC projects</h2></div><Button variant="outline" className="bg-white">View all projects</Button></div>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="py-0 shadow-none">
            <CardHeader className="p-6 pb-4"><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">{project.status === "Completed" ? <CheckCircle2 className="size-5" /> : project.progress > 50 ? <BarChart3 className="size-5" /> : <Landmark className="size-5" />}</span><Badge className={projectStatus[project.status]}>{project.status}</Badge></div><CardTitle className="mt-6 text-xl leading-tight tracking-[-0.035em]">{project.title}</CardTitle></CardHeader>
            <CardContent className="p-6 pt-0"><p className="min-h-16 text-sm leading-6 text-muted-foreground">{project.summary}</p><div className="mt-5 flex items-center justify-between text-xs"><span className="font-semibold">Progress</span><span className="font-bold text-primary">{project.progress}%</span></div><Progress value={project.progress} className="mt-2 h-2" /><div className="mt-5 border-t pt-4"><p className="text-xs font-semibold">{project.owner}</p><p className="mt-1 text-[11px] text-muted-foreground">Updated {project.updatedAt}</p></div><Button variant="ghost" className="mt-3 w-full justify-between px-0 hover:bg-transparent hover:text-primary">View milestones <ChevronRight /></Button></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
