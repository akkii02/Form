const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneNumber = document.querySelector("#number");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");



myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === "" || emailInput.value === "" || phoneNumber.value === "") {
    msg.classList.add("error");
    msg.innerHTML = "Please enter fields";
    setTimeout(() => msg.remove(), 3000);
  } else {
    const myObj = {
      name: nameInput.value,
      email: emailInput.value,
      number: phoneNumber.value,
    };

    axios.post('https://crudcrud.com/api/e83cd81d5a734a5d857fb20bb9872012/apponmentData',myObj)
    .then((res)=>{
      addUserToList(res.data)
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })




    // localStorage.setItem(emailInput.value, JSON.stringify(myObj));

    //addUserToList(myObj);

    nameInput.value = "";
    emailInput.value = "";
    phoneNumber.value = "";
  }
}

window.addEventListener('load',loadData)


  function loadData() {
    for (let i = 0; i < localStorage.length; i++) {
      const email = localStorage.key(i);
      const storedData = JSON.parse(localStorage.getItem(email));
      addUserToList(storedData);
    }
  }


function addUserToList(userObj) {
  const li = document.createElement("li");
  li.setAttribute("data-id", userObj.email);

  li.appendChild(
    document.createTextNode(
      `Name: ${userObj.name}, Email ID: ${userObj.email}, Phone Number: ${userObj.number}`
    )
  );

  const deleteButton = createButton("Delete", "deleteBtn delete");
  deleteButton.addEventListener("click", deleteUser);
  li.appendChild(deleteButton);

  const editButton = createButton("Edit", "editBtn edit");
  editButton.addEventListener("click", editUser);
  li.appendChild(editButton);

  userList.appendChild(li);
}

function createButton(text, className) {
  const button = document.createElement("button");
  button.className = className;
  button.appendChild(document.createTextNode(text));
  return button;
}

function deleteUser(e) {
  if (confirm("Are You Sure?")) {
    const li = e.target.parentElement;
    const email = li.getAttribute("data-id");
    userList.removeChild(li);
    localStorage.removeItem(email);
  }
}

function editUser(e) {
  if (confirm("Are You Sure?")) {
    const li = e.target.parentElement;
    const email = li.getAttribute("data-id");

    const storedData = JSON.parse(localStorage.getItem(email));

    nameInput.value = storedData.name;
    emailInput.value = storedData.email;
    phoneNumber.value = storedData.number;

    userList.removeChild(li);
    localStorage.removeItem(email);
  }
}

userList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    deleteUser(e);
  } else if (e.target.classList.contains("edit")) {
    editUser(e);
  }
});
