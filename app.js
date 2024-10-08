/* Created by Tivotal */

let input = document.querySelector("input");
let addBtn = document.querySelector(".add");
let updateTxt = "",
  count;
let listWrapper = document.querySelector(".list");

window.onload = () => {
  count = Object.keys(localStorage).length;
  displayList();
};

addBtn.addEventListener("click", () => {
  let val = input.value;
  if (val.length > 0) {
    count++;
    if (updateTxt == "") {
      updateDatabase(count, val, false);
    } else {
      removeStorage(updateTxt);
      updateDatabase(updateTxt.split(":")[0], val, false);
      updateTxt = "";
      addBtn.textContent = "Add";
    }
    input.value = "";
  }
});

let updateDatabase = (index, val, completed) => {
  localStorage.setItem(`${index}:${val}`, completed);
  displayList();
};

let removeStorage = (key) => {
  localStorage.removeItem(key);
  count--;
  displayList();
};

let displayList = () => {
  if (count > 0) {
    listWrapper.style.display = "inline-block";
  } else {
    listWrapper.style.display = "none";
  }

  listWrapper.innerHTML = "";

  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();

  for (let key of tasks) {
    let txt = key.split(":")[1];
    let value = localStorage.getItem(key);
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.id = key.split(":")[0];

    taskDiv.innerHTML = `<div class="check"></div>
          <div class="content">
            <span class="text">${txt}</span>
            <div class="btns">
              <button class="btn edit"><i class="fas fa-pen"></i></button>
              <button class="btn delete"><i class="fas fa-close"></i></button>
            </div>
          </div>`;
    if (JSON.parse(value)) {
      taskDiv.classList.add("completed");
    }
    listWrapper.appendChild(taskDiv);
  }

  let taskDivs = document.querySelectorAll(".task");
  taskDivs.forEach((elem) => {
    elem.addEventListener("click", () => {
      if (elem.classList.contains("completed")) {
        updateDatabase(elem.id, elem.innerText, false);
      } else {
        updateDatabase(elem.id, elem.innerText, true);
      }
    });
  });

  let deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      let task = btn.closest(".task");
      removeStorage(task.id + ":" + task.innerText);
    });
  });

  let editBtns = document.querySelectorAll(".edit");
  editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      let task = btn.closest(".task");
      input.value = task.innerText;
      input.focus();
      addBtn.textContent = "Update";
      updateTxt = task.id + ":" + task.innerText;
    });
  });
};
