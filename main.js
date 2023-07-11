const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneNumber = document.querySelector("#number");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

myForm.addEventListener("submit", onSubmit);
userList.addEventListener("click", removeItem);

function onSubmit(e) {
  e.preventDefault();

  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    phoneNumber.value === ""
  ) {
    msg.classList.add("error");
    msg.innerHTML = "Please enter fields";
    setTimeout(() => msg.remove(), 3000);
  } else {
    var uniqueKey = "user" + Date.now();
    myObj = {
      name: nameInput.value,
      email: emailInput.value,
      number: phoneNumber.value,
    };
    localStorage.setItem(emailInput.value, JSON.stringify(myObj));

    //create li and delete button

    const li = document.createElement("li");
    li.appendChild(
      document.createTextNode(
        `Name:- ${myObj.name} ,email ID:- ${myObj.email} , Phone Number:- ${myObj.number}`
      )
    );
    userList.appendChild(li);
    var editBtn = document.createElement("button");
    editBtn.className = "deleteBtn delete";
    editBtn.appendChild(document.createTextNode("Delete"));
    li.appendChild(editBtn);
    nameInput.value = "";
    emailInput.value = "";
    phoneNumber.value = "";

    //console.log(localStorage)
  }
}
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      var li = e.target.parentElement;
      userList.removeChild(li);
      localStorage.removeItem(myObj.email);
    }
    // console.log(1)
  }
}
