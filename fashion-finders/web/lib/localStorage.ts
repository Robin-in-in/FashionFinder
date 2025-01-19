interface ClothingItem {
  id: string;
  name: string;
  tags: {
    color?: string;
    material?: string;
  }[];
}

const STORAGE_KEY = "fashion-finders-selected-clothes";

/**
 * Saves selected clothing items to localStorage
 * @param clothes Array of clothing items to save
 */
export const saveSelectedClothes = (clothes: ClothingItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clothes));
  } catch (error) {
    console.error("Failed to save clothes to localStorage:", error);
  }
};

/**
 * Retrieves selected clothing items from localStorage
 * @returns Array of clothing items or empty array if none found
 */
export const getSelectedClothes = (): ClothingItem[] => {
  try {
    const storedClothes = localStorage.getItem(STORAGE_KEY);
    if (!storedClothes) return [];

    const parsedClothes = JSON.parse(storedClothes);
    return Array.isArray(parsedClothes) ? parsedClothes : [];
  } catch (error) {
    console.error("Failed to retrieve clothes from localStorage:", error);
    return [];
  }
};

/**
 * Removes all selected clothing items from localStorage
 */
export const removeSelectedClothes = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to remove clothes from localStorage:", error);
  }
};