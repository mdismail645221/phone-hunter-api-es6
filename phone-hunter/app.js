const loadPhoneAPI = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayphone(data.data, dataLimit)
}


// ---------------------display function area-----------------------------//
const displayphone = (phones, dataLimit) => {
    // console.log(dataLimit)
    const phoneItemsList = document.getElementById('phone-items-list');
    phoneItemsList.textContent = '';


    //show all btn
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        // display 20 phone only (slice working)
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        console.log('datalimit', dataLimit)
        showAll.classList.add('d-none');
    }

    // display no phone found 
    const notfoundMessage = document.getElementById('not-found-message');
    if (phones.length === 0) {
        console.log('not found')
        notfoundMessage.classList.remove('d-none')
    } else {
        console.log('found')
        notfoundMessage.classList.add('d-none')
    }


    //---display all phone items
    phones && phones.forEach(phone => {
        const { brand, image, phone_name, slug } = phone;
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
                <button onclick="loadPhoneDetails('${slug}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Phone Details</button>
            </div>
        </div>
        `;
        phoneItemsList.appendChild(newDiv)
    })
    // stop toggle spinner loader
    toggleSpinner(false);
}


//process btn
const processSearch = (dataLimit) => {
    // console.log(dataLimit)

    //start toggle spinner loader
    toggleSpinner(true);
    const searchInputField = document.getElementById('search-input');
    const searchInputText = searchInputField.value;
    loadPhoneAPI(searchInputText, dataLimit)
    // searchInputField.value = '';
}


// -------------------search-btn event handler ../event listener--------------------------//
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10)
})

//input field Enter event handler 
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10)
    }
});

// -------------------toggle spinner function-------------------------//
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinner-area');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    }
}


// not the best way to load show all
document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch()
})

// loadshowDetails area
const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)

}

const displayPhoneDetails = (data) => {
    console.log(data)
    const { name, brand, image, mainFeatures, releaseDate } = data;
    const { chipSet, displaySize, memory } = mainFeatures;
    console.log(releaseDate)

    const staticBackdropLabel = document.getElementById('staticBackdropLabel');
    staticBackdropLabel.innerText = name;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
            <div class="d-flex justify-content-center aling-items-center">
                <div class="d-flex flex-column">
                    <img src="${image}" alt="" class="w-full">
                    <h5>Relased:${releaseDate ? releaseDate : "Not Relased Phone"}</h5>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">chipSet</th>
                    <th scope="col">displaySize</th>
                    <th scope="col">memory</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>${chipSet}</td>
                        <td>${displaySize}</td>
                        <td>${memory}</td>
                    </tr>
                </tbody>
            </table>
       `;

}

loadPhoneAPI('a')