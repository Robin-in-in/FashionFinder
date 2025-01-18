import { useOutletContext, Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootOutletContext } from "../root";

export default function() {
  const { gadgetConfig } = useOutletContext<RootOutletContext>();

  return (
    <Card className="p-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">👋 Hey, Developer!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base">
          Start building your app&apos;s signed out area in <a
            href="/edit/files/web/routes/_root._index.tsx"
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:underline"
          >
            web/routes/_root._index.tsx
          </a>
        </p>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            We've set you up as a user with the email and password below.
          </p>
          <Card className="bg-muted/50">
            <CardContent className="grid gap-4 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email</span>
                <code className="rounded bg-muted px-2 py-1 text-sm">
                  lucychen050504@gmail.com                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Password</span>
                <code className="rounded bg-muted px-2 py-1 text-sm">
                  gadget$123                </code>
              </div>
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground">
            You can also sign in with Google SSO if enabled.
          </p>
        </div>
        <Button
          variant="default"
          size="lg"
          className="w-full"
          asChild
        >
          <Link to="/sign-up">Sign up</Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          asChild
        >
          <Link to="/sign-in">Sign in</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
