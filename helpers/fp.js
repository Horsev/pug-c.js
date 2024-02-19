import { compose } from "ramda";

export { compose, hasKey };

const hasKey = (key) => (obj) => obj[key] !== undefined;
