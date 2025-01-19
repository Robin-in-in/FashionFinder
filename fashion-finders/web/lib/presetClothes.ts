// Defines preset clothing items and their tags for the Fashion Finders application

export interface PresetClothingItem {
  id: string;
  name: string;
  tags: string[];
}

export const PRESET_CLOTHES: PresetClothingItem[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    tags: ["blue"],
  },
  {
    id: "2",
    name: "Navy Blue Sweater",
    tags: ["navy-wool", "winter", "knitwear"]
  },
  {
    id: "3",
    name: "Black Button-Up Shirt",
    tags: ["black-cotton", "formal", "business"]
  },
  {
    id: "4",
    name: "Blue Denim Jeans",
    tags: ["blue-denim", "casual", "everyday"]
  },
  {
    id: "5",
    name: "Black Dress Pants",
    tags: ["black-polyester", "formal", "business"]
  },
  {
    id: "6",
    name: "Khaki Chinos",
    tags: ["khaki-cotton", "casual", "business-casual"]
  },
  {
    id: "7",
    name: "Black Leather Jacket",
    tags: ["black-leather", "outerwear", "casual"]
  },
  {
    id: "8",
    name: "Grey Wool Coat",
    tags: ["grey-wool", "outerwear", "winter"]
  },
  {
    id: "9",
    name: "Little Black Dress",
    tags: ["black-polyester", "formal", "evening"]
  },
  {
    id: "10",
    name: "Floral Summer Dress",
    tags: ["floral-print", "multicolor-cotton", "summer"]
  },
  {
    id: "11",
    name: "Red Cashmere Sweater",
    tags: ["red-cashmere", "luxury", "winter"]
  },
  {
    id: "12",
    name: "White Linen Blazer",
    tags: ["white-linen", "summer", "business-casual"]
  }
];




