import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/shared/CampaignCard";
import CampaignForm from "@/components/shared/CampaignForm";
import { PlusCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type {
  Campaign,
  FormState,
  CreateCampaignDTO,
  UpdateCampaignDTO,
} from "@/types";

import { useFetchCampaignsQuery } from "@/hooks/campaigns/useFetchCampaignsQuery";
import { useDeleteCampaignMutation } from "@/hooks/campaigns/useDeleteCampaignMutate";
import { useUpdateCampaignMutate } from "@/hooks/campaigns/useUpdateCampaignMutate";
import { useCreateCampaignMutation } from "@/hooks/campaigns/useCreateCampaignMutate";
import { toast } from "sonner";

const Index: React.FC = () => {
  const { data: campaigns = [], isPending, error } = useFetchCampaignsQuery();
  const { mutate: deleteMutate } = useDeleteCampaignMutation();
  const { mutate: updateMutate } = useUpdateCampaignMutate();
  const { mutate: createMutate } = useCreateCampaignMutation();

  const [formState, setFormState] = useState<FormState>({
    isOpen: false,
    mode: "create",
    campaign: undefined,
  });

  const openForm = useCallback(
    (mode: "create" | "edit", campaign?: Campaign) => {
      setFormState({ isOpen: true, mode, campaign });
    },
    []
  );

  const closeForm = useCallback(
    () => setFormState((s) => ({ ...s, isOpen: false })),
    []
  );

  const handleSubmit = useCallback(
    (camp: Campaign) => {
      if (formState.mode === "create") {
        const payload: CreateCampaignDTO = {
          name: camp.name,
          description: camp.description,
          status: "ACTIVE",
          leads: camp.leads,
          accountIDs: camp.accountIDs,
        };
        createMutate(payload);
      } else {
        const payload: UpdateCampaignDTO = {
          name: camp.name,
          description: camp.description,
          status: camp.status,
          leads: camp.leads,
          accountIDs: camp.accountIDs,
        };
        updateMutate({ id: camp._id!, data: payload });
      }
      closeForm();
    },
    [formState.mode, createMutate, updateMutate, closeForm]
  );

  const handleDelete = (id: string) => deleteMutate(id);

  if (isPending) return <SkeletonGrid />;

  return (
    <div className="container mx-auto py-6 px-4 md:py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          LinkedIn Campaign Manager
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Create and manage your LinkedIn outreach campaigns
        </p>
      </header>

      <div className="flex justify-end mb-6">
        <Button
          onClick={() => openForm("create")}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6 animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{(error as Error).message}</AlertDescription>
        </Alert>
      )}

      {campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <CampaignCard
              key={c._id}
              campaign={c}
              onEdit={() => openForm("edit", c)}
              onDelete={() => handleDelete(c._id!)}
              onStatusChange={(id, status) =>
                updateMutate(
                  {
                    id,
                    data: {
                      ...c,
                      status,
                    },
                  },
                  {
                    onSuccess: () => {
                      toast("Campaign status updated successfully");
                    },
                    onError: () => {
                      toast("Failed to update campaign status");
                    },
                  }
                )
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState onCreate={() => openForm("create")} />
      )}

      {formState.isOpen && (
        <CampaignForm
          isOpen={formState.isOpen}
          onClose={closeForm}
          onSubmit={handleSubmit}
          campaign={formState.campaign}
          title={
            formState.mode === "create" ? "Create Campaign" : "Edit Campaign"
          }
        />
      )}
    </div>
  );
};

export default Index;

// Skeleton Loader
const SkeletonGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="border rounded-lg p-6 h-64 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-full" />
        </div>
      </div>
    ))}
  </div>
);

// Empty State
const EmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-dashed animate-fade-in">
    <h3 className="text-xl font-medium mb-2">No campaigns yet</h3>
    <p className="text-gray-500 mb-6">
      Create your first campaign to get started
    </p>
    <Button
      onClick={onCreate}
      className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
    >
      <PlusCircle className="h-4 w-4 mr-2" />
      Create Campaign
    </Button>
  </div>
);
