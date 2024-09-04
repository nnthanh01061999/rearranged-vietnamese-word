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

type WorkStructSet = {
  initialConsonants: string[];
  vowels: string[];
  finalConsonants: string[];
  tones: string[];
  tonePositions: number[];
};

const initStructSet: WorkStructSet = {
  initialConsonants: [],
  vowels: [],
  finalConsonants: [],
  tones: [],
  tonePositions: [],
};

export const permutationWord = async (words: string[]) => {
  const destructWords = words.map((word) => destructWord(word));
  const generates = generateAllCase(destructWords);
  const newWords = generates.map((word) => structWord(word));
  const uniqueNewWords = arrayUnique(newWords) as string[];
  const similarUniqueWords = getSimilarUniqueWord(uniqueNewWords);
  const validSpells = checkVietnameseSpell(similarUniqueWords);
  const completeWords = shuffleWordToCompleteWord(validSpells, words.length);
  return {
    validWords: checkValidStruct(words.join(", "), destructWords, completeWords),
    completeWords,
  };
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

const generateCasesFromSets = ({
  finalConsonants,
  initialConsonants,
  vowels,
  tonePositions,
  tones,
}: {
  initialConsonants: string[];
  vowels: string[];
  finalConsonants: string[];
  tones: string[];
  tonePositions: number[];
}) => {
  const result: WordStruct[] = [];

  const uniqueInitialConsonants = arrayUnique(initialConsonants) as string[];
  const uniqueVowels = arrayUnique(vowels) as string[];
  const uniqueFinalConsonants = arrayUnique(finalConsonants) as string[];
  const uniqueTones = arrayUnique(tones) as string[];
  const uniqueTonePositions = arrayUnique(tonePositions) as number[];

  uniqueInitialConsonants.forEach((initialConsonant) => {
    uniqueVowels.forEach((vowel) => {
      uniqueFinalConsonants.forEach((finalConsonant) => {
        uniqueTones.forEach((tone) => {
          uniqueTonePositions.forEach((tonePosition) => {
            result.push({ initialConsonant, vowel, finalConsonant, tone, tonePosition });
          });
        });
      });
    });
  });

  return result;
};

export const getAllDestructWordSimilar = (destructWord: WordStruct[]) => {
  const destructWordSimilar = destructWord.reduce((prev, cur) => {
    const initialConsonants = initialConsonantSimilarMap[cur.initialConsonant] || [];
    const vowels = vowelSimilarMap[cur.vowel] || [];
    const finalConsonants = finalConsonantSimilarMap[cur.finalConsonant] || [];

    return {
      initialConsonants: [...prev.initialConsonants, cur.initialConsonant, ...initialConsonants],
      vowels: [...prev.vowels, cur.vowel, ...vowels],
      finalConsonants: [...prev.finalConsonants, cur.finalConsonant, ...finalConsonants],
      tones: [...prev.tones, cur.tone],
      tonePositions: [...prev.tonePositions, cur.tonePosition],
    };
  }, initStructSet);
  return generateCasesFromSets(destructWordSimilar);
};

export const generateAllCase = (input: WordStruct[]) => {
  const structSet = input.reduce((prev, cur) => {
    return {
      initialConsonants: [...prev.initialConsonants, cur.initialConsonant],
      vowels: [...prev.vowels, cur.vowel],
      finalConsonants: [...prev.finalConsonants, cur.finalConsonant],
      tones: [...prev.tones, cur.tone],
      tonePositions: [...prev.tonePositions, cur.tonePosition],
    };
  }, initStructSet);

  return generateCasesFromSets(structSet);
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
  const combinations = getCombinations(word, pick);
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

export const sortObject = (obj: AnyObject): AnyObject => {
  if (typeof obj !== "object" || obj === null) return obj;

  if (Array.isArray(obj)) return obj.map(sortObject).sort();

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
  return uniqueNewWords;
};

export const checkValidStruct = (originalWord: string, validWordStruct: WordStruct[], words: string[]) => {
  const similarWordStruct = getAllDestructWordSimilar(validWordStruct);
  const validMap = getMapFromStruct(similarWordStruct);
  const validMapJson = JSON.stringify(sortObject(validMap));

  return words.filter((word) => {
    if (word === originalWord) return false;

    const values = word?.split(" ");

    const originalWords = originalWord.split(" ");
    const originalLength = originalWords.length;
    const firstOriginalWord = originalWords[0];
    const lastOriginalWord = originalWords[originalWords.length - 1];
    const firstWord = values[0];
    const lastWord = values[values.length - 1];

    if ((originalLength <= 2 && firstOriginalWord === firstWord) || firstOriginalWord.includes(firstWord) || firstWord.includes(firstOriginalWord)) return false;
    if ((originalLength <= 2 && lastOriginalWord === lastWord) || lastOriginalWord.includes(lastWord) || lastWord.includes(lastOriginalWord)) return false;

    const destructWords = values?.map((value) => destructWord(value));
    const destructWordSimilar = getAllDestructWordSimilar(destructWords);
    const checkMap = getMapFromStruct(destructWordSimilar);
    return JSON.stringify(sortObject(checkMap)) === validMapJson;
  });
};

export const checkVietnameseSpell = (words: string[]) => {
  return words.filter((word) => {
    return vi?.[word.toLocaleLowerCase() as keyof typeof vi];
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
  v: ["v"],
  x: ["s"],
  s: ["x"],
  z: ["z"],
  ng: ["ngh"],
  ngh: ["ng"],
} as Record<string, string[]>;

export const vowelSimilarMap = {
  e: ["ê"],
  ê: ["e"],
  u: ["ư"],
  ư: ["u"],
  i: ["y"],
  y: ["i"],
  uy: ["i"],
  ai: ["ay", "âi"],
  ay: ["ai", "ây"],
  ây: ["ai", "ay"],
  ao: ["au", "âu"],
  au: ["ao", "âu"],
  âu: ["ao", "au"],
  eo: ["êu"],
  êu: ["iêu", "iu", "yêu"],
  iêu: ["êu", "yêu", "iu"],
  yêu: ["iêu", "iu", "êu"],
  iu: ["iêu", "yêu", "êu"],
  ia: ["iê", "yê"],
  iê: ["ia", "yê"],
  ua: ["uô", "ưa"],
  uô: ["ua", "ươ"],
  ưa: ["ua", "ươ"],
  ươ: ["uô", "ưa"],
  ươi: ["uôi", "ươu"],
  uôi: ["ươi", "ươu"],
  oai: ["oay", "oao"],
  oay: ["oai", "oao"],
  oao: ["oai", "oay"],
  in: ["inh"],
  inh: ["in"],
  an: ["ang", "ân"],
  ang: ["an", "âng"],
  ươu: ["ươi", "uôi"],
} as Record<string, string[]>;

export const finalConsonantSimilarMap = {
  c: ["t", "ch"],
  t: ["c", "ch"],
  b: ["p", "m"],
  p: ["b", "m"],
  m: ["p", "b"],
  n: ["ng", "nh"],
  ng: ["n", "nh"],
  nh: ["n", "ng"],
  ch: ["t", "c"],
} as Record<string, string[]>;
