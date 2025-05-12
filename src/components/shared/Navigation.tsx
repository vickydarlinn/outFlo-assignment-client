import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MessageSquare, Users, List, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full border-b shadow-sm sticky top-0 bg-background z-50">
      <div className="container mx-auto py-4">
        {isMobile ? (
          <div className="relative">
            <div className="flex justify-between items-center">
              <Link
                to="/"
                className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
              >
                CampaignConnect
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md hover:bg-accent"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg mt-2 py-2 animate-fade-in z-50">
                <Link
                  to="/"
                  className={`flex items-center px-4 py-3 hover:bg-accent ${
                    isActive("/") ? "bg-accent/50" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <List className="h-4 w-4 mr-3" />
                  Campaigns
                </Link>
                <Link
                  to="/message-generator"
                  className={`flex items-center px-4 py-3 hover:bg-accent ${
                    isActive("/message-generator") ? "bg-accent/50" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageSquare className="h-4 w-4 mr-3" />
                  Message Generator
                </Link>
                <Link
                  to="/leads"
                  className={`flex items-center px-4 py-3 hover:bg-accent ${
                    isActive("/leads") ? "bg-accent/50" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="h-4 w-4 mr-3" />
                  Leads Scraper
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="font-bold text-xl mr-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
            >
              CampaignConnect
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle({
                      className: isActive("/") ? "bg-accent/50" : "",
                    })}
                  >
                    <Link to="/">
                      <List className="h-4 w-4 mr-2" />
                      Campaigns
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle({
                      className: isActive("/message-generator")
                        ? "bg-accent/50"
                        : "",
                    })}
                  >
                    <Link to="/message-generator">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message Generator
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle({
                      className: isActive("/leads") ? "bg-accent/50" : "",
                    })}
                  >
                    <Link to="/leads">
                      <Users className="h-4 w-4 mr-2" />
                      Leads Scraper
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
