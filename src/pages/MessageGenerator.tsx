import type { LinkedInProfile } from "@/types";
import React, { useState } from "react";
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

const MessageGeneratorPage: React.FC = () => {
  const [profile, setProfile] = useState<LinkedInProfile>({
    name: "Sarah Johnson",
    job_title: "VP of Marketing",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    summary:
      "Growth marketing expert with 10+ years experience in SaaS and B2B lead generation strategies.",
  });

  const [generatedMessage, setGeneratedMessage] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // const handleGenerate = async () => {
  //   setIsGenerating(true);
  //   try {
  //     // In a real application, we would call the API here
  //     const response = mockGenerateMessage(profile);
  //     setGeneratedMessage(response.message);
  //     toast({
  //       title: "Message generated successfully",
  //       description: "Your personalized message is ready!",
  //     });
  //   } catch (error) {
  //     console.error("Error generating message:", error);
  //     toast({
  //       title: "Error generating message",
  //       description: "Please try again later",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    toast({
      title: "Copied to clipboard",
      description: "Message has been copied to your clipboard",
    });
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
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
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
                <Label htmlFor="job_title" className="text-sm font-medium">
                  Job Title
                </Label>
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
                <Label htmlFor="company" className="text-sm font-medium">
                  Company
                </Label>
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
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
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
              <Label htmlFor="summary" className="text-sm font-medium">
                Profile Summary
              </Label>
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
              // onClick={handleGenerate}
              disabled={isGenerating}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Personalized Message"}
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
