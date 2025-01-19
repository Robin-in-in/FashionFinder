import { useSignOut } from "@gadgetinc/react";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/toaster";
import { User, Users, Mail, LogOut, Home } from "lucide-react";
import type { RootOutletContext } from "../root";

// Loader function to fetch user data
export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { session, gadgetConfig } = context;

  const userId = session?.get("user");
  const user = userId ? await context.api.user.findOne(userId) : undefined;

  if (!user) {
    return redirect(gadgetConfig.authentication!.signInPath);
  }

  return json({
    user,
  });
};

// Type definitions for the component
export type AuthOutletContext = RootOutletContext & {
  user: any;
};

// User menu component
const UserMenu = () => {
  const { user } = useLoaderData<typeof loader>();
  const [userMenuActive, setUserMenuActive] = useState(false);
  const signOut = useSignOut();

  const getInitials = () => {
    return (
      (user.firstName?.slice(0, 1) ?? "") +
      (user.lastName?.slice(0, 1) ?? "")
    ).toUpperCase();
  };

  return (
    <DropdownMenu
      open={userMenuActive}
      onOpenChange={setUserMenuActive}
    >
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-full p-1"
          style={{
            backgroundColor: "lightyellow",
            color: "brown",
            fontFamily: "'Book Antiqua', serif",
          }}
        >
          <Avatar>
            {user.profilePicture?.url ? (
              <AvatarImage src={"web/public/icons/avatar.png"} alt={user.firstName ?? user.email} />
            ) : (
              <AvatarFallback
                style={{
                  backgroundColor: "lightyellow",
                  color: "brown",
                  fontFamily: "'Book Antiqua', serif",
                }}
              >
                {getInitials()}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm font-medium">
            {user.firstName ?? user.email}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56"
        style={{
          backgroundColor: "lightyellow",
          color: "brown",
          fontFamily: "'Book Antiqua', serif",
        }}
      >
        <DropdownMenuItem asChild>
          <Link
            to="/profile"
            className="flex items-center"
            style={{
              color: "brown",
              fontFamily: "'Book Antiqua', serif",
            }}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/team"
            className="flex items-center"
            style={{
              color: "brown",
              fontFamily: "'Book Antiqua', serif",
            }}
          >
            <Users className="mr-2 h-4 w-4" />
            Team
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/invite"
            className="flex items-center"
            style={{
              color: "brown",
              fontFamily: "'Book Antiqua', serif",
            }}
          >
            <Mail className="mr-2 h-4 w-4" />
            Invite
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={signOut}
          className="flex items-center text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Main component
export default function SignedInPage() {
  const { user } = useLoaderData<typeof loader>();
  const location = useLocation();
  const rootOutletContext = useOutletContext<RootOutletContext>();

  return (
    <>
      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundColor: "lightyellow",
          color: "brown",
          fontFamily: "'Book Antiqua', serif",
        }}
      >
        <div
          className="hidden md:flex w-64 flex-col fixed inset-y-0"
          style={{
            backgroundColor: "lightyellow",
          }}
        >
          
          <div
            className="flex flex-col flex-grow border-r"
            style={{
              backgroundColor: "lightyellow",
            }}
          >
            <div
              className="h-30 flex items-center px-0 border-a"
              style={{
                backgroundColor: "lightyellow",
              }}
            >
              
              <Link to="/" className="flex items-center">
                <img
                  src="web/public/icons/FashionFindersICON.png"
                  alt="FashionFinders"
                  className="h-30 w-80"
                />
              </Link>
              
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
              <Link
                to="/signed-in"
                className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === "/signed-in"
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                style={{
                  backgroundColor:
                    location.pathname === "/signed-in" ? "lightyellow" : undefined,
                  color: location.pathname === "/signed-in" ? "brown" : undefined,
                  fontFamily: "'Book Antiqua', serif",
                }}
              >
                <Home className="mr-3 h-4 w-4" />
                Home
              </Link>
              
              <div className="my-4 flex justify-center">
                <img
                  src="web/public/icons/ICONS2.png"
                  alt="Sidebar Decorative Image"
                  className="h-180 w-20 object-cover rounded-full"
                />
              </div>
              
            </nav>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col md:pl-64">
          <header
            className="h-16 flex items-center justify-between px-6 border-b"
            style={{
              backgroundColor: "lightyellow",
              color: "brown",
              fontFamily: "'Book Antiqua', serif",
            }}
          >
            <div>
              <UserMenu />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-6 py-8">
              <Outlet context={{ ...rootOutletContext, user } as AuthOutletContext} />
              <Toaster />
            </div>
          </main>
          <footer
            className="flex items-center justify-center py-4"
            style={{
              backgroundColor: "lightyellow",
              color: "brown",
              fontFamily: "'Book Antiqua', serif",
            }}
          >
          
          </footer>
        </div>
      </div>
    </>
  );
}
