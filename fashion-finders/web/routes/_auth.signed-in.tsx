import { Link, useOutletContext } from "@remix-run/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AuthOutletContext } from "./_auth";

export default function SignedInPage() {
  const { gadgetConfig, user } = useOutletContext<AuthOutletContext>();

  return (
    <section
      style={{
        backgroundColor: "lightyellow",
        color: "brown",
        fontFamily: "'Book Antiqua', serif",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <div className="container mx-auto p-2">
        <div className="grid gap-6">
          <Card
            className="overflow-hidden"
            style={{
              backgroundColor: "lightyellow",
              color: "brown",
            }}
          >
            <div className="flex items-start justify-between p-6">
              {/* Left Section: Text and Buttons */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Let's create fashion together</h2>
                <div className="space-y-2">
                  <p className="text-base">
                    Welcome to <b>{gadgetConfig.env.GADGET_APP}</b>!
                  </p>
                  <p className="text-base mb-4">
                    Start by selecting from our preset clothing items to build your wardrobe.
                    We'll help you create amazing outfit combinations!
                  </p>

                  <div className="flex flex-col space-y-4">
                    <Link to="/select-clothes">
                      <Button
                        variant="outline"
                        style={{
                          backgroundColor: "lightyellow",
                          color: "brown",
                          fontFamily: "'Book Antiqua', serif",
                          width: "90%",
                        }}
                      >
                        Choose Preset Clothes
                      </Button>
                    </Link>

                    <Link to="/get-recommendations">
                      <Button
                        variant="outline"
                        style={{
                          backgroundColor: "lightyellow",
                          color: "brown",
                          fontFamily: "'Book Antiqua', serif",
                          width: "90%",
                        }}
                      >
                        Get Clothing Recommendations
                      </Button>
                    </Link>

                    <Link to="/wardrobe">
                      <Button
                        variant="outline"
                        style={{
                          backgroundColor: "lightyellow",
                          color: "brown",
                          fontFamily: "'Book Antiqua', serif",
                          width: "90%",
                        }}
                      >
                        See Wardrobe
                      </Button>
                    </Link>

                    {/* <Link to="/add-clothes">
                      <Button
                        variant="outline"
                        style={{
                          backgroundColor: "lightyellow",
                          color: "brown",
                          fontFamily: "'Book Antiqua', serif",
                          width: "90%",
                        }}
                      >
                        Add Custom Clothes
                      </Button>
                    </Link> */}
                  </div>
                </div>
              </div>

              {/* Right Section: Images */}
              <div className="flex flex-col items-front space-y-1">
                 {/* <img
                  src="web/public/icons/ICONS.png"
                  alt="Fashion"
                  className="h-34 w-284"
                />  */}
                <img
                  src="web/public/icons/moonlight.jpg"
                  alt="moonlight"
                  className="h-214 w-94 object-cover"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
