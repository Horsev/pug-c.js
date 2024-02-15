const atuCodeCreator = (cityName) => {
  const cityConfig = {
    "місто Дніпро": "UA12020010010037010",
    "місто Кам'янське": "UA12040150010056523",
    "місто Кривий Ріг": "UA12060170010065850",
    "селище міського типу Томаківка": "UA12080130010022918",
    "місто Сімферополь": "UA01160330010074014",
    "місто Бахчисарай": "UA01020050010045207",
    "місто Євпаторія": "UA01080150010090810",
    "місто Армянськ": "UA01140010010085478",
    "місто Судак": "UA01180650010079746",
    "місто Ялта": "UA01200310010053783",
    "місто Інкерман": "UA01020210010017308",
    "місто Саки": "UA01080650010078157",
    "місто Яни Капу": "UA01140230010018772",
    "місто Феодосія": "UA01180710010062019",
    "місто Білогірськ": "UA01040050010076142",
    "місто Керч": "UA01100210010057785",
    "місто Алупка": "UA01200010010092886",
    "місто Джанкой": "UA01060050010078305",
    "місто Щолкіне": "UA01100550010023633",
    "місто Старий Крим": "UA01180630010017505",
    "місто Алушта": "UA01200030010082401",
    "місто Севастополь": "UA85000000000065278",
    "місто Київ": "UA80000000000093317",
    "місто Львів": "UA46060250010015970",
    "місто Херсон": "UA65100150010064384",
    "місто Чернігів": "UA74100390010054825",
    "місто Житомир": "UA18040190010057814",
    "місто Прип'ять": "UA32000000010085013",
    "місто Чорнобиль": "UA32000000020050699",
    "місто Чорнобиль(з)": "UA32000000020050699",
    "місто Миколаїв": "UA48060150010035747",
    "місто Суми": "UA59080270010036634",
    "місто Кропивницький": "UA35040210010019355",
    "місто Одеса": "UA51100270010076757",
    "місто Черкаси": "UA71080490010015879",
    "місто Запоріжжя": "UA23060070010069526",
    "місто Алчевськ": "UA44020010010037242",
    "місто Зоринськ": "UA44020010020065957",
    "місто Кипуче": "UA44020010030038674",
    "місто Перевальськ": "UA44020010040016131",
    "місто Зимогір’я": "UA44020030010028948",
    "місто Кадіївка": "UA44020050010070086",
    "місто Алмазна": "UA44020050020022649",
    "місто Брянка": "UA44020050030024674",
    "місто Голубівка": "UA44020050040095366",
    "місто Ірміно": "UA44020050050032380",
    "місто Первомайськ": "UA44020050060040462",
    "місто Довжанськ": "UA44040010010080356",
    "місто Вознесенівка": "UA44040010020028814",
    "місто Сорокине": "UA44040030010012509",
    "місто Суходільськ": "UA44040030020035651",
    "місто Луганськ": "UA44060010010012753",
    "місто Олександрівськ": "UA44060010020043276",
    "місто Лутугине": "UA44060030010090701",
    "місто Молодогвардійськ": "UA44060050010032095",
    "місто Антрацит": "UA44080010010047352",
    "місто Ровеньки": "UA44080030010061353",
    "місто Хрустальний": "UA44080050010029178",
    "місто Боково-Хрустальне": "UA44080050020089007",
    "місто Міусинськ": "UA44080050030035556",
    "місто Петрово-Красносілля": "UA44080050040050712",
    "місто Сватове": "UA44100110010094316",
    "місто Гірське": "UA44120010010055038",
    "місто Золоте": "UA44120010020096222",
    "місто Кремінна": "UA44120030010038707",
    "місто Лисичанськ": "UA44120050010021900",
    "місто Новодружеськ": "UA44120050020047657",
    "місто Привілля": "UA44120050030024381",
    "місто Попасна": "UA44120070010080343",
    "місто Рубіжне": "UA44120090010096548",
    "місто Сєвєродонецьк": "UA44120110010072887",
    "місто Старобільськ": "UA44140110010014704",
    "місто Щастя": "UA44160090010046671",
    "місто Кременчук": "UA53020110010031694",
    "місто Полтава": "UA53080370010073240",
    "місто Харків": "UA63120270010096107",
    "місто Донецьк": "UA14080030010048113",
    "місто Залізне": "UA14020110020077205",
    "місто Залізне(пн)": "UA14020110020077205",
    "місто Бунге": "UA14060070020037960",
    "місто Моспине": "UA14080030020041048",
    "місто Зугрес": "UA14080090020041530",
    "місто Горлівка": "UA14060030010082815",
    "місто Макіївка": "UA14080070010078220",
    "місто Гірник": "UA14160110020099716",
    "місто Маріуполь": "UA14140050010029262",
    "село Каташин": "UA05040270100070244",
  };

  return cityConfig[cityName] || null;
};

const toTitleCase = (string) => {
  const ukWordRegex = /[а-щєґіїюяь']+/gi;

  const replaceWords = (regex, callback) => (str) =>
    typeof str === "string" ? str.replace(regex, callback) : str;

  const capitalizeFirstLetter = ([firstLetter = "", ...rest]) =>
    firstLetter.toUpperCase() + rest.join("").toLowerCase();

  return replaceWords(ukWordRegex, capitalizeFirstLetter)(string);
};

export const processAddress = (location) => {
  const uaAlphabet = "а-щєґіїюяь'";

  const ual = `[${uaAlphabet}\\-\\.\\s()\\d]+`;
  const uald = `[${uaAlphabet}\\-\\.\\s()\\d/]+`;

  const r = (re, flags = "u") =>
    new RegExp(
      re
        .replace(/#[^\n]*/gm, "")
        .replace(/\\#/gm, "#")
        .replace(/\s/gm, ""),
      flags,
    );

  const separator = ",\\s";

  const stateSuffix = ["обл\\."].join("|");
  const regionSuffix = ["р-н", "район"].join("|");
  const cityPrefix = [
    "селище\\sміського\\sтипу",
    "місто",
    "село",
    "селище",
  ].join("|");
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

  const parsedAddresses = parser(location) || location;

  const typograph = (address) => {
    if (!address || address.address) return address;
    const { UK, zip, city, state, street, region, building, block, room } =
      address;

    const toLowerCase = (str) => str.toLowerCase();

    const addSpaceAfteDot = /\.(?=[^\s])/g;
    const doubleSpace = /  +/g;

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

  return typograph(parsedAddresses) || location;
};

export const regexKOATTY = (location) => {
  const { zip, country, parts, address } = location;

  const isEmptyCollection = (input) =>
    !input ||
    (Array.isArray(input) && input.length === 0) ||
    (typeof input === "object" &&
      !Array.isArray(input) &&
      Object.keys(input).length === 0);

  const processAndJoinAddress = (_addr) =>
    Object.values(processAddress(_addr)).filter(Boolean).join(", ");

  if (isEmptyCollection(parts)) return processAndJoinAddress(address);

  const r = (re, flags = "u") =>
    new RegExp(
      re
        .replace(/#[^\n]*/gm, "")
        .replace(/\\#/gm, "#")
        .replace(/\s/gm, ""),
      flags,
    );

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

  const КАТОТТГFirstLevelCodes = [
    "01",
    "05",
    "07",
    "12",
    "14",
    "18",
    "21",
    "23",
    "26",
    "32",
    "35",
    "44",
    "46",
    "48",
    "51",
    "53",
    "56",
    "59",
    "61",
    "63",
    "65",
    "68",
    "71",
    "73",
    "74",
    "80",
    "85",
  ].join("|");

  const reКАТОТТГFirstLevel = new RegExp(
    `^(${КАТОТТГFirstLevelCodes})\\d{15}$`,
  );

  const КАТОТТГ = reКАТОТТГFirstLevel.test(atuCode)
    ? `UA${atuCode}`
    : atuCodeCreator(settlement);
  const reAlphabetUA = "[a-щьюяґєії]";

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

  const toLowerCase = (str) => str.toLowerCase();

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

export const addressCreator = (obj) => {
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
