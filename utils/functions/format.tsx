export function formatDate(date: string) {
  date = date.slice(0, 10);
  const dates = date.split("-");

  return dates[2] + "/" + dates[1] + "/" + dates[0];
}

export function formatTime(begin: string, eind: string) {
  begin = begin.slice(11, 16);
  eind = eind.slice(11, 16);

  return begin + "-" + eind;
}
