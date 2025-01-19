import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface WardrobeItem {

  id: string;
  item_name: string;
  tags: string[];
}

interface MatchResult extends WardrobeItem {
  percentage: number;
  matchedTags: string[];
}


export default function GetRecommendations() {
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast(); 1;

  useEffect(() => {
    const loadWardrobeItems = () => {
      try {
        const savedItems = localStorage.getItem("selectedClothes");
        setWardrobeItems(savedItems ? JSON.parse(savedItems) : []);
      } catch (error) {
        console.error("Error loading wardrobe items:", error);
        setWardrobeItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadWardrobeItems();
  }, []);

  // Extract unique tags from preset clothes
  const allTags = Array.from(new Set(wardrobeItems.flatMap(item => item.tags))).sort();

  const handleAddTag = (tagName?: string | null) => {
    const tag = (tagName ?? inputValue.trim()).toLowerCase();

    if (!tag) return;

    if (selectedTags.length >= 5) {
      toast({
        title: "Maximum tags reached",
        description: "You can only select up to 5 tags",
        variant: "destructive"
      });
      return;
    }

    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const getMatchedResults = () => {
    if (selectedTags.length === 0) return [];

    const searchTags = selectedTags.map(t => t.toLowerCase());

    const results: MatchResult[] = wardrobeItems.map(item => {

      const itemTags = item.tags.map(t => t.toLowerCase());
      const matchedTags = searchTags.filter(tag => itemTags.includes(tag));
      return {
        ...item,
        item_name: item.item_name,
        percentage: (matchedTags.length / searchTags.length) * 100,
        matchedTags,
      };
    });
    return results
      .filter(r => r.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage);
  };

  const matchedResults = getMatchedResults();

  return (
    <div className="min-h-screen bg-[lightyellow] text-brown font-['Book Antiqua'] p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-8">Get Clothing Recommendations</h1>

        {isLoading ? (
          <p>Loading your wardrobe...</p>
        ) : wardrobeItems.length === 0 ? (
          <Card className="mb-8">
            <CardContent className="p-4">No clothes found in your wardrobe. Add some clothes first!</CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Tags (up to 5)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="tags">Enter a tag</Label>
                    <Input
                      id="tags"
                      placeholder="Type a tag..."
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={() => handleAddTag()}
                    className="mt-8"
                    variant="outline"
                  >
                    Add Tag
                  </Button>
                </div>

                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTags.map(tag => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 bg-[#F3EFE7] px-2 py-1 rounded"
                      >
                        {tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </span>
                    ))}
                  </div>
                )}

                <div>
                  <p className="text-sm mb-2">Available tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <span
                        key={tag}
                        className={cn(
                          "text-sm px-2 py-1 rounded cursor-pointer",
                          selectedTags.includes(tag.toLowerCase())
                            ? "bg-brown text-[lightyellow]"
                            : "bg-[#F3EFE7] hover:bg-[#E5E0D5]"
                        )}
                        onClick={() => {
                          if (!selectedTags.includes(tag.toLowerCase())
                          ) {
                            handleAddTag(tag);
                          }
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>)}

        {selectedTags.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl">Recommendations</h2>
            {matchedResults.length === 0 ? (
              <p>No matches found. Try different tags!</p>
            ) : (
              matchedResults.map((result) => (
                <Card key={result.id}>
                  <CardContent className="p-4">
                    <h3 className="text-xl mb-2">{result.item_name}</h3>
                    <p>Match: {result.percentage.toFixed(1)}%</p>
                    <p className="text-sm">
                      Matched tags: {result.matchedTags.join(", ")}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        <div className="mt-8">
          <div className="flex gap-4">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="bg-[#FFFBEB] text-brown hover:bg-[#F3EFE7]"
            >
              Back
            </Button>
            {/* <Link to="/select-clothes">
              <Button variant="outline" className="bg-[#FFFBEB] text-brown hover:bg-[#F3EFE7]">
                Make a Fit
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
