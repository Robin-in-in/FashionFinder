import { useState } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { PRESET_CLOTHES } from "@/lib/presetClothes";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const STORAGE_KEY = "selectedClothes";

interface SelectedClothes {
  id: string;
  item_name: string;
  tags: string[];
}

 
export default function SelectClothes() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    setSelectedItems(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const handleSave = () => {
 
      const selectedClothes = PRESET_CLOTHES
        .filter((item) => selectedItems.has(item.id))
        .map(item => ({
          id: item.id,
          item_name: item.name,
          tags: item.tags
        }));

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedClothes));
      
      toast({
        title: "Success",
        description: "Your clothing items have been saved successfully",
        style: { backgroundColor: "lightyellow", color: "brown", fontFamily: "'Book Antiqua', serif" }
      });
      
      navigate("/wardrobe");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your clothing items. Please try again.",
        variant: "destructive",
        style: { backgroundColor: "lightyellow", color: "brown", fontFamily: "'Book Antiqua', serif" }
      });
    }
  };

  return (
    <div
      className="p-4 space-y-6"
      style={{
        backgroundColor: "lightyellow",
        color: "brown",
        fontFamily: "'Book Antiqua', serif",
      }}
    >
      <div className="flex justify-between items-center">
        <h1
          className="text-2xl font-bold"
          style={{ color: "brown" }}
        >
          Select Clothing Items
        </h1>
        <div className="space-x-4">
          <Button onClick={handleSave} variant="default">
            Save Selection
          </Button>
          <Button asChild variant="outline">
            <Link to="/signed-in">Back</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRESET_CLOTHES.map((item) => (
          <Card key={item.id}>
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
              style={{ backgroundColor: "lightyellow" }}
            >
              <h3 className="font-semibold">{item.name}</h3>
              <Checkbox
                // Remove the default 'lightblue' style
                // Add custom style for border = seagreen, background = lightyellow
                style={{
                  backgroundColor: "lightyellow",
                  border: "2px solid seagreen",
                }}
                checked={selectedItems.has(item.id)}
                onCheckedChange={() => handleSelect(item.id)}
              />
            </CardHeader>
            <CardContent style={{ backgroundColor: "lightyellow" }}>
              <div className="flex flex-wrap gap-2">
                {item.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-100 rounded-full text-sm"
                    style={{
                      backgroundColor: "lightyellow",
                      border: "1px solid brown",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
