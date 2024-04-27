"use strict";

const Thumbnail = 0;
const List = 1;
const Timetable = 2;

// if course news exist, push course to this.
let news = [];

// return <a href="link"> element of course
function return_a(info_status, course) {
    switch (info_status) {
        case Thumbnail:
            return course
                .querySelector("div")
                .querySelector("div.course-card-title.course-card-titleV2")
                .querySelector("a");
        case List:
        case Timetable:
            return course
                .querySelector("td")
                .querySelector("span")
                .querySelector("a");
        default:
            // error handling
            return;
    }
}

function return_courses(info_status, section) {
    switch (info_status) {
        case Thumbnail:
            return section
                .querySelectorAll("div.coursecard.coursecard-c");
        case List:
        case Timetable:
            return section
                .querySelector("table").querySelectorAll("tr.courselist-c");
        default:
            // error handling
            return;
    }
}

function push_to_news(info_status, courses) {
    for (const course of courses) {
        const statuses = course
            .querySelector("div")
            .querySelector("div.course-card-status")
            .querySelectorAll("img");

        if (statuses[0].getAttribute("title")) {
            news.push(return_a(info_status, course));
        }
    }
}

function append_ele(newele) {
    const parent = document.querySelector("div.contentbody-left");
    const ref = parent.querySelector("div.my-infolist.my-infolist-centernews");
    parent.insertBefore(newele, ref);
}

function create_table(array) {
    const table = document.createElement("table");
    table.setAttribute("style", "width: 100%;");

    const caption = document.createElement("caption");
    const title_text = document.createTextNode("未読のコースニュース");
    caption.appendChild(title_text);
    table.appendChild(caption);

    for (const a of array) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.appendChild(a.cloneNode(true));
        tr.appendChild(td);
        table.appendChild(tr);
    }

    return table;
}

// 0: thumbnail
// 1: list
// 2: timetable
function return_info_status() {
    const infos = document.querySelector("ul.infolist-tab").querySelectorAll("li");
    let i = 0;
    for (const info of infos) {
        if (info.className == "current")
            return i;
        i++;
    }
    /*
    error handling
    if(i>2)
    */
}

function timetable(info_status, section) {
    section = section.querySelector("div#courselistweekly");
    const table = section.querySelector("table");
    const infolist = section.querySelector("div.my-infolist");
    for (const tr of table.querySelectorAll("tr")) {
        if (tr.className == "title") continue;
        for (const td of tr.querySelectorAll("td.course.course-cell")) {
            const statuses = td.querySelector("div.coursestatus").querySelectorAll("img");
            if (statuses[0].getAttribute("title"))
                news.push(td.querySelector("a"));
        }
    }
    push_to_news(info_status, return_courses(info_status, infolist));
}

function main() {

    const info_status = return_info_status();

    const section = document.querySelector("div.my-infolist.my-infolist-mycourses")
        .querySelector("div.mycourses-body")
        .querySelector("div.section");

    let courses;
    switch (info_status) {
        case Thumbnail:
        case List:
            courses = return_courses(info_status, section);
            push_to_news(info_status, courses);
            break;

        case Timetable:
            timetable(info_status, section);
            break;
        default:
            // error handling
            break;
    }

    //debug
    console.log(news);

    append_ele(create_table(news));
}

window.addEventListener("load", main);
