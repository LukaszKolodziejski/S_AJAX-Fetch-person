const getUser = e => {
  e.preventDefault();
  const usersNumber = document.querySelector('[name="users-number"]').value;
  const usersGender = document.querySelector('[name="gender"]').value;

  const API = `https://randomuser.me/api/?results=${usersNumber}&gender=${
    usersGender === "both" ? "male,female" : usersGender
  }`;
  fetch(API)
    .then(res => {
      if (res.status !== 200) throw Error("To nie jest odpowiedź 200");
      else return res.json();
    })
    .then(data => showUsers(data.results))
    .catch(err => console.log(err, "< < Error"));
};

document.querySelector(".generator").addEventListener("submit", getUser);

const showUsers = users => {
  const resultArea = document.querySelector(".users-list");
  resultArea.textContent = "";
  users.forEach(user => {
    const { title, first, last } = user.name;
    const item = document.createElement("div");
    item.className = "user";
    item.innerHTML = `
    <div class="user__name">${title.toUpperCase()} ${first.toUpperCase()} ${last.toUpperCase()} </div>
    <img class="user__image" src=${user.picture.medium}>
    `;
    resultArea.appendChild(item);
  });
};
