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

export interface PersonCard {
  name: string | null;
  country: string | null;
  photoUrl: string | null;
  profileUrl: string | null;
}

export interface LinkedinResult {
  _id: string;
  url: string;
  count: number;
  people: PersonCard[];
  createdAt: string; // ISO date
}
