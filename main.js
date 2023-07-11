const myForm=document.querySelector('#my-form');
const nameInput=document.querySelector('#name');
const emailInput=document.querySelector('#email');
const msg=document.querySelector('.msg');
const userList=document.querySelector('#users');

myForm.addEventListener('submit',onSubmit);

function onSubmit(e){
 e.preventDefault();
 
 if(nameInput.value === '' || emailInput.value === ''){
    msg.classList.add('error');
    msg.innerHTML = 'Please enter fields'
    setTimeout(()=>msg.remove(),3000);
 }else{
    // const li = document.createElement('li');
    // li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));
    // userList.appendChild(li);
    myObj = {
        name:nameInput.value,
        email:emailInput.value
    };
    localStorage.setItem('myObj',JSON.stringify(myObj));
    nameInput.value = '';
    emailInput.value= '';
   console.log(localStorage)
 }
}