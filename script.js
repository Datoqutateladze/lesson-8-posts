let mainWraper = document.getElementById('post-block'); 
let overlay = document.getElementById('overlay');
let close = document.getElementById('close');
let content = document.getElementById('content');
let addButton = document.getElementById('add');
let postOverlay  = document.getElementById('postoverlay');
let form = document.getElementById('form');

// https://jsonplaceholder.typicode.com/posts
function ajax(url, callback){
    let requist = new XMLHttpRequest();
    requist.open('GET', url);
    requist.addEventListener('load', function(){
        let data = JSON.parse(requist.responseText)
        callback(data);
    });

    requist.send();
}

ajax('https://jsonplaceholder.typicode.com/posts', function(data){
    printData(data);
});

function printData(data){
    data.forEach(element => {
        createPost(element);
    });
}

function createPost(item){
    let divwraper = document.createElement('div');
    divwraper.classList.add('posts');
    divwraper.setAttribute('data-id', item.id);
    let h1 = document.createElement('h1');
    h1.innerText = item.id;
    h1.classList.add('hh11');
    let h3 = document.createElement('h3');
    h3.innerText = item.title;
    h3.classList.add('title');

    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-id', item.id);
    deleteButton.innerText = 'delete';
    deleteButton.addEventListener('click', function(event){
        event.stopPropagation();
        let id = event.target.getAttribute('data-id');
        deletePost(id);
    })

    divwraper.appendChild(h1);
    divwraper.appendChild(h3);
    divwraper.appendChild(deleteButton);
    divwraper.addEventListener('click', function(event){
        let id = event.target.getAttribute('data-id');
        openOverlay(id);
    })


    mainWraper.appendChild(divwraper);
}

function deletePost(id){
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
        method: 'DELETE',
    })
    .then(response => response.json() )
    .then(data => {
        console.log(data);
    })
}


function openOverlay(id){
    overlay.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url, function(data){
        overlayFunction(data);
    })
    console.log(id);
}

function overlayFunction(item){
    let pId = document.createElement('p');
    pId.innerText = item.id;

    let title = document.createElement('h2');
    title.innerText = item.title;

    let description = document.createElement('p');
    description.innerText = item.body;
    
    content.appendChild(pId);
    content.appendChild(title);
    content.appendChild(description);
}

close.addEventListener('click', function(){
    overlay.classList.remove('active');
    content.innerHTML =  ' ';
})

addButton.addEventListener('click',function() {
    postOverlay.classList.add('activeAdd');
})

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = {
        title: event.target[0].value,
        description: event.target[1].value
    }
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => {
            postOverlay.classList.remove('activeAdd');
            console.log(json);
        });
    
        console.log(formData)
    
    })

