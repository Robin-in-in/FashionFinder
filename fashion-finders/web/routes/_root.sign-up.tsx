import { useActionForm } from "@gadgetinc/react";
import type { SignUpUserResult, User } from "@gadget-client/fashion-finders";
import { Link, useLocation, useNavigate, useOutletContext } from "@remix-run/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { api } from "../api";
import { RootOutletContext } from "../root";

export default function SignUpPage() {
  const { gadgetConfig } = useOutletContext<RootOutletContext>();
  const { search } = useLocation();
  const navigate = useNavigate();

  const {
    submit,
    register,
    formState: { errors, isSubmitting },
  } = useActionForm(api.user.signUp, {
    defaultValues: {
      inviteCode: new URLSearchParams(search).get("inviteCode"),
    },
    onSuccess: () =>
      navigate(gadgetConfig.authentication!.redirectOnSuccessfulSignInPath!),
  });

  return (
    <section
      style={{
        backgroundColor: "lightyellow", // Light yellow page background
        color: "brown",                 // Dark brown font
        fontFamily: "'Book Antiqua', serif", // Book Antiqua font
        minHeight: "100vh",             // Ensure full-page height
        padding: "2rem",                // Add spacing
      }}
    >
      <div className="max-w-[420px] mx-auto">
        <div className="space-y-8">
          <Card
            className="p-8"
            style={{
              backgroundColor: "lightyellow", // Card background matches the theme
              color: "brown",                 // Text inside card inherits dark brown font
            }}
          >
            <form onSubmit={submit}>
              <div className="space-y-6">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
                  Get started
                </h1>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <a href={`/auth/google/start${search}`}>
                    <img
                      className="mr-2 h-4 w-4"
                      src="https://assets.gadget.dev/assets/default-app-assets/google.svg"
                      alt="Google logo"
                    />
                    Sign up with Google
                  </a>
                </Button>
                <Separator />
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label
                          htmlFor="firstName"
                          style={{ color: "brown" }} // Ensure labels are dark brown
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="First Name"
                          autoComplete="given-name"
                          {...register("firstName")}
                          className={errors?.user?.firstName?.message ? "border-red-500" : ""}
                        />
                        {errors?.user?.firstName?.message && (
                          <p className="text-sm text-red-500">
                            {errors.user.firstName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label
                          htmlFor="lastName"
                          style={{ color: "brown" }}
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Last Name"
                          autoComplete="family-name"
                          {...register("lastName")}
                          className={errors?.user?.lastName?.message ? "border-red-500" : ""}
                        />
                        {errors?.user?.lastName?.message && (
                          <p className="text-sm text-red-500">
                            {errors.user.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label
                        htmlFor="email"
                        style={{ color: "brown" }}
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        {...register("email")}
                        className={errors?.user?.email?.message ? "border-red-500" : ""}
                      />
                      {errors?.user?.email?.message && (
                        <p className="text-sm text-red-500">
                          {errors.user.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label
                        htmlFor="password"
                        style={{ color: "brown" }}
                      >
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                        {...register("password")}
                        className={errors?.user?.password?.message ? "border-red-500" : ""}
                      />
                      {errors?.user?.password?.message && (
                        <p className="text-sm text-red-500">
                          {errors.user.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                    type="submit"
                    style={{
                      backgroundColor: "lightyellow",
                      color: "brown",
                      fontFamily: "'Book Antiqua', serif",
                    }}
                  >
                    Sign up with email
                  </Button>
                  {errors?.root?.message && (
                    <p className="text-sm text-red-500">
                      {errors.root.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </Card>
          <p
            className="text-sm text-center"
            style={{ color: "brown" }}
          >
            Already have an account?{" "}
            <Link to="/sign-in" style={{ color: "brown", textDecoration: "underline" }}>
              Sign in
            </Link>{" "}
            in Gadget
          </p>
        </div>
      </div>
    </section>
  );
}
