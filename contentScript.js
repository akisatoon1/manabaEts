"use strict";

function return_a(course, is_list) {
    if (is_list) {
        return course
            .querySelector("td")
            .querySelector("span")
            .querySelector("a");
    } else {
        return course
            .querySelector("div")
            .querySelector("div.course-card-title.course-card-titleV2")
            .querySelector("a");
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

function main() {

    let is_list = false;

    // if course news exist, push course to this.
    let news = [];

    const section = document.querySelector("div.my-infolist.my-infolist-mycourses")
        .querySelector("div.mycourses-body")
        .querySelector("div.section");

    let courses = section
        .querySelectorAll("div.coursecard.coursecard-c");

    // if list
    if (!courses.length) {
        courses = section.querySelector("table").querySelectorAll("tr.courselist-c");
        is_list = true;
    }

    // debug
    console.log("courses:");
    console.log(courses);

    for (const course of courses) {
        const statuses = course
            .querySelector("div")
            .querySelector("div.course-card-status")
            .querySelectorAll("img");

        if (statuses[0].getAttribute("title"))
            news.push(return_a(course, is_list));
    }

    //debug
    console.log("news:");
    console.log(news);

    append_ele(create_table(news));
}

window.addEventListener("load", main);
