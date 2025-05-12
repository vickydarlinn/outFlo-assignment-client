export interface Campaign {
  _id?: string;
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
  leads: string[];
  accountIDs: string[];
}

export interface LinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary?: string;
}

export interface GeneratedMessage {
  message: string;
}

export interface LinkedInProfileLead {
  _id?: string;
  fullName: string;
  headline?: string;
  jobTitle: string;
  company: string;
  location: string;
  profileUrl: string;
  about?: string;
  avatarUrl?: string;
}

export interface FormState {
  isOpen: boolean;
  mode: "create" | "edit";
  campaign?: Campaign;
}

// Types for strict API payloads

export interface CreateCampaignDTO {
  name: string;
  description: string;
  status?: "ACTIVE" | "INACTIVE";
  leads: string[];
  accountIDs: string[];
}

export interface UpdateCampaignDTO {
  name?: string;
  description?: string;
  status?: "ACTIVE" | "INACTIVE" | "DELETED";
  leads?: string[];
  accountIDs?: string[];
}
