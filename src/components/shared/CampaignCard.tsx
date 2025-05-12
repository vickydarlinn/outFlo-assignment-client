import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Campaign } from "@/types";
import { Pencil, Trash2 } from "lucide-react";

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: "ACTIVE" | "INACTIVE") => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const handleToggle = (checked: boolean) => {
    onStatusChange(campaign._id!, checked ? "ACTIVE" : "INACTIVE");
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md border-opacity-50 hover:border-opacity-100">
      <CardHeader>
        <div className="flex justify-between items-start gap-2 flex-wrap sm:flex-nowrap">
          <div>
            <CardTitle className="text-xl mb-1 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              {campaign.name}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {campaign.description}
            </CardDescription>
          </div>
          <Badge
            variant={campaign.status === "ACTIVE" ? "default" : "secondary"}
            className={`${
              campaign.status === "ACTIVE"
                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                : ""
            }`}
          >
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Leads ({campaign.leads.length})
            </p>
            <div className="mt-1 max-h-20 overflow-auto rounded-md p-2 bg-gray-50 dark:bg-gray-900/50">
              {campaign.leads.length > 0 ? (
                campaign.leads.map((lead, index) => (
                  <p
                    key={index}
                    className="text-sm truncate text-blue-600 hover:text-blue-800"
                  >
                    {lead}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No leads added yet
                </p>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Account IDs ({campaign.accountIDs.length})
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {campaign.accountIDs.length > 0 ? (
                campaign.accountIDs.map((accountId, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-gray-50 dark:bg-gray-900/50"
                  >
                    {accountId}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No accounts linked
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Switch
            id={`status-${campaign._id}`}
            checked={campaign.status === "ACTIVE"}
            onCheckedChange={handleToggle}
          />
          <label
            htmlFor={`status-${campaign._id}`}
            className="text-sm font-medium"
          >
            {campaign.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
          </label>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(campaign)}
            className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(campaign._id!)}
            className="hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
