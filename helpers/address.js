import r from "./regex.js";
import {
  toLowerCase,
  capitalizeUAword,
  removeMultiSpaces,
  replaceRegex,
  addSpaceAfterSymbol,
} from "./strings.js";
import { compose } from "./fp.js";

const reAlphabetUA = "[a-щьюяґєії]";

const КАТОТТГ = {
  "місто Дніпро": "UA12020010010037010",
  "місто Кам'янське": "UA12040150010056523",
  "місто Кривий Ріг": "UA12060170010065850",
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
};

const getAddress = (address) => {
  const { zip, country, parts } = address;
  const { atu, street, houseType, house, flat, numType, num } = parts;

  const [settlement, ...atuRest] = atu.split(", ").reverse();

  const formatSettelment = (string) =>
    КАТОТТГ[string] ? `<a href="/c/${КАТОТТГ[string]}">${string}</a>` : string;

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

  const formatHouse = ({ houseNumber, houseLetter }) =>
    `${houseNumber}${houseLetter ? `<sup>${houseLetter}</sup>` : ""}`;

  const parsedHouse = reSplitNumberLetter.test(house)
    ? house.toLowerCase().match(reSplitNumberLetter).groups
    : { houseNumber: house };

  const abbrivationsExplanations = {
    вул: "вулиця",
    просп: "проспект",
    пл: "площа",
    пров: "провулок",
    пер: "перехрестя",
    бульв: "бульвар",
    наб: "набережна",
    узв: "узвіз",
    Шосе: "шосе",
  };

  const streetAbbrivations = Object.keys(abbrivationsExplanations);

  const reStreetAbbrivations = new RegExp(
    `(${streetAbbrivations.join("|")}).`,
    "i",
  );

  const getAbbrivationKey = (string) => toLowerCase(string.replace(".", ""));

  const expandAbbrivation = (string) =>
    abbrivationsExplanations[getAbbrivationKey(string)] || string;

  const expandStreetAbbrivation = replaceRegex(
    reStreetAbbrivations,
    expandAbbrivation,
  );

  const streetTypes = Object.values(abbrivationsExplanations);
  const reStreetType = new RegExp(streetTypes.join("|"), "i");

  const normalizeStreetPart = (string) =>
    reStreetType.test(string) ? toLowerCase(string) : capitalizeUAword(string);

  const getNormalizedStreet = (string) =>
    string.split(" ").map(normalizeStreetPart).join(" ");

  const formatStreetHTML = (string) =>
    string ? `<b>${string}</b>` : undefined;

  const formatStreet = compose(
    formatStreetHTML,
    getNormalizedStreet,
    expandStreetAbbrivation,
    removeMultiSpaces,
    addSpaceAfterSymbol("."),
  );

  const addressParts = [
    zip,
    country,
    ...atuRest,
    formatSettelment(settlement),
    formatStreet(street),
    houseType,
    formatHouse(parsedHouse),
    flat,
    numType,
    num,
  ];
  const addressString = addressParts.filter(Boolean).join(", ");
  return addressString;
};

export default getAddress;
