import { updateUI } from "./app.js";

// api
const API = "https://randomuser.me/api/?results=10";

// console.log(data);

// for leader
const overlay = document.getElementById("overlay");
// toggle loader

const toggleLoader = (toggle) => {
  if (toggle) {
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
};

// get data

//request promise

const getData = (resource) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState < 4) {
        toggleLoader(true);
      } else if (request.readyState == 4 && request.status == 200) {
        const users = JSON.parse(request.responseText);
        resolve(users);
        toggleLoader(false);
      } else if (request.request == 4) {
        reject("error");
        toggleLoader(false);
      }
    });

    request.open("GET", resource);
    request.send();
  });
};

// reload

export const reload = () => {
  getData(API)
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

document.addEventListener("DOMContentLoaded", reload);
