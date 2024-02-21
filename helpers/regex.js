const r = (re, flags = "u") =>
  new RegExp(
    re
      .replace(/#[^\n]*/gm, "")
      .replace(/\\#/gm, "#")
      .replace(/\s/gm, ""),
    flags,
  );

export default r;
