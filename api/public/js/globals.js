console.log("globals.js");

document.addEventListener("DOMContentLoaded", function () {
  const createBtn = document.querySelector("#createBtn");
  const closeBtn = document.querySelector("#closeBtn");
  const noteModal = document.querySelector("#noteModal");

  createBtn.addEventListener("click", function (el) {
    noteModal.style.display = "block";
  });

  closeBtn.addEventListener("click", function (el) {
    noteModal.style.display = "none";
  });
});
