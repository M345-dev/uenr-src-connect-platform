export type Audience = "All students" | "Sunyani campus" | "School of Engineering" | "Level 100";
export type Category = "Official" | "Academics" | "Events" | "Opportunities" | "Clubs" | "Sports" | "Student life";
export type AuthorType = "official" | "organization" | "student";
export type Priority = "urgent" | "important" | "normal";

export interface FeedPost {
  id: string;
  author: string;
  authorType: AuthorType;
  authorInitials: string;
  category: Category;
  title: string;
  body: string;
  image?: string;
  publishedAt: string;
  audience: Audience;
  priority: Priority;
  likes: number;
  comments: number;
  deadline?: string;
  pending?: boolean;
}

export type CaseStatus = "Received" | "In review" | "Assigned" | "Resolved";

export interface SupportCase {
  id: string;
  category: "Academic" | "Welfare" | "Security" | "Facilities";
  title: string;
  createdAt: string;
  updatedAt: string;
  status: CaseStatus;
  assignedTo: string;
  private: boolean;
}

export interface SRCProject {
  id: string;
  title: string;
  summary: string;
  owner: string;
  progress: number;
  status: "Planning" | "In progress" | "Completed";
  updatedAt: string;
  milestones: { label: string; complete: boolean }[];
}

export interface Consultation {
  id: string;
  question: string;
  description: string;
  closesAt: string;
  responses: number;
  options: { id: string; label: string; votes: number }[];
}

export interface ModerationItem {
  id: string;
  author: string;
  title: string;
  category: Category;
  submittedAt: string;
  risk: "Low" | "Review";
}
