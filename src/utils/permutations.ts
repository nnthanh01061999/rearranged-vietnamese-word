import vi from "@/data/vi.dic.json";
import vowelsWithToneMap from "@/data/vowelWithTone.json";
import { arrayUnique } from "@/utils";

type WordStruct = {
  initialConsonant: string;
  vowel: string;
  finalConsonant: string;
  tone: string;
  tonePosition: number;
};

export const permutationWord = (words: string[]) => {
  const destructWords = words.map((word) => destructWord(word));
  const generates = generateAllCase(destructWords);
  const newWords = generates.map((word) => structWord(word));
  const uniqueNewWords = arrayUnique(newWords) as string[];
  const similarUniqueWords = getSimilarUniqueWord(uniqueNewWords);
  const validSpells = similarUniqueWords.filter((word) => {
    return vi?.[word as keyof typeof vi];
  });
  const completeWords = shuffleWordToCompleteWord(validSpells, words.length);
  return checkValidStruct(destructWords, completeWords);
};

export function destructWord(word: string) {
  const wordLowerCase = word.toLowerCase();

  let result = {
    initialConsonant: "",
    vowel: "",
    finalConsonant: "",
    tone: "",
    punctuation: "",
    tonePosition: 0,
  };

  for (let char of wordLowerCase) {
    if (punctuation.test(char)) {
      result.punctuation += char;
    } else if (vowelToneMap?.[char]) {
      result.vowel += vowelToneMap?.[char]?.char;
      const newTone = !result.tone || result.tone === tone_ngang ? vowelToneMap?.[char]?.tone : result.tone;
      result.tonePosition = result.vowel.length <= 2 ? result.tonePosition + (result.tone === tone_ngang && newTone !== tone_ngang ? 1 : 0) : 0;
      result.tone = newTone;
    } else if (
      !result.vowel &&
      (!result.initialConsonant || initialComposeConsonants?.[result.initialConsonant[result.initialConsonant.length - 1]]?.includes(char)) &&
      initialConsonants.includes(char)
    ) {
      result.initialConsonant += char;
    } else if (finalConsonants.includes(char)) {
      result.finalConsonant += char;
    }
  }

  return result;
}

export const getAllDestructWordSimilar = (destructWord: WordStruct[]) => {
  return destructWord.reduce((prev, cur) => {
    const similarInitialConsonants = initialConsonantSimilarMap[cur.initialConsonant];
    const similarVowels = vowelSimilarMap[cur.vowel];
    const similarFinalConsonants = finalConsonantSimilarMap[cur.finalConsonant];

    const allCase: WordStruct[] = [];

    similarInitialConsonants?.forEach((initialConsonant) => {
      allCase.push({ ...cur, initialConsonant });
      similarVowels?.forEach((vowel) => {
        allCase.push({ ...cur, initialConsonant, vowel });
        similarFinalConsonants?.forEach((finalConsonant) => {
          allCase.push({ ...cur, initialConsonant, vowel, finalConsonant });
        });
      });
    });
    return [...prev, cur, ...allCase];
  }, [] as WordStruct[]);
};

export const generateAllCase = (input: WordStruct[]) => {
  const initialConsonants: string[] = [];
  const vowels: string[] = [];
  const finalConsonants: string[] = [];
  const tones: string[] = [];
  const tonePositions: number[] = [];
  input.forEach((item) => {
    initialConsonants.push(item.initialConsonant);
    vowels.push(item.vowel);
    finalConsonants.push(item.finalConsonant);
    tones.push(item.tone);
    tonePositions.push(item.tonePosition);
  });

  const result: WordStruct[] = [];

  initialConsonants.forEach((initialConsonant) => {
    vowels.forEach((vowel) => {
      tones.forEach((tone) => {
        tonePositions.forEach((tonePosition) => {
          finalConsonants.forEach((finalConsonant) => {
            result.push({ initialConsonant, vowel, finalConsonant, tone, tonePosition });
          });
        });
      });
    });
  });
  return result;
};

export const structWord = (input: WordStruct) => {
  const { initialConsonant, vowel, finalConsonant, tone, tonePosition } = input;
  const vowelStruct = vowel ? vowelsWithToneMap[vowel as keyof typeof vowelsWithToneMap] : undefined;
  const vowelWithTone = vowelStruct ? vowelStruct[tone as keyof typeof vowelStruct][tonePosition] : undefined;
  return initialConsonant + (vowelWithTone || vowel) + finalConsonant;
};

export function getCombinations(arr: string[], n: number): string[][] {
  if (n === 0) return [[]];
  if (arr.length === 0) return [];

  const [first, ...rest] = arr;
  const withFirst = getCombinations(rest, n - 1).map((combination) => [first, ...combination]);
  const withoutFirst = getCombinations(rest, n);

  return [...withFirst, ...withoutFirst];
}

export const shuffleWordToCompleteWord = (word: string[], pick: number): string[] => {
  // Get all combinations of the specified length
  const combinations = getCombinations(word, pick);

  // Convert combinations into complete words
  return combinations.map((combination) => combination.join(" "));
};

export const getMapFromStruct = (wordStruct: WordStruct[]) => {
  return wordStruct.reduce(
    (prev, cur) => ({
      initialConsonantMap: { ...prev.initialConsonantMap, [cur.initialConsonant]: true },
      vowelMap: { ...prev.vowelMap, [cur.vowel]: true },
      finalConsonantMap: { ...prev.finalConsonantMap, [cur.finalConsonant]: true },
      toneMap: { ...prev.toneMap, [cur.tone]: true },
    }),
    {
      initialConsonantMap: {},
      vowelMap: {},
      finalConsonantMap: {},
      toneMap: {},
    },
  );
};

type AnyObject = { [key: string]: any };

// Helper export function to sort an object’s keys and values
export const sortObject = (obj: AnyObject): AnyObject => {
  if (typeof obj !== "object" || obj === null) return obj;

  // Sort arrays by their elements
  if (Array.isArray(obj)) return obj.map(sortObject).sort();

  // Sort object keys
  return Object.keys(obj)
    .sort()
    .reduce((sortedObj, key) => {
      sortedObj[key] = sortObject(obj[key]);
      return sortedObj;
    }, {} as AnyObject);
};

export const getSimilarUniqueWord = (words: string[]): string[] => {
  const destructWords = words.map((word) => destructWord(word));
  const similarWordStruct = getAllDestructWordSimilar(destructWords);
  const newWords = similarWordStruct.map((word) => structWord(word));
  const uniqueNewWords = arrayUnique(newWords) as string[];
  const validSpells = uniqueNewWords.filter((word) => {
    return vi?.[word as keyof typeof vi];
  });
  return validSpells;
};

//update this check for valid word and similar word
export const checkValidStruct = (validWordStruct: WordStruct[], words: string[]) => {
  const similarWordStruct = getAllDestructWordSimilar(validWordStruct);
  const validMap = getMapFromStruct(similarWordStruct);
  const validMapJson = JSON.stringify(sortObject(validMap));

  return words.filter((word) => {
    const values = word?.split(" ");
    const destructWords = values?.map((value) => destructWord(value));
    const destructWordSimilar = getAllDestructWordSimilar(destructWords);
    const checkMap = getMapFromStruct(destructWordSimilar);
    return JSON.stringify(sortObject(checkMap)) === validMapJson;
  });
};

export const checkVietnameseSpell = (words: string[]) => {
  return words.filter((word) => {
    return vi?.[word as keyof typeof vi];
  });
};

export const tone_ngang = "ngang";

export const initialConsonants = ["a", "b", "c", "d", "đ", "g", "h", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x"];
export const finalConsonants = ["c", "m", "n", "g", "h", "p", "t", "o"];
export const punctuation = /[.,!?;:()]/;

export const initialComposeConsonants = {
  c: ["h"],
  g: ["h", "i"],
  k: ["h"],
  n: ["g", "h"],
  p: ["h"],
  q: ["u"],
  t: ["h", "r"],
} as Record<string, string[]>;

export const vowelToneMap = Object.entries(vowelsWithToneMap)?.reduce(
  (prev, [curKey, curVal]) => ({
    ...prev,
    ...Object.entries(curVal).reduce((pr, [key, val]) => ({ ...pr, ...val.reduce((p, c, i) => ({ ...p, [c]: { char: curKey, tone: key, tonePosition: i } }), {}) }), {}),
  }),
  {},
) as Record<string, { char: string; tone: string }>;

export const initialConsonantSimilarMap = {
  k: ["c"],
  c: ["k"],
  d: ["đ", "r", "g"],
  đ: ["d", "r", "g"],
  r: ["d", "đ", "g"],
  gi: ["d", "đ", "r"],
  h: ["h"],
  l: ["l"],
  m: ["m"],
  n: ["n"],
  p: ["b"],
  b: ["p"],
  t: ["th"],
  th: ["t"],
  v: ["v"],
  x: ["s"],
  s: ["x"],
  z: ["z"],
  ng: ["ngh"],
  ngh: ["ng"],
} as Record<string, string[]>;

export const vowelSimilarMap = {
  a: ["â"],
  â: ["a"],
  ă: ["a", "â"],
  e: ["ê"],
  ê: ["e"],
  i: ["i", "uy", "y"],
  // o: ["ô", "ơ"],
  // ô: ["o", "ơ"],
  // ơ: ["o", "ô"],
  u: ["ư"],
  ư: ["u"],
  y: ["y", "i", "uy"],
  ai: ["ay", "ai", "ây"],
  ao: ["au", "ao"],
  au: ["ao", "âu"],
  eo: ["êu", "eo"],
  ia: ["iê", "ia"],
  iê: ["ia", "yê"],
  oi: ["ôi", "oi"],
  ôi: ["oi", "ôi"],
  ưa: ["ươ", "ua"],
  ươi: ["uôi", "ươi"],
  yê: ["iê", "yê"],
  oai: ["oay", "oai"],
} as Record<string, string[]>;

export const finalConsonantSimilarMap = {
  c: ["t"],
  t: ["c"],
  p: ["b", "m"],
  m: ["p", "b"],
  n: ["ng", "nh"],
  ng: ["n", "nh"],
  nh: ["n", "ng"],
  ch: ["t", "c"],
} as Record<string, string[]>;
