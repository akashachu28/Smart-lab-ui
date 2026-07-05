// Levenshtein distance - measures how many edits (insert/delete/substitute)
// separate two words. Handles typos like "sulfric" vs "sulfuric".
function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // deletion
          dp[i][j - 1],     // insertion
          dp[i - 1][j - 1]  // substitution
        );
      }
    }
  }
  return dp[a.length][b.length];
}

// Converts edit distance into a 0-1 similarity score
function wordSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const distance = levenshtein(a, b);
  return 1 - distance / maxLen;
}

// Basic stopwords - ignored so they don't dilute the match
const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'for', 'to', 'of', 'in', 'on',
  'me', 'my', 'i', 'please', 'can', 'you', 'give', 'show', 'what'
]);

function tokenize(str: string): string[] {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // strip punctuation
    .split(/\s+/)
    .filter(word => word.length > 0 && !STOPWORDS.has(word));
}

// Word-level similarity threshold - two words count as "matching"
// if they're at least this similar (handles typos)
const WORD_MATCH_THRESHOLD = 0.72;

// Minimum overall score for a key to be considered a valid match
const RESPONSE_MATCH_THRESHOLD = 0.55;

/**
 * Scores how well the key's tokens are represented in the input tokens,
 * regardless of order, typos, or extra/missing words.
 */
function scoreKeyAgainstInput(keyTokens: string[], inputTokens: string[]): number {
  if (keyTokens.length === 0) return 0;

  let matchedCount = 0;

  for (const keyWord of keyTokens) {
    let bestSim = 0;
    for (const inputWord of inputTokens) {
      const sim = wordSimilarity(keyWord, inputWord);
      if (sim > bestSim) bestSim = sim;
    }
    if (bestSim >= WORD_MATCH_THRESHOLD) {
      matchedCount += bestSim; // partial credit weighting
    }
  }

  return matchedCount / keyTokens.length;
}

/**
 * Finds the best matching key from aiResponses given a raw user input.
 * Returns the matched key, or null if nothing scores high enough.
 */
export function findBestResponseKey(
  userInput: string,
  responseKeys: string[]
): string | null {
  const inputTokens = tokenize(userInput);
  if (inputTokens.length === 0) return null;

  let bestKey: string | null = null;
  let bestScore = 0;

  for (const key of responseKeys) {
    const keyTokens = tokenize(key);
    const score = scoreKeyAgainstInput(keyTokens, inputTokens);

    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  return bestScore >= RESPONSE_MATCH_THRESHOLD ? bestKey : null;
}