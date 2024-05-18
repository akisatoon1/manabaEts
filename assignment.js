"use strict";

//
// 全課題の時のみ
//

// 課題提出までの時間がこの時間より少ない時、リンクを赤にする。
const HOUR_INTERVAL = 48;
console.log(`interval: ${HOUR_INTERVAL}h`);

// parseInt all of times of array
function toInt(times) {
    let time_split = [];
    for (const time of times)
        time_split.push(parseInt(time, 10));
    return time_split;
}

function main() {
    // get rows of exercises
    const table = document.querySelector("table.stdlist");
    if (table == null) return 1;
    const rows = table.querySelectorAll("tr.row0, tr.row1");

    for (const row of rows) {
        // get limit time of row
        const time = row.querySelectorAll("td.center.td-period")[1].innerText;
        if (time == "") continue; // when0 no time limit 

        // set limit time and current time as millisecond (1000 millisecond = 1 second)
        const time_split = toInt([time.slice(0, 4), time.slice(5, 7), time.slice(8, 10), time.slice(11, 13), time.slice(14, 16)]);
        const lim = Date.UTC(time_split[0], time_split[1] - 1, time_split[2], time_split[3], time_split[4]);
        const cur = Date.now();

        // change link color from blue (default) to red
        if (Math.floor((lim - cur) / (1000 * 60 * 60) - 9) < HOUR_INTERVAL) {
            const a = row.querySelectorAll("td")[1].querySelector("a");
            a.setAttribute("style", "color: red;")
        }
    }
    return 0;
}

main();