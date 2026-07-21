/**
 * HashCraft Hashtag Generator Utility Logic
 * Platform-optimized rules and variations
 */

// Helper to format string into CamelCase for hashtags
export const formatHashtag = (str) => {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '') // remove special chars
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

// Platform definitions and rules
export const platformRules = {
  youtube: {
    name: 'YouTube',
    icon: 'Youtube',
    minTags: 5,
    maxTags: 15,
    recommendation: 'Use 5–15 hashtags. Mix broad, niche, and platform tags. YouTube ignores all hashtags if video has more than 60.',
    color: '#FF0000',
    hoverClass: 'hover:text-[#FF0000]'
  },
  tiktok: {
    name: 'TikTok',
    icon: 'Music',
    minTags: 4,
    maxTags: 8,
    recommendation: 'Use 4–8 hashtags. Combine trending (#fyp, #foryou) with niche and community tags. Keep it short.',
    color: '#00f2fe',
    hoverClass: 'hover:text-[#00f2fe]'
  },
  twitter: {
    name: 'X (Twitter)',
    icon: 'Twitter',
    minTags: 1,
    maxTags: 3,
    recommendation: 'Use 1–3 hashtags max. Focus on high relevance. Character limit matters, so keep hashtags brief.',
    color: '#1DA1F2',
    hoverClass: 'hover:text-[#1DA1F2]'
  },
  instagram: {
    name: 'Instagram',
    icon: 'Instagram',
    minTags: 15,
    maxTags: 30,
    recommendation: 'Use 15–30 hashtags. Mix high-volume (millions of posts), medium-volume (hundreds of thousands), and low-competition tags.',
    color: '#E1306C',
    hoverClass: 'hover:text-[#E1306C]'
  },
  snapchat: {
    name: 'Snapchat',
    icon: 'Ghost',
    minTags: 3,
    maxTags: 5,
    recommendation: 'Use 3–5 simple, casual, and discovery-style tags. Focus on themes, events, or local elements.',
    color: '#FFFC00',
    hoverClass: 'hover:text-[#FFFC00]'
  },
  facebook: {
    name: 'Facebook',
    icon: 'Facebook',
    minTags: 2,
    maxTags: 5,
    recommendation: 'Use 2–5 hashtags. Facebook posts with fewer, broader tags tend to get better reach.',
    color: '#1877F2',
    hoverClass: 'hover:text-[#1877F2]'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: 'Linkedin',
    minTags: 3,
    maxTags: 5,
    recommendation: 'Use 3–5 professional, industry-specific, or topic-related tags. Position at the end of the post.',
    color: '#0A66C2',
    hoverClass: 'hover:text-[#0A66C2]'
  },
  pinterest: {
    name: 'Pinterest',
    icon: 'Pinterest',
    minTags: 10,
    maxTags: 20,
    recommendation: 'Use 10–20 SEO-friendly, descriptive tags. Pinterest works like a visual search engine, so be specific.',
    color: '#BD081C',
    hoverClass: 'hover:text-[#BD081C]'
  }
};

// Suffixes dictionary to expand keywords naturally
const suffixes = {
  niche: ['Tips', 'Hacks', 'Guide', '101', 'Tutorial', 'HowTo', 'Secrets', 'Advice', 'Basics', 'Hub', 'Expert'],
  creative: ['Ideas', 'Inspiration', 'Designs', 'DIY', 'Craft', 'Style', 'Aesthetics', 'Concepts', 'Vibes'],
  community: ['Community', 'Life', 'Daily', 'Club', 'World', 'Network', 'Squad', 'Fam', 'Lovers', 'Addict'],
  trending: ['Trends', 'Viral', 'Best', 'Goals', 'Success', 'Growth', 'Movement', 'Motivation', 'Buzz']
};

const platformPlatformTags = {
  youtube: ['Shorts', 'YouTubeShorts', 'YouTube', 'Subscribe', 'VideoOfTheDay', 'YT', 'Creators'],
  tiktok: ['fyp', 'foryou', 'viral', 'trending', 'tiktok', 'duet', 'stitch', 'foryoupage'],
  twitter: ['Breaking', 'X', 'TrendingNow', 'Opinion', 'HotTake'],
  instagram: ['InstaGood', 'Instagram', 'PhotoOfTheDay', 'ExplorePage', 'Instadaily', 'PicOfTheDay'],
  snapchat: ['Snap', 'Snapchat', 'Spotlight', 'Story', 'SnapMap'],
  facebook: ['Facebook', 'Fb', 'TrendingNow', 'ViralPost', 'ShareNow'],
  linkedin: ['Business', 'Networking', 'Professional', 'Careers', 'Innovation', 'Leadership', 'Management', 'PersonalGrowth'],
  pinterest: ['Pinterest', 'PinIt', 'Inspo', 'DIYProject', 'CreativeIdeas']
};

/**
 * Main function to generate hashtags
 * @param {string} keywordsString - Comma-separated keywords input
 * @param {string} platform - Selected platform key
 * @param {boolean} randomize - Whether to shuffle and return a different variation
 * @returns {Array<string>} - List of hashtags (without the # symbol, formatted in CamelCase)
 */
export const generateHashtags = (keywordsString, platform, randomize = false) => {
  if (!keywordsString) return [];
  
  const rawKeywords = keywordsString
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0);
  
  if (rawKeywords.length === 0) return [];

  const platformInfo = platformRules[platform] || platformRules.instagram;
  const targetCount = randomize 
    ? Math.floor(Math.random() * (platformInfo.maxTags - platformInfo.minTags + 1)) + platformInfo.minTags
    : platformInfo.maxTags;

  let tagsSet = new Set();

  // 1. Process primary keywords directly
  const formattedKeywords = rawKeywords.map(k => formatHashtag(k)).filter(k => k.length > 0);
  formattedKeywords.forEach(tag => tagsSet.add(tag));

  // 2. Platform-specific additions logic
  const pTags = platformPlatformTags[platform] || [];
  
  // Suffix expansion loop
  let suffixCategories = Object.keys(suffixes);
  let keywordIdx = 0;
  let categoryIdx = 0;
  let suffixIdx = 0;

  // Keep generating tags until we reach the target count, or we run out of unique combinations
  const maxIterations = 200; // prevent infinite loops
  let iterations = 0;

  while (tagsSet.size < targetCount && iterations < maxIterations) {
    iterations++;

    // Randomize expansion vectors if requested, or do deterministic expansion
    if (randomize) {
      // Pick a random keyword
      const randomKW = formattedKeywords[Math.floor(Math.random() * formattedKeywords.length)];
      // Pick a random suffix category
      const randomCat = suffixCategories[Math.floor(Math.random() * suffixCategories.length)];
      // Pick a random suffix
      const randomSuffixList = suffixes[randomCat];
      const randomSuffix = randomSuffixList[Math.floor(Math.random() * randomSuffixList.length)];
      
      tagsSet.add(`${randomKW}${randomSuffix}`);
      
      // Occasionally mix in platform specific tags
      if (Math.random() > 0.6 && pTags.length > 0) {
        tagsSet.add(pTags[Math.floor(Math.random() * pTags.length)]);
      }
    } else {
      // Deterministic generation
      const currentKW = formattedKeywords[keywordIdx % formattedKeywords.length];
      const currentCat = suffixCategories[categoryIdx % suffixCategories.length];
      const currentSuffixList = suffixes[currentCat];
      const currentSuffix = currentSuffixList[suffixIdx % currentSuffixList.length];

      tagsSet.add(`${currentKW}${currentSuffix}`);

      // Cycle indexes
      suffixIdx++;
      if (suffixIdx >= currentSuffixList.length) {
        suffixIdx = 0;
        categoryIdx++;
        if (categoryIdx >= suffixCategories.length) {
          categoryIdx = 0;
          keywordIdx++;
        }
      }

      // Interleave platform tags
      if (iterations % 4 === 0 && pTags.length > 0) {
        tagsSet.add(pTags[Math.floor((iterations / 4) % pTags.length)]);
      }
    }
  }

  // Convert set to array
  let result = Array.from(tagsSet);

  // If randomized, shuffle results slightly
  if (randomize) {
    result = result.sort(() => Math.random() - 0.5);
  }

  // Trim to platform limit
  return result.slice(0, targetCount);
};
