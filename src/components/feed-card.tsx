"use client";

import Image from "next/image";
import { Bookmark, CalendarPlus, CheckCircle2, Flag, Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { FeedPost } from "@/lib/types";

interface FeedCardProps {
  post: FeedPost;
  liked: boolean;
  saved: boolean;
  onLike: () => void;
  onSave: () => void;
  onMessage: (message: string) => void;
}

const authorLabels = { official: "Official", organization: "Verified organization", student: "Student" } as const;

export function FeedCard({ post, liked, saved, onLike, onSave, onMessage }: FeedCardProps) {
  return (
    <Card className={cn("overflow-hidden border bg-white py-0 shadow-none", post.priority === "urgent" && "border-l-4 border-l-red-500")}>
      <CardContent className="p-0">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Avatar className="size-10"><AvatarFallback className={cn("text-xs font-bold", post.authorType === "official" ? "bg-primary text-primary-foreground" : post.authorType === "organization" ? "bg-[#f3c941] text-[#173526]" : "bg-secondary text-secondary-foreground")}>{post.authorInitials}</AvatarFallback></Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><p className="truncate text-sm font-bold">{post.author}</p>{post.authorType !== "student" && <CheckCircle2 className="size-4 fill-primary text-white" />}</div>
              <p className="mt-0.5 text-xs text-muted-foreground">{authorLabels[post.authorType]} · {post.publishedAt}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label={`More actions for ${post.title}`}><MoreHorizontal /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end"><DropdownMenuItem onClick={() => onMessage("Post reported for moderator review.")}><Flag /> Report post</DropdownMenuItem><DropdownMenuItem onClick={() => onMessage("Post link copied.")}><Share2 /> Copy link</DropdownMenuItem></DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant={post.category === "Official" ? "default" : "secondary"}>{post.category}</Badge>
            <Badge variant="outline">{post.audience}</Badge>
            {post.deadline && <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">Due {post.deadline}</Badge>}
          </div>
          <h2 className="mt-4 text-xl font-bold leading-tight tracking-[-0.035em] sm:text-[1.35rem]">{post.title}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.body}</p>
        </div>

        {post.image && <div className="relative aspect-[16/8.7] w-full overflow-hidden bg-muted"><Image src={post.image} alt="" fill sizes="(max-width: 1024px) 100vw, 620px" className="object-cover transition-transform duration-500 hover:scale-[1.02]" /></div>}

        <div className="flex items-center gap-1 border-t px-3 py-2 sm:px-4">
          <Button variant="ghost" size="sm" className={cn("gap-2", liked && "text-red-600")} onClick={onLike} aria-pressed={liked}><Heart className={cn(liked && "fill-current")} />{post.likes + (liked ? 1 : 0)}</Button>
          <Button variant="ghost" size="sm" className="gap-2" onClick={() => onMessage("Comments are open in the full post view.")}><MessageCircle />{post.comments}</Button>
          <Button variant="ghost" size="sm" className="gap-2" onClick={() => onMessage("Post shared.")}><Share2 /><span className="hidden sm:inline">Share</span></Button>
          {post.deadline && <Button variant="ghost" size="sm" className="ml-auto gap-2" onClick={() => onMessage(`${post.title} was added to your calendar.`)}><CalendarPlus /><span className="hidden sm:inline">Remind me</span></Button>}
          <Button variant="ghost" size="icon" className={cn(!post.deadline && "ml-auto", saved && "text-primary")} onClick={onSave} aria-label={saved ? "Remove bookmark" : "Bookmark post"} aria-pressed={saved}><Bookmark className={cn(saved && "fill-current")} /></Button>
        </div>
      </CardContent>
    </Card>
  );
}
