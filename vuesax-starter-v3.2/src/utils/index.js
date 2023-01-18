export function getSevenDaysBeforeDate() {

  let date = new Date(), timestamp, newDate;

  timestamp = date.getTime();
  let sevenDays = []

  for (let i = 7; i > 0; i--) {
  // 获取7天前的日期
    newDate = new Date(timestamp - i * 24 * 3600 * 1000);
    let year = newDate.getFullYear();
    // 月+1是因为js中月份是按0开始的
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    if (day < 10) { // 如果日小于10，前面拼接0
      day = '0' + day;
    }
    if (month < 10) { // 如果月小于10，前面拼接0
      month = '0' + month;
    }
    sevenDays.push( [year, month, day].join('/') );
  }
  return sevenDays
}
