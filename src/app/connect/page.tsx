import type { Metadata } from "next";
import { StudentPortal } from "@/components/student-portal";

export const metadata: Metadata = { title: "Student app" };

export default function ConnectPage() {
  return <StudentPortal />;
}
