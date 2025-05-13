import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useSearchLinkedinMutation } from "@/hooks/linkedin/useSearchLinkedinMutation";
import { useFetchLinkedinLatestQuery } from "@/hooks/linkedin/useFetchLinkedinLatestQuery";
import { toast } from "sonner";
import { Search, ChevronDown, ChevronUp, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

export interface Lead {
  name: string;
  country: string | null;
  photoUrl: string;
  profileUrl: string;
}

export interface Result {
  _id: string;
  url: string;
  count: number;
  people: Lead[];
}

export interface LeadsState {
  url: string;
  count?: number;
}

const Leads = () => {
  const { mutate: searchLinkedinMutate, isPending: isScraping } =
    useSearchLinkedinMutation();
  const { data, isPending: isLoadingResults } = useFetchLinkedinLatestQuery();

  const [form, setForm] = useState<LeadsState>({ url: "", count: 3 });
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: id === "count" ? Number(value) : value,
    }));
  };

  const handleScrape = () => {
    if (!form.url.includes("linkedin.com")) {
      toast("Please enter a valid LinkedIn URL");
      return;
    }
    searchLinkedinMutate({ url: form.url, count: form.count });
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="container mx-auto py-6 px-4 md:py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          LinkedIn Lead Search
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Search and retrieve LinkedIn profiles from a search URL
        </p>
      </header>

      <Card className="mb-8 border border-opacity-50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-opacity-100">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            LinkedIn Lead Scraper
          </CardTitle>
          <CardDescription>
            Enter a LinkedIn search URL and number of leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-grow w-full md:w-auto">
              <Label htmlFor="url" className="text-sm font-medium">
                Search URL
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://www.linkedin.com/search/results/people/?keywords=..."
                className="w-full border-gray-200 focus:border-purple-400 focus:ring-purple-400/20"
                value={form.url}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-32">
              <Label htmlFor="count" className="text-sm font-medium">
                Quantity
              </Label>
              <Input
                id="count"
                type="number"
                placeholder="3"
                className="w-full"
                value={form.count}
                onChange={handleChange}
              />
            </div>
            <Button
              onClick={handleScrape}
              disabled={isScraping}
              className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
            >
              {isScraping ? (
                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              {isScraping ? "Scraping..." : "Scrape Leads"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoadingResults && (
        <p className="text-center text-gray-600">Loading latest results...</p>
      )}

      {data?.map((res) => (
        <Card key={res._id} className="mb-4">
          <CardHeader
            className="cursor-pointer"
            onClick={() => toggleExpand(res._id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg break-all  text-gray-500 ">
                  Last scraped: {new Date(res.createdAt).toLocaleString()}
                </CardTitle>

                <CardDescription>{res.count} profiles</CardDescription>
              </div>
              {expanded.has(res._id) ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
          </CardHeader>
          {expanded.has(res._id) && (
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Photo</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {res.people.map((person) => (
                      <tr key={person.profileUrl} className="hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <img
                            src={person.photoUrl || ""}
                            alt={person.name || "Profile Photo"}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-4 py-2 font-medium truncate">
                          {person.name}
                        </td>
                        <td className="px-4 py-2">
                          <Link
                            to={person.profileUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Leads;
