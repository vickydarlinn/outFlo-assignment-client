import axios from "axios";
import type {
  Campaign,
  LinkedInProfile,
  GeneratedMessage,
  CreateCampaignDTO,
  UpdateCampaignDTO,
  PersonCard,
  LinkedinResult,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

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
export const searchLinkedinPeople = async (payload: {
  url: string;
  count?: number;
}): Promise<{ _id: string; people: PersonCard[] }> => {
  const { data } = await axios.post(`${API_BASE_URL}/linkedin/search`, payload);
  return data;
};

export const getLinkedinLatestResults = async (
  limit = 10
): Promise<LinkedinResult[]> => {
  const { data } = await axios.get<LinkedinResult[]>(
    `${API_BASE_URL}/linkedin/latest?limit=${limit}`
  );
  return data;
};
