import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Campaign } from "@/types";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CampaignFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: Campaign) => void;
  campaign?: Campaign;
  title: string;
}

const emptyCampaign: Campaign = {
  name: "",
  description: "",
  status: "inactive",
  leads: [],
  accountIDs: [],
};

const CampaignForm: React.FC<CampaignFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  campaign,
  title,
}) => {
  const [formData, setFormData] = useState<Campaign>(emptyCampaign);
  const [newLead, setNewLead] = useState("");
  const [newAccountID, setNewAccountID] = useState("");

  useEffect(() => {
    if (campaign) {
      setFormData(campaign);
    } else {
      setFormData(emptyCampaign);
    }
  }, [campaign, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLead = () => {
    if (newLead && !formData.leads.includes(newLead)) {
      setFormData((prev) => ({ ...prev, leads: [...prev.leads, newLead] }));
      setNewLead("");
    }
  };

  const handleRemoveLead = (lead: string) => {
    setFormData((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l !== lead),
    }));
  };

  const handleAddAccountID = () => {
    if (newAccountID && !formData.accountIDs.includes(newAccountID)) {
      setFormData((prev) => ({
        ...prev,
        accountIDs: [...prev.accountIDs, newAccountID],
      }));
      setNewAccountID("");
    }
  };

  const handleRemoveAccountID = (accountID: string) => {
    setFormData((prev) => ({
      ...prev,
      accountIDs: prev.accountIDs.filter((id) => id !== accountID),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div>
              <Label>LinkedIn Leads</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add LinkedIn profile URL"
                  value={newLead}
                  onChange={(e) => setNewLead(e.target.value)}
                />
                <Button type="button" onClick={handleAddLead}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.leads.map((lead, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {lead}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveLead(lead)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Account IDs</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add account ID"
                  value={newAccountID}
                  onChange={(e) => setNewAccountID(e.target.value)}
                />
                <Button type="button" onClick={handleAddAccountID}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.accountIDs.map((accountID, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {accountID}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveAccountID(accountID)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Campaign</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignForm;
