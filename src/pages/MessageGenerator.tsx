import type { LinkedInProfile } from "@/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Wand2 } from "lucide-react";
import { useSendMessageMutate } from "@/hooks/messages/useSendMessageMutate";

const MessageGeneratorPage: React.FC = () => {
  const { mutate: sendMessageMutate, data, isPending } = useSendMessageMutate();

  const [profile, setProfile] = useState<LinkedInProfile>({
    name: "",
    job_title: "",
    company: "",
    location: "",
    summary: "",
  });

  const [generatedMessage, setGeneratedMessage] = useState<string>("");

  // Update local message when the mutation returns new data
  useEffect(() => {
    if (data?.message) {
      setGeneratedMessage(data.message);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = () => {
    if (
      !profile.name ||
      !profile.job_title ||
      !profile.company ||
      !profile.location
    ) {
      toast.error("Please fill in the required fields");
      return;
    }
    sendMessageMutate(profile);
  };

  const handleCopy = () => {
    if (!generatedMessage) return;
    navigator.clipboard.writeText(generatedMessage);
    toast("Copied to clipboard");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          LinkedIn Message Generator
        </h1>
        <p className="text-center text-gray-500 max-w-lg mx-auto">
          Create personalized outreach messages based on LinkedIn profiles
        </p>
      </header>

      <div className="space-y-6">
        <Card className="border border-opacity-50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-opacity-100">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              LinkedIn Message Generator
            </CardTitle>
            <CardDescription>
              Generate personalized outreach messages based on LinkedIn profiles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job_title">Job Title*</Label>
                <Input
                  id="job_title"
                  name="job_title"
                  value={profile.job_title}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company*</Label>
                <Input
                  id="company"
                  name="company"
                  value={profile.company}
                  onChange={handleChange}
                  placeholder="TechCorp"
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <Input
                  id="location"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="San Francisco, CA"
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Profile Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                value={profile.summary}
                onChange={handleChange}
                placeholder="Experienced in AI & ML..."
                rows={3}
                className="resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
              onClick={handleGenerate}
              disabled={isPending}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {isPending ? "Generating..." : "Generate Personalized Message"}
            </Button>
          </CardFooter>
        </Card>

        {generatedMessage && (
          <Card className="border border-opacity-50 shadow-sm animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Generated Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-md p-4">
                <Textarea
                  value={generatedMessage}
                  onChange={(e) => setGeneratedMessage(e.target.value)}
                  rows={8}
                  className="w-full resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 bg-white dark:bg-gray-800"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleCopy}
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                disabled={!generatedMessage}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MessageGeneratorPage;
