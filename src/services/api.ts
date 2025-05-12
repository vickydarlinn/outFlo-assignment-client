import axios from "axios";
import type {
  Campaign,
  LinkedInProfile,
  GeneratedMessage,
  LinkedInProfileLead,
  CreateCampaignDTO,
  UpdateCampaignDTO,
} from "../types";

// Define API base URL - in production, this would come from environment variables
const API_BASE_URL = "http://localhost:4000";

// Campaign APIs
export const getCampaigns = async (): Promise<Campaign[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/campaigns`);
    return response.data;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
};

export const getCampaignById = async (id: string): Promise<Campaign | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching campaign ${id}:`, error);
    return null;
  }
};

export const createCampaign = async (
  campaign: CreateCampaignDTO
): Promise<Campaign | null> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/campaigns`, campaign);
    return response.data;
  } catch (error) {
    console.error("Error creating campaign:", error);
    return null;
  }
};

export const updateCampaign = async (
  id: string,
  campaign: UpdateCampaignDTO
): Promise<Campaign | null> => {
  console.log(campaign);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/campaigns/${id}`,
      campaign
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating campaign ${id}:`, error);
    return null;
  }
};

export const deleteCampaign = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_BASE_URL}/campaigns/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting campaign ${id}:`, error);
    return false;
  }
};

// LinkedIn Message API
export const generatePersonalizedMessage = async (
  profile: LinkedInProfile
): Promise<GeneratedMessage | null> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/personalized-message`,
      profile
    );
    return response.data;
  } catch (error) {
    console.error("Error generating personalized message:", error);
    return null;
  }
};

// LinkedIn Lead APIs
export const fetchLeadsBySearchUrl = async (
  searchUrl: string
): Promise<LinkedInProfileLead[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/leads/search`, {
      searchUrl,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching leads by search URL:", error);
    return [];
  }
};

export const mockGenerateMessage = (
  profile: LinkedInProfile
): GeneratedMessage => {
  return {
    message: `Hi ${profile.name}, I noticed you're a ${profile.job_title} at ${
      profile.company
    } based in ${profile.location}. Given your background in ${profile.summary
      .split(" ")
      .slice(0, 3)
      .join(
        " "
      )}..., I thought you might be interested in how our platform can help streamline your lead generation and outreach process. Would you be open to a quick chat this week?`,
  };
};

export const mockFetchLeads = (): LinkedInProfileLead[] => {
  return [
    {
      _id: "1",
      fullName: "Owen Kurtz",
      headline: "Supply Chain & Manufacturing",
      jobTitle: "Founder",
      company: "Nest Traffic",
      location: "Fort Myers, FL",
      profileUrl: "https://www.linkedin.com/in/owen-kurtz",
      about: "",
    },
    {
      _id: "2",
      fullName: "Alexander Ulreich",
      headline: "CEO @STRAT3GIC ⭐️ 3X Agency Owner",
      jobTitle: "Founder & CEO",
      company: "STRAT3GIC Marketing Agency",
      location: "United States",
      profileUrl: "https://www.linkedin.com/in/alexander-ulreich",
      about: "A DRIVEN ENTREPRENEUR...",
    },
    {
      _id: "3",
      fullName: "Drew Wolber",
      headline: "Entrepreneur, Proud Husband & Father",
      jobTitle: "Co-Founder & Managing Partner",
      company: "FOAM Creative",
      location: "Austin, TX",
      profileUrl: "https://www.linkedin.com/in/drew-wolber",
      about: "",
    },
    {
      _id: "4",
      fullName: "Ben McGary",
      headline: "MANUFACTURERS: Grow with Webflow + AI",
      jobTitle: "Tech Stack Expert",
      company: "TactStack",
      location: "Box Elder, SD",
      profileUrl: "https://www.linkedin.com/in/ben-mcgary",
      about: "Hi, I'm Ben McGary 👋 I DESIGN...",
    },
    {
      _id: "5",
      fullName: "Mike Stanzyk",
      headline: "We connect growing businesses with qualified buyers",
      jobTitle: "",
      company: "",
      location: "San Clemente, CA",
      profileUrl: "https://www.linkedin.com/in/mike-stanzyk",
      about: "",
    },
    {
      _id: "6",
      fullName: "Uros Ross Bokic",
      headline: "Helping Home-Improvement Businesses",
      jobTitle: "",
      company: "",
      location: "Bear, DE",
      profileUrl: "https://www.linkedin.com/in/uros-bokic",
      about: "",
    },
    {
      _id: "7",
      fullName: "Shannon Hostetler",
      headline: "Co-Founder & COO, North Star Lead Gen",
      jobTitle: "Co-Founder & COO",
      company: "North Star Lead Gen",
      location: "Mount Juliet, TN",
      profileUrl: "https://www.linkedin.com/in/shannon-hostetler",
      about: "",
    },
    {
      _id: "8",
      fullName: "Meredith Eisenberg",
      headline: "Convert LinkedIn Connections to Clients",
      jobTitle: "Director of Coaching and Education",
      company: "Connect 365",
      location: "Albuquerque, NM",
      profileUrl: "https://www.linkedin.com/in/meredith-eisenberg",
      about: "You started your business with a dream...",
    },
    {
      _id: "9",
      fullName: "Silvia Lee",
      headline: "let's gooooo!",
      jobTitle: "Founder",
      company: "SLW, Inc",
      location: "Park City, UT",
      profileUrl: "https://www.linkedin.com/in/silvia-lee",
      about: "",
    },
    {
      _id: "10",
      fullName: "Jessica Barnes",
      headline: "Growth Marketing Specialist",
      jobTitle: "Head of Growth",
      company: "LeadForge",
      location: "Denver, CO",
      profileUrl: "https://www.linkedin.com/in/jessica-barnes",
      about: "Helping B2B companies scale through data-driven strategies",
    },
  ];
};
