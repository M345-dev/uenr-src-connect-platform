import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BellRing, CheckCircle2, HeartHandshake, Megaphone, MessageSquareText, Search, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const pillars = [
  { number: "01", icon: BellRing, title: "Never miss what matters", copy: "One verified stream for announcements, deadlines, events and opportunities—filtered for you." },
  { number: "02", icon: UsersRound, title: "Feel the pulse of campus", copy: "Discover student voices, organizations and activities without chasing scattered group links." },
  { number: "03", icon: HeartHandshake, title: "Ask for help—and track it", copy: "Send a concern to the right office, receive a reference number and follow every update." },
  { number: "04", icon: ShieldCheck, title: "See representation at work", copy: "Follow SRC commitments, vote in consultations and see the outcome of student feedback." },
];

export function PublicSite() {
  return (
    <main className="overflow-hidden bg-background">
      <div className="bg-[#f3c941] px-5 py-2.5 text-center text-xs font-semibold tracking-tight text-[#173526]">
        Product preview · Sample content is clearly marked before official launch
      </div>
      <SiteHeader />

      <section className="mesh-bg relative bg-[#103d2a] text-white">
        <div className="mx-auto grid min-h-[780px] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
          <div className="relative z-10">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#f3c941]" />
              <p className="eyebrow text-[#f6d96f]">Built for every UENR student</p>
            </div>
            <h1 className="display-title max-w-4xl">
              Your campus.<br />
              <span className="text-[#f3c941]">In one place.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/68 sm:text-xl">
              The trusted digital home for campus information, community, student support and accountable representation.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-13 rounded-xl bg-[#f3c941] px-6 text-[#173526] hover:bg-[#f7d666]">
                <Link href="/connect">Explore SRC Connect <ArrowRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-13 rounded-xl border-white/20 bg-white/5 px-6 text-white hover:bg-white/12 hover:text-white">
                <Link href="#experience">See how it works</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/65">
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#f3c941]" /> Verified information</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#f3c941]" /> Low-data ready</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#f3c941]" /> Student-first privacy</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 shadow-2xl shadow-black/25">
              <Image src="/images/student-event.jpg" alt="UENR students taking part in a campus event" fill sizes="(max-width: 1024px) 90vw, 42vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c2d20]/80 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-[#0f3627]/90 p-5 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="eyebrow text-[#f6d96f]">Campus pulse</p>
                    <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">Jama night is happening Friday</p>
                  </div>
                  <Badge className="bg-white/12 text-white">642 going</Badge>
                </div>
              </div>
            </div>
            <div className="absolute -left-5 top-8 rounded-2xl border border-white/15 bg-white p-4 text-foreground shadow-xl sm:-left-14">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-red-50 text-red-600"><Megaphone className="size-5" /></span>
                <div><p className="text-xs font-semibold text-muted-foreground">Priority alert</p><p className="text-sm font-bold">Registration · 2 days left</p></div>
              </div>
            </div>
            <div className="absolute -right-3 top-1/3 rounded-2xl border border-white/15 bg-[#f3c941] p-4 text-[#173526] shadow-xl sm:-right-10">
              <p className="text-2xl font-bold tracking-[-0.05em]">1,248</p>
              <p className="text-xs font-semibold">student voices heard</p>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="eyebrow text-primary">One trusted connection</p>
            <h2 className="section-title mt-5">Less searching.<br />More student life.</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2">
            {pillars.map((pillar) => (
              <article key={pillar.number} className="group bg-card p-7 transition-colors hover:bg-secondary/55 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary"><pillar.icon className="size-5" /></span>
                  <span className="text-xs font-bold text-muted-foreground/60">{pillar.number}</span>
                </div>
                <h3 className="mt-10 text-xl font-bold tracking-[-0.035em]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="bg-[#e8f1eb] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">A calmer campus experience</p>
            <h2 className="section-title mt-5">One feed. Every signal that matters.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground">Official updates stay unmistakably official. Community posts remain useful, verified and moderated.</p>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-12">
            <Card className="overflow-hidden border-0 bg-[#103d2a] text-white lg:col-span-7">
              <CardContent className="grid min-h-[510px] gap-8 p-0 sm:grid-cols-[1fr_.85fr]">
                <div className="flex flex-col justify-between p-8 sm:p-10">
                  <div>
                    <Badge className="bg-[#f3c941] text-[#173526]">Personalized</Badge>
                    <h3 className="mt-6 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Relevant by default.</h3>
                    <p className="mt-4 leading-7 text-white/65">Choose your campus, school and level once. SRC Connect makes the feed useful every time you return.</p>
                  </div>
                  <div className="mt-10 space-y-3">
                    {['School of Engineering', 'Sunyani campus', 'Level 300'].map((item) => <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"><CheckCircle2 className="size-4 text-[#f3c941]" />{item}</div>)}
                  </div>
                </div>
                <div className="relative min-h-64 sm:min-h-full">
                  <Image src="/images/campus-life.jpg" alt="UENR graduate" fill sizes="(max-width: 1024px) 90vw, 35vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#103d2a] via-transparent to-transparent" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-[#f3c941] text-[#173526] lg:col-span-5">
              <CardContent className="flex h-full min-h-[330px] flex-col justify-between p-8 sm:p-10">
                <div className="flex items-center justify-between"><MessageSquareText className="size-8" /><span className="eyebrow">Support centre</span></div>
                <div>
                  <p className="text-6xl font-bold tracking-[-0.07em]">#1042</p>
                  <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em]">Your concern has a trail.</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-[#173526]/70">Received, assigned and resolved—with privacy controls for sensitive reports.</p>
                </div>
              </CardContent>
            </Card>

            <Card id="accountability" className="border-0 bg-white lg:col-span-5">
              <CardContent className="p-8 sm:p-10">
                <div className="flex items-center justify-between"><ShieldCheck className="size-8 text-primary" /><Badge variant="secondary">75% complete</Badge></div>
                <h3 className="mt-16 text-3xl font-bold tracking-[-0.05em]">Promises become visible progress.</h3>
                <div className="mt-8 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full w-3/4 rounded-full bg-primary" /></div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">Every project shows its owner, milestones, evidence and latest update.</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 bg-[#1b1c1b] text-white lg:col-span-7">
              <CardContent className="relative min-h-[390px] p-8 sm:p-10">
                <Image src="/images/uenr-event.jpg" alt="A UENR community event" fill sizes="(max-width: 1024px) 90vw, 55vw" className="object-cover opacity-45" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
                <div className="relative flex min-h-[310px] max-w-md flex-col justify-between">
                  <Sparkles className="size-8 text-[#f3c941]" />
                  <div><p className="eyebrow text-[#f6d96f]">Student voice</p><h3 className="mt-4 text-3xl font-bold tracking-[-0.05em]">Vote, then see what changed.</h3><p className="mt-4 text-sm leading-6 text-white/65">Consultations stay connected to the decision and published outcome.</p></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid items-center gap-12 rounded-[2rem] bg-[#103d2a] p-7 text-white sm:p-12 lg:grid-cols-[1fr_auto] lg:p-16">
          <div>
            <p className="eyebrow text-[#f6d96f]">The starting point</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.055em] sm:text-5xl">Know what matters. Connect with campus. Get help. Be represented.</h2>
          </div>
          <Button asChild size="lg" className="h-14 bg-[#f3c941] px-7 text-[#173526] hover:bg-[#f7d666]">
            <Link href="/connect">Enter the student app <ArrowRight /></Link>
          </Button>
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#103d2a] text-[#f3c941]"><Search className="size-5" /></span><div><p className="font-bold">SRC Connect</p><p className="text-xs text-muted-foreground">A UENR student platform prototype</p></div></div>
          <div className="flex flex-wrap gap-5 text-sm font-medium text-muted-foreground"><Link href="/connect">Student app</Link><Link href="/admin">Admin</Link><a href="mailto:src@uenr.edu.gh">Contact SRC</a><a href="https://uenr.edu.gh" target="_blank" rel="noreferrer">UENR website</a></div>
        </div>
      </footer>
    </main>
  );
}
