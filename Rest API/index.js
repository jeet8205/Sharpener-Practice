async function handleFormSubmit(event) {
    event.preventDefault();

    const price = document.getElementById('price').value;
    const dish = document.getElementById('dish').value;
    const table = document.getElementById('tables').value;

    const billData = {
        price: price,
        dish: dish,
        table: table
    };

    try {
        const response = await axios.post('https://crudcrud.com/api/58740cddff364520971810dd315e6ec8/orders', billData);
        displayBill(response.data);
    } catch (error) {
        console.error('Error adding bill:', error);
    }
}

function displayBill(bill) {
    const tableElement = document.getElementById(`table${bill.table}`);
    const listItem = document.createElement('li');
    listItem.textContent = `${bill.price} - ${bill.dish}`;
    listItem.id = bill._id;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Order';
    deleteButton.onclick = () => deleteBill(bill._id, listItem);

    listItem.appendChild(deleteButton);
    tableElement.appendChild(listItem);
}

async function deleteBill(id, listItem) {
    try {
        await axios.delete(`https://crudcrud.com/api/58740cddff364520971810dd315e6ec8/orders/${id}`);
        listItem.remove();
    } catch (error) {
        console.error('Error deleting bill:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('https://crudcrud.com/api/58740cddff364520971810dd315e6ec8/orders');
        response.data.forEach(bill => displayBill(bill));
    } catch (error) {
        console.error('Error fetching bills:', error);
    }
});


