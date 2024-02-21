import createHyphenator from "hyphen";
import patternsUk from "hyphen/patterns/uk.js";
import patternsEn from "hyphen/patterns/en-us.js";

import {
  removeMultiSpaces,
  replaceSeparator,
  addSpaceAfterSymbol,
  addSpaceBeforeSymbol,
} from "./strings.js";

import { compose } from "./fp.js";

export { formatCompanyName, formatCompanyNameEn };

// Переноси слов, які мають більше 14 символів
const configHyphenator = {
  minWordLength: 14,
  async: false,
};

const hyphenate = createHyphenator(patternsUk, configHyphenator);
const hyphenateEn = createHyphenator(patternsEn, configHyphenator);

const spaceBeforeQouteSeparators = {
  uk: [" «", "„", "“»"],
  en: [" “", "‘", "’”"],
};
const spaceAfterQouteSeparators = {
  uk: [" «„", "“", "»"],
  en: [" “„", "‘", "’"],
};

const solve3QuotesProblem = (lang) => (string) => {
  // Приклад:
  //                _   ⬇️                    _
  // 45388253 - ТОВ "ФПФ "ЄВРО КАПІТАЛ ХОЛДИНГ"
  //               _               ⬇️  _
  // 03188375 - КЗ "ІЛЛІНСЬКИЙ ПНІ" ДОР"
  //
  // 45388253 - LLC "FIF "EURO CAPITAL HOLDING""

  const separator = '"';
  const numberOfQuotes = 3;

  const { length } = string.split(separator);

  if (length - 1 !== numberOfQuotes) {
    return string;
  }

  const reSpaceBeforeQoute = /".+\s".+"/;

  const checkSpacePlace = reSpaceBeforeQoute.test(string);

  const separators = checkSpacePlace
    ? spaceBeforeQouteSeparators[lang]
    : spaceAfterQouteSeparators[lang];

  const solveQuotesProblem = replaceSeparator('"', separators);

  return solveQuotesProblem(string);
};

const solve2QuotesProblem = replaceSeparator('"', [" «", "» "]);
const solve4QuotesProblem = replaceSeparator('"', [" «", "» ", " «", "» "]);

const solve2QuotesProblemEn = replaceSeparator('"', [" “", "” "]);
const solve4QuotesProblemEn = replaceSeparator('"', [" “", "” ", " “", "” "]);

const addSpaceAfterComma = addSpaceAfterSymbol(",");
const addSpaceAfterDot = addSpaceAfterSymbol(".");

const addSpaceBeforeLeftBracket = addSpaceBeforeSymbol("(");
const addSpaceAfterRightBracket = addSpaceAfterSymbol(")");

const replaceDoubleDoubleQoutesEn = (string) => string.replace('""', '"');

const formatCompanyName = compose(
  solve2QuotesProblem,
  solve3QuotesProblem("uk"),
  solve4QuotesProblem,
  addSpaceAfterComma,
  addSpaceAfterDot,
  addSpaceBeforeLeftBracket,
  addSpaceAfterRightBracket,
  removeMultiSpaces,
  hyphenate,
);

const formatCompanyNameEn = compose(
  solve2QuotesProblemEn,
  solve3QuotesProblem("en"),
  solve4QuotesProblemEn,
  replaceDoubleDoubleQoutesEn,
  addSpaceAfterComma,
  addSpaceAfterDot,
  addSpaceBeforeLeftBracket,
  addSpaceAfterRightBracket,
  removeMultiSpaces,
  hyphenateEn,
);
