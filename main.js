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

    axios.post('https://crudcrud.com/api/760426c39bfd437aaa306ec34c75a9d9/apponmentData', myObj)
      .then((res) => {
        addUserToList(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    nameInput.value = "";
    emailInput.value = "";
    phoneNumber.value = "";
  }
}

window.addEventListener('DOMContentLoaded', loadData);

function loadData() {
  axios.get('https://crudcrud.com/api/760426c39bfd437aaa306ec34c75a9d9/apponmentData')
    .then(response => {
      const userData = response.data; 
      userData.forEach(user => {
        addUserToList(user);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function addUserToList(userObj) {
  const li = document.createElement("li");
  li.setAttribute("data-id", userObj._id);

  li.appendChild(
    document.createTextNode(
      `Name: ${userObj.name}, Email ID: ${userObj.email}, Phone Number: ${userObj.number}`
    )
  );

  const deleteButton = createButton("Delete", "deleteBtn delete");
  deleteButton.addEventListener("click", deleteUser);
  li.appendChild(deleteButton);

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash-alt delete-icon"; 
  deleteIcon.addEventListener("click", deleteUserIcon);
  li.appendChild(deleteIcon);

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

    
    axios.delete(`https://crudcrud.com/api/760426c39bfd437aaa306ec34c75a9d9/apponmentData/${email}`)
      .then(() => {
        console.log("User deleted successfully");
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  }
}

function deleteUserIcon(e) {
  if (confirm("Are You Sure?")) {
    const li = e.target.parentElement;
    const userId = li.getAttribute("data-id");

    
    axios.delete(`https://crudcrud.com/api/760426c39bfd437aaa306ec34c75a9d9/apponmentData/${userId}`)
      .then(() => {
        userList.removeChild(li); 
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
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
