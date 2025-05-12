import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import LeadsTable from "@/components/shared/LeadsTable";
import type { LinkedInProfileLead } from "@/types";
import { mockFetchLeads } from "../services/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Leads: React.FC = () => {
  const [searchUrl, setSearchUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leads, setLeads] = useState<LinkedInProfileLead[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchUrl) {
      toast({
        title: "Search URL required",
        description: "Please enter a LinkedIn search URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // In a real app, we'd call the API here with the search URL
      // For now, we'll use the mock data
      const data = await mockFetchLeads();
      setLeads(data);
      toast({
        title: "Leads retrieved",
        description: `Found ${data.length} leads from the search results`,
      });
    } catch (error) {
      setError("There was an error retrieving leads. Please try again.");
      toast({
        title: "Error retrieving leads",
        description: "There was an error retrieving leads. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 md:py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          LinkedIn Lead Search
        </h1>
        <p className="text-center text-gray-500 max-w-lg mx-auto">
          Search and retrieve LinkedIn profiles from a search URL
        </p>
      </header>

      <Card className="mb-8 border border-opacity-50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-opacity-100">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Search LinkedIn Profiles
          </CardTitle>
          <CardDescription>
            Enter a LinkedIn search URL to retrieve profiles matching your
            criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              value={searchUrl}
              onChange={(e) => setSearchUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://www.linkedin.com/search/results/people/?keywords=..."
              className="flex-grow border-gray-200 focus:border-purple-400 focus:ring-purple-400/20"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="md:w-auto w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
            >
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? "Searching..." : "Search Leads"}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-gray-500 italic">
            Note: Results will be fetched from the local database. Actual
            scraping requires running a local script.
          </p>
        </CardFooter>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6 animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <div className="py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Searching for leads...</p>
        </div>
      )}

      {!isLoading && leads.length > 0 && (
        <div className="animate-fade-in">
          <LeadsTable leads={leads} />
        </div>
      )}
    </div>
  );
};

export default Leads;
