const loadPhoneAPI = async(search) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayphone(data.data)
}


// ---------------------display function area-----------------------------//
const displayphone = (phones) =>{
    console.log(phones)
    const phoneItemsList = document.getElementById('phone-items-list');
    phoneItemsList.textContent = '';
    // display 20 phone only (slice working)
    phones = phones.slice(0,20)
    // display no phone found 
    const notfoundMessage = document.getElementById('not-found-message');
    if(phones.length === 0){
        notfoundMessage.classList.remove('d-none')
    }else{
        notfoundMessage.classList.add('d-none')
    }
    //---display all phone items
   phones && phones.forEach(phone =>{
        const {brand, image, phone_name, slug} = phone;
        // console.log(brand)
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div class="card h-100 p-2">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title text-primary fw-bold">${phone_name}</h3>
                <h3 class="card-title">${brand}</h3>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <div>
                <button class="btn btn-primary">Phone Details</button>
            </div>
        </div>
        `;
        phoneItemsList.appendChild(newDiv)
    })
    // stop toggle spinner loader
    toggleSpinner(false);
}

// -------------------search-btn event handler ../event listener--------------------------//
document.getElementById('search-btn').addEventListener('click', function(){
    //start toggle spinner loader
    toggleSpinner(true);
    const searchInputField = document.getElementById('search-input');
    const searchInputText= searchInputField.value;
    loadPhoneAPI(searchInputText)
    searchInputField.value = '';
})


// -------------------toggle spinner function-------------------------//
const toggleSpinner = isLoading =>{
        const loaderSection = document.getElementById('spinner-area');
        if(isLoading){
            loaderSection.classList.remove('d-none')
        }else{
            loaderSection.classList.add('d-none')
        }
    }

// loadPhoneAPI('a')