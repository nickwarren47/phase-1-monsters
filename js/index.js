/*
When the page loads, show the first 50 monsters. 
Each monster's name, age, and description should be shown.
*/

function getMonsters(){
    fetch('http://localhost:3000/monsters')
    .then (res => res.json())
    // .then (json => console.log(json))
    .then (json => displayMonsters(json))
}

const displayMonsters = monsters => {
    const monsterList = document.getElementById('monster-container')
    monsters.forEach(monster => {
        // console.log(monsters);
        const div = document.createElement('div');
        // div.append(monsterList);
        // const list = document.createElement('li');
        const name = document.createElement('h2');
        name.textContent = monster.name;
        const age = document.createElement('h3');
        age.textContent = monster.age;
        const description = document.createElement('p');
        description.textContent = monster.description;
        div.append(name, age, description);
        monsterList.append(div);
    })
}

getMonsters();

/* 
Above your list of monsters, you should have a form to create a new monster. 
You should have fields for name, age, and description, and a 'Create Monster Button'. 
When you click the button,the monster should be added to the list and saved in the API.
*/

function monsterForm(){
    const div = document.getElementById('create-monster')
    const form = document.createElement('form');
    const name = document.createElement('input');
    const age = document.createElement('input');
    const description = document.createElement('input');
    const button = document.createElement('button');
    button.textContent = 'Submit';
    form.append(name, age, description, button);
    div.append(form);
    // createNewMonster();
}
monsterForm();

function createNewMonster(e){
    e.preventDefault()
    console.log(e);
    const addedMonster = {
        name: e.target[0].value,
        age: e.target[1].value,
        description: e.target[2].value,
    } 
    // console.log(addedMonster);

    fetch("http://localhost:3000/monsters", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(addedMonster)
    }) 
    .then(res => res.json())
    .then(json => displayMonsters(json))
}

document.querySelector('form').addEventListener('submit', createNewMonster)

