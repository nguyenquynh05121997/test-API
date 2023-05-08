const getName = document.querySelector("#name");
const getAge = document.querySelector("#age");
const getUl = document.querySelector("ul");

const personApi = `http://localhost:3000/person`;

start();

// Function

function start() {
    getPerson(renderHTML);
    handleCreateForm()
}

function renderHTML(valueArr) {
    let htmls = valueArr.map((ele) => {
        return `
        <li>
            <span class="name">${ele.name}</span>
            <span class="age">Tuoi : ${ele.age}</span>
        </li>
        `;
    });
    getUl.innerHTML = htmls.join("");
}

function getPerson(callback) {
    fetch(personApi)
        .then((response) => {
            return response.json();
        })
        .then((personData) => {
            callback(personData);
        });
}

function createPerson(data,callback) {

    let options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data),
    }

    fetch(personApi,options)
        .then((response) => {
            return response.json()
        })
        .then(callback)

}

function handleCreateForm () {
    const getBtn = document.querySelector('button[type="submit"]')
    getBtn.addEventListener('click',(event) => {
        event.preventDefault()
        const getName = document.querySelector('input[name="name"]')
        const getAge = document.querySelector('input[name="age"]')

        let formData = {
            name: getName.value,
            age: getAge.value,
            
        }
        createPerson(formData)
    })
}
