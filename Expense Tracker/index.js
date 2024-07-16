function handleFormSubmit(event){
    event.preventDefault();

    const itemDescription = event.target.itemDescription.value;
    const category = event.target.category.value;
    const amount = event.target.amount.value;

    const expenseDetails = {
        itemDescription:itemDescription,
        category:category,
        amount:amount
    }

    const newli = document.createElement("li");
    newli.id = expenseDetails.itemDescription;
    const ul = document.getElementById("expensesList");
    const deletebtn = document.createElement("button");
    deletebtn.type = 'button';
    deletebtn.textContent = 'Delete';
    deletebtn.addEventListener('click', () => {
        localStorage.removeItem(expenseDetails.itemDescription);
        ul.removeChild(newli);
    })

    const editBtn = document.createElement("button");
    editBtn.type = 'button';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
        localStorage.removeItem(expenseDetails.itemDescription);
        ul.removeChild(newli);
        populateform(expenseDetails);
    })


    newli.innerHTML = '<p>' + itemDescription + '-' + category + '-' + amount + '<p>' 
    ul.appendChild(newli);
    newli.appendChild(deletebtn);
    newli.appendChild(editBtn);

    console.log(JSON.stringify(expenseDetails));
    localStorage.setItem(itemDescription, JSON.stringify(expenseDetails));
}

function populateform(expenseDetails) {
    document.getElementById('itemDescription').value = expenseDetails.itemDescription;
    document.getElementById('category').value = expenseDetails.category;
    document.getElementById('amount').value = expenseDetails.amount;
  }