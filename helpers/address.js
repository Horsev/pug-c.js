import { r } from "./regex.js";
import { compose } from "./fp.js";

import {
  CITIES_CODES,
  UA_ALPHABET,
  КАТОТТГ_FIRST_LEVEL_CODES,
} from "../constants/index.js";

import { capitalizeWord, toLowerCase } from "./strings.js";

export { processAddress, regexKOATTY, addressCreator };

const atuCodeCreator = (cityName) => CITIES_CODES[cityName] || null;

const ukWordRegex = new RegExp(`[${UA_ALPHABET}]+`, "gi");

const replaceWords = (regex, callback, str) =>
  typeof str === "string" ? str.replace(regex, callback) : str;

const toTitleCase = (string) =>
  replaceWords(ukWordRegex, capitalizeWord, string);

const ual = `[${UA_ALPHABET}\\-\\.\\s()\\d]+`;
const uald = `[${UA_ALPHABET}\\-\\.\\s()\\d/]+`;

const separator = ",\\s";

const stateSuffix = ["обл\\."].join("|");
const regionSuffix = ["р-н", "район"].join("|");

const cityPrefix = ["селище\\sміського\\sтипу", "місто", "село", "селище"].join(
  "|",
);

const streetsPrefix = [
  "вулиця",
  "вул\\.",
  "провулок",
  "пров\\.",
  "проспект",
  "просп.",
  "пр\\.",
  "бульвар",
  "шосе",
  "набережна",
].join("|");

const streetsSuffix = [
  "бульвар",
  "шосе",
  "площа",
  "пл.",
  "проспект",
  "узвіз",
  "набережна",
  "дорога",
].join("|");

const buildingPrefix = ["будинок"].join("|");
const blockPrefix = ["корпус"].join("|");
const roomPrefix = [
  "квартира",
  "приміщення",
  "офіс",
  "кабінет",
  "нежиле\\sприміщення",
].join("|");

const re = r(
  String.raw`
  # Address parser
  (?<UK>Україна)
  
  ${separator}
  (?<zip>\d{5})
  
  # Optional
  (
    ${separator}
    (?<state>${ual}\s${stateSuffix})
  )?
  
  # Optional
  (
    ${separator}
    (?<region>${ual}\s${regionSuffix})
  )?
  
  ${separator}
  (?<city>(${cityPrefix})\s${ual})
  
  ${separator}
  (?<street>((${streetsPrefix})?(\s)?${ual})|(${ual}\s(${streetsSuffix})))
  
  ${separator}
  (?<building>
    # Optional
    (
      (${buildingPrefix})\s
    )?
    ${uald}
  )

  # Optional
  (
    ${separator}
    (?<block>(${blockPrefix})\s${uald})
  )?
  
  # Optional
  (
    ${separator}
    (?<room>(${roomPrefix})\s${uald})
  )?
  `,
  "i",
);

const parser = (address) =>
  address && address.match(re) ? re.exec(address).groups : { address };

const typograph = (address) => {
  if (!address || address.address) return address;
  const { UK, zip, city, state, street, region, building, block, room } =
    address;

  const addSpaceAfteDot = /\.(?=[^\s])/g;
  const doubleSpace = /\s+/g;

  return {
    UK: UK && UK.replace(/Україна/i, "Україна"),
    zip,
    state: state && state.replace(/обл\./, "область"),
    region: region && region.replace(/р-н/i, "район"),
    city,
    street:
      street &&
      street
        .trim()
        .replace(/вул\./i, "вулиця ")
        .replace(/просп\.|пр\./i, "проспект ")
        .replace(/пров\./i, "провулок ")
        .replace(/пл\./i, "площа ")
        .replace(doubleSpace, " ")
        .replace(addSpaceAfteDot, ". ")
        .split(" ")
        .map(toTitleCase)
        .join(" ")
        .replace(
          /проспект|площа|вулиця|бульвар|провулок|шосе|набережна/i,
          toLowerCase,
        ),
    building: building && building.replace(/будинок/i, "будинок"),
    block: block && block.replace(/корпус/i, "корпус"),
    room: room && room.replace(/квартира/i, "квартира"),
  };
};

const parseAddress = compose(typograph, parser);

const processAddress = (address) => parseAddress(address);

const addressToString = (address) =>
  Object.values(processAddress(address)).filter(Boolean).join(", ");

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const regexKOATTY = (location) => {
  const { zip, country, parts, address } = location;

  if (isEmptyObject(parts)) return addressToString(address);

  const reAlphabetUA = `[a-щьюяґєії]`;

  const {
    atu,
    street,
    house,
    houseType,
    numType,
    atuCode,
    building,
    buildingType,
    num,
  } = parts;

  const [settlement, ...rest] = atu.split(", ").reverse();

  const КАТОТТГFirstLevelCodes = КАТОТТГ_FIRST_LEVEL_CODES.join("|");

  const reКАТОТТГFirstLevel = new RegExp(
    `^(${КАТОТТГFirstLevelCodes})\\d{15}$`,
  );

  const КАТОТТГ = reКАТОТТГFirstLevel.test(atuCode)
    ? `UA${atuCode}`
    : atuCodeCreator(settlement);

  const reSplitNumberLetter = r(
    String.raw`
    ^
      (?
        <houseNumber>\d+
      )
        #Optional
        (
          [-\s]
        )?
      (?
        <houseLetter>${reAlphabetUA}+
      )?$
      `,
  );

  const parsedHouse = reSplitNumberLetter.test(house)
    ? house.toLowerCase().match(reSplitNumberLetter).groups
    : { houseNumber: house };

  const addSpaceAfteDot = /\.(?=[^\s])/g;
  const doubleSpace = /  +/g;

  return {
    country,
    zip,
    locality:
      [...rest]
        .reverse()
        .join(", ")
        .replace(/обл\./, "область")
        .replace(/р-н/i, "район") || undefined,
    settlement: КАТОТТГ
      ? {
          КАТОТТГ,
          settlement,
        }
      : settlement,
    street:
      (street &&
        street
          .trim()
          .toLowerCase()
          .replace(/вул\./i, "вулиця ")
          .replace(/просп\.|пр\./i, "проспект ")
          .replace(/пров\./i, "провулок ")
          .replace(/пл\./i, "площа ")
          .replace(doubleSpace, " ")
          .replace(addSpaceAfteDot, ". ")
          .split(" ")
          .map(toTitleCase)
          .join(" ")
          .replace(
            /проспект|площа|вулиця|бульвар|провулок|шосе|набережна/i,
            toLowerCase,
          )) ||
      undefined,
    houseType,
    ...parsedHouse,
    buildingType,
    building,
    numType,
    num,
  };
};

const appendIfTruthy = (key) => (value) =>
  value ? [`${key ? `${key} ` : ""}${value}`] : [];

const combineParts = (...parts) =>
  parts.reduce((acc, part) => [...acc, ...part], []).join(", ");

const formatLinkParts = (...args) =>
  combineParts(...args.map(appendIfTruthy()));

const addressCreator = (obj) => {
  if (typeof obj === "string") return obj;

  const {
    country,
    zip,
    locality,
    settlement,
    street,
    houseType,
    houseNumber,
    houseLetter,
    buildingType,
    building,
    numType,
    num,
  } = obj;

  const preLink = formatLinkParts(country, zip, locality);

  const filteredBuilding = [buildingType, building, numType, num].filter(
    Boolean,
  );

  const afterAll = formatLinkParts(...filteredBuilding);

  const linkElement =
    typeof settlement === "object" && settlement.settlement
      ? { text: settlement.settlement, link: settlement["КАТОТТГ"] }
      : { text: settlement, link: null };

  return {
    creator: true,
    preLink,
    linkElement,
    boldText: street,
    houseType,
    houseNumber,
    houseLetter,
    afterAll,
  };
};
