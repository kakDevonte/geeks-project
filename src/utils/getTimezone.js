const timezones = [
  { name: "Europe/Moscow", time: -180 },
  { name: "Europe/Samara", time: -240 },
  { name: "Europe/Kaliningrad", time: -120 },
  { name: "Asia/Yekaterinburg", time: -300 },
  { name: "Asia/Omsk", time: -360 },
  { name: "Asia/Krasnoyarsk", time: -420 },
  { name: "Asia/Irkutsk", time: -480 },
  { name: "Asia/Yakutsk", time: -540 },
  { name: "Asia/Vladivostok", time: -600 },
];

function getTimezone() {
  let timezone;
  const offset = new Date().getTimezoneOffset();
  for (let item of timezones) {
    if (offset === item.time) {
      timezone = (item.time / 60) * -1;
    }
  }
  return timezone;
}

export default getTimezone;
