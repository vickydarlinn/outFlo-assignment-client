import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, ExternalLink } from "lucide-react";
import type { LinkedInProfileLead } from "@/types";
import { Card } from "@/components/ui/card";

interface LeadsTableProps {
  leads: LinkedInProfileLead[];
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter leads based on search term
  const filteredLeads = searchTerm
    ? leads.filter(
        (lead) =>
          lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : leads;

  // Calculate pagination
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="w-full overflow-hidden mb-8">
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold">
            LinkedIn Profiles ({filteredLeads.length})
          </h2>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Headline</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="w-[80px]">Profile</TableHead>
              <TableHead>About</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads.length > 0 ? (
              paginatedLeads.map((lead, index) => (
                <TableRow key={lead._id || index}>
                  <TableCell>
                    {lead.avatarUrl ? (
                      <img
                        src={lead.avatarUrl}
                        alt={lead.fullName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-500">
                          {lead.fullName.charAt(0)}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{lead.fullName}</TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {lead.headline || "/"}
                  </TableCell>
                  <TableCell>{lead.jobTitle}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.location}</TableCell>
                  <TableCell>
                    <a
                      href={lead.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {lead.about || "/"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  {searchTerm ? "No matches found" : "No leads found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around the current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={pageNum === currentPage}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Card>
  );
};

export default LeadsTable;
