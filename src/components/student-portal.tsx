"use client";

import { useState } from "react";
import { FeedView } from "@/components/feed-view";
import { PortalShell, type PortalView } from "@/components/portal-shell";
import { SupportView } from "@/components/support-view";
import { VoiceView } from "@/components/voice-view";

export function StudentPortal() {
  const [active, setActive] = useState<PortalView>("home");

  return (
    <PortalShell active={active} onNavigate={setActive}>
      {active === "home" && <FeedView />}
      {active === "community" && <FeedView communityOnly />}
      {active === "support" && <SupportView />}
      {active === "voice" && <VoiceView />}
    </PortalShell>
  );
}
