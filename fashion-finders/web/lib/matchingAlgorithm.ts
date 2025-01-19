/**
 * Interface for a clothing match result including score and matched tags
 */
export interface MatchResult {
  /** The matched clothing item */
  item: {
    name: string;
    tags: string[];
  };
  /** Match score from 0-1 */
  score: number;
  /** List of tags that matched */
  matchedTags: string[];
}

/**
 * Normalizes a tag for comparison by converting to lowercase and trimming whitespace
 */
function normalizeTag(tag: string): string {
  return tag.toLowerCase().trim();
}

/**
 * Calculates a match score and identifies matching tags between two sets of tags
 */
function calculateMatchScore(
  inputTags: string[],
  itemTags: string[]
): { score: number; matchedTags: string[] } {
  const normalizedInputTags = inputTags.map(normalizeTag);
  const normalizedItemTags = itemTags.map(normalizeTag);
  
  const matchedTags: string[] = [];
  
  // Find all matching tags
  for (const inputTag of normalizedInputTags) {
    for (const itemTag of normalizedItemTags) {
      if (inputTag === itemTag) {
        // Store original tag from item for display
        matchedTags.push(itemTags[normalizedItemTags.indexOf(itemTag)]);
        break;
      }
    }
  }
  
  // Calculate score as ratio of matched tags to input tags
  const score = matchedTags.length / inputTags.length;
  
  return { score, matchedTags };
}

/**
 * Finds matching clothes based on input tags, sorted by match score
 */
export function findMatchingClothes(
  inputTags: string[],
  clothingItems: Array<{ name: string; tags: string[] }>
): MatchResult[] {
  const results: MatchResult[] = clothingItems.map(item => {
    const { score, matchedTags } = calculateMatchScore(inputTags, item.tags);
    return { item, score, matchedTags };
  });

  // Sort by score in descending order
  return results
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);
}