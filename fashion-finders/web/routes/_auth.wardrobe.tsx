import { useEffect, useState } from "react"
import { Link } from "@remix-run/react"
import { api } from "../api"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
 

type ClothingItem = {
  id: string;
  item_name: string;
  tags: string[];
};

export default function WardrobePage() {
 
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClothes = () => {
      setLoading(true);
      try {
        if (typeof window !== "undefined") {
          const storedClothes = localStorage.getItem("selectedClothes");
          if (!storedClothes) {
            setClothes([]);
          } else {
            const parsedClothes = JSON.parse(storedClothes) as ClothingItem[];
            setClothes(parsedClothes);
          }
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load wardrobe");
        setClothes([]);
      }
      setLoading(false);
    };
    loadClothes();
  }, []);
 

  return (
    <main className={cn("container mx-auto py-6")}>  
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center"> 
            <span className="text-2xl font-bold">My Wardrobe</span>
            <Link to="/signed-in">
              <Button
                style={{
                  backgroundColor: "brown",
                  color: "lightyellow",
                  fontFamily: "'Book Antiqua', serif"
                }}
              >
                Back
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8" style={{ color: "brown", fontFamily: "'Book Antiqua', serif" }}>
              <p className="text-lg">Loading your wardrobe...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">Error loading wardrobe: {error}</div>
          ) : !clothes?.length ? (
            <div className="text-center py-8" style={{ color: "brown", fontFamily: "'Book Antiqua', serif" }}>
              <p className="text-lg">Your wardrobe is empty!</p>
              <p className="mt-2">Head to the clothes selector to add some items.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clothes.map((item) => (
                <Card key={item.id} style={{
                  backgroundColor: "lightyellow",
                  border: "1px solid brown"
                }}>
                  <CardHeader>
                    <CardTitle 
                      className="text-lg"
                      style={{
                        color: "brown",
                        fontFamily: "'Book Antiqua', serif"
                      }}
                    >
                      {item.item_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(item.tags || []).map((tag: string, tagIndex: number) => (
                        <Badge key={`${item.id}-${tagIndex}`} style={{
                          backgroundColor: "rgb(165, 42, 42)",
                          color: "lightyellow",
                          fontFamily: "'Book Antiqua', serif"
                        }}>{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
