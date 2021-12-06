document.getElementById('name add').addEventListener('submit', nameAdd);
document.getElementById('recipename').addEventListener('submit', recipeName);
document.getElementById('ingredient add').addEventListener('submit', ingredientAdd);
document.getElementById('price add').addEventListener('submit', priceAdd);
document.getElementById('submit recipe').addEventListener('submit', submit);
const recipeN = document.getElementById('name');
recipeN.disabled = true;
const ingredientN = document.getElementById('ingredient');
ingredientN.disabled = true;
const ingredientI = document.getElementById('ingredient amount');
ingredientI.disabled = true;
const priceA = document.getElementById('price');
priceA.disabled = true;

var ingredients = [];
var names = [];
var Name = '';
var userName = '';
var Price = '';

async function fetch(bool) {
    const div = document.getElementById('recipes');
    var xhrf = new XMLHttpRequest();
    xhrf.open('GET', 'recipeget.php', true);

    xhrf.onload = function() {
        if (this.status == 200) {
            let data = this.responseText;
            data = JSON.parse(data);
            for (let i = 0;
                i < data.length;
                i++) {
                data[i].recipes = JSON.parse(data[i].recipes);
                if (document.getElementById('selectusername')) {
                    names.push(data[i].name);
                    const option = document.createElement('option');
                    option.value = data[i].name;
                    option.innerHTML = data[i].name;
                    document.getElementById('selectusername').appendChild(option);
                }
            }
        }
    }

    xhrf.send();
}
fetch(false);

// create
function createTable() {
    if (!document.getElementById('recipe table')) {
        const display = document.getElementById('content');
        let table = document.createElement('table');
        table.setAttribute('id', 'recipe table');
        table.setAttribute('style', 'width:100%; font-size:35px; border:3px solid black');
        table.innerHTML = 
        `<tr>
        <th style="text-align: center;">Ingredient</th>
        <th style="text-align: center;">Amount</th>
        </tr>`;
        display.appendChild(table);
    }
}

function submit(e) {
    e.preventDefault();
    var xhrf = new XMLHttpRequest();
    xhrf.open('GET', 'recipeget.php', true);
    
    xhrf.onload = function() {
        if (this.status == 200) {
            let data = this.responseText;
            var recipe;
            data = JSON.parse(data);
            for (let i = 0;
                i < data.length;
                i++) {
                    data[i].recipes = JSON.parse(data[i].recipes);
                }
            let i;
            let bool;
            if (data) {
                for (i = 0;
                    i < data.length;
                    i++) {
                        const temp = data[i];
                        const exists = temp.name === userName;
                        if (exists) {
                            bool = true;
                            data[i].recipes.push({name: Name, ingredients: ingredients, price: Price});
                            recipe = {
                                name: data[i].name,
                                recipes: data[i].recipes,
                            };
                        }
                }
                const success = function() {
                    const h = document.getElementById('content h');
                    h.innerHTML = `${Name} Recipe Sent Under ${userName}<br>Click Here To Submit A New Recipe Form
                    <button class="icon" id="endbutton"><i class="fa fa-plus">`;
                    
                    let timer = setTimeout(() => {
                        h.innerHTML = "";
                        document.getElementById('recipename').innerHTML = `Recipe Name<br>
                        <input id="name" type="text">
                        <button class="icon" type="submit"><i class="fa fa-plus"></button><br>`;
                    }, 10000)

                    document.getElementById('endbutton').addEventListener('click', function() {
                        clearTimeout(timer);
                        h.innerHTML = "";
                        document.getElementById('recipename').innerHTML = `Recipe Name<br>
                        <input id="name" type="text">
                        <button class="icon" type="submit"><i class="fa fa-plus"></button><br>`;
                    })

                    const ul = document.getElementById('content');
                    ul.innerHTML = "";
                }

                const failed = function() {
                    document.getElementById('content h').innerHTML = `Failed To Add Recipe To DB Please Try Again Later And Let Aaron Know`;
                }

                if (bool) {
                    let xhr = new XMLHttpRequest();
                    const parms = `username=${recipe.name}&data=${JSON.stringify(recipe.recipes)}`;

                    xhr.open('POST', 'update.php', true);
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                    xhr.onload = function() {
                        console.log(this.responseText);
                        const bool = this.responseText.includes('Data Sent');
                        if (bool) {
                            success();
                        }
                        else {
                            failed();
                        }
                    }

                    xhr.send(parms);
                }
                else {
                    recipe = {
                        name: userName,
                        recipes: [{
                            name: Name,
                            ingredients: ingredients,
                            price: Price,
                        }]
                    };
                    let xhr = new XMLHttpRequest();
                    const parms = `username=${recipe.name}&data=${JSON.stringify(recipe.recipes)}`;

                    xhr.open('POST', 'index.php', true);
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                    xhr.onload = function() {
                        console.log(this.responseText);
                        const bool = this.responseText.includes('Data Sent');
                        if (bool) {
                            success();
                        }
                        else{
                            failed();
                        }
                    }

                    xhr.send(parms);
                }
            }
        }
    }

    xhrf.send();
}

function priceAdd(e) {
    e.preventDefault();
    const form = document.getElementById('price');
    Price = form.value;
    const h = document.getElementById('content h')
    if (h.innerHTML == null || h.innerHTML == "") {

    }
    else {
        h.innerHTML += `: ${Price}`;
    }
    form.value = '';
}

function ingredientAdd(e) {
    createTable();
    e.preventDefault();
    const ingredient = document.getElementById('ingredient');
    const ingredientA = document.getElementById('ingredient amount');
    const valueA = ingredientA.value
    let value = ingredient.value;
    value = value.replace(value[0], value[0].toUpperCase());
    ingredients.push({ingredient: value, amount: valueA});
    ingredient.value = '';
    ingredientA.value = '';
    if (!valueA || !value) {
        let p = document.createElement('p');
        p.setAttribute('style', 'font-size: 35px;');
        p.setAttribute('id', 'specify');
        p.innerHTML = `Please Specify Both Fields Before Adding Ingredient`;
        document.getElementById('ingredient add').appendChild(p);
        return;
    }
    if (document.getElementById('specify')){
        let p = document.getElementById('specify');
        p.remove();
    }
    const display = document.getElementById('content');      
    let tr = document.createElement('tr');
    const td = document.createElement('td');
        td.setAttribute('style', 'font-size:35px; border:3px solid black');
        td.innerHTML = `${value}`;
    const td2 = document.createElement('td');
        td2.setAttribute('style', 'font-size:35px; border:3px solid black');
        td2.innerHTML = `${valueA}`;
        tr.appendChild(td);
        tr.appendChild(td2);
    document.getElementById('recipe table').appendChild(tr);
}

async function userNameAdd(data) {
    let d = data[0].data;
    const parms = `username=${d.username}`;//&data=${JSON.stringify(d.recipes)}`;
    
    let xhr = new XMLHttpRequest();
        xhr.open('POST', 'sendname.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            console.log(this.responseText);
        }
        xhr.send(parms);
}

function recipeName(e) {
    e.preventDefault();
    createTable();

    const name = document.getElementById('name');
    Name = name.value;
    Name = Name.toLowerCase();
    Name = Name.replace(Name[0], Name[0].toUpperCase());
    const h = document.getElementById('content h');
    if (Price) {
        h.innerHTML = `${Name}: ${Price}`;
    }
    else {
        h.innerHTML = `${Name}`;
    }
    const form = document.getElementById('recipename')
    form.innerHTML = "";
}

function nameAdd(e) {
    e.preventDefault();
    
    const input = document.getElementById('username');
    const userNameSelect = document.getElementById('selectusername').value;

    if (input.value) {
        let exists;
        for(let i = 0;
            i < names.length;
            i++) {
                if (input.value === names[i]) {
                    exists = true;
                    break;
                }
            }
        if (!exists) {
            // if (userNameSelect && userNameSelect !== `undefined`) {
            //     alert('You Cannot Add A Name When You Have A Name Selected');
            //     return;
            // }
            userName = input.value;
            userName = userName.toLowerCase();
            userName = userName.replace(userName[0], userName[0].toUpperCase());
        }
        else {
            alert('You Cannot Add A Name That Already Exists');
            return;
        }
    }
    else {
        if (userNameSelect) {
            userName = userNameSelect;
        }
        else {
            alert(`Please Specify With An Existing Name Or Add A New One`);
            return;
        }
    
    }
    const form = document.getElementById('name add')
    form.innerHTML = ``;
    recipeN.disabled = false;
    ingredientN.disabled = false;
    ingredientI.disabled = false;
    priceA.disabled = false;

    document.getElementById('submit recipe').innerHTML = `<button style="background-color: black; float: right;" class="submitbutton" type="submit">
    Submit New Recipe</button><br><br>`;
}