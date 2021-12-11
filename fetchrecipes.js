document.getElementById('search').addEventListener('submit', fetch);

function fetch(e) {
    e.preventDefault();
    let query = document.getElementById('search query').value;
    const bool = document.getElementById('name add').innerHTML.includes('Current User');
    if (!bool) {
        alert('You Must Select A User Before You Can Search Recipes');
    }
    else{
        
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
                }
                populate(data, query);
            }
        }

        xhrf.send();
    }
}

function populate(data, query) {
    let text = document.getElementById('name add').innerHTML;
    text = text.split(' ');
    const user = text[2];
    for (let i = 0;
        i < data.length;
        i++) {
            if (data[i].name === user) {
                var recipes = [...data[i].recipes];
                break;
            }
        }
        var _possibleRecipes = [];
        for(let i = 0;
            i < recipes.length;
            i++){
            let _recipe = recipes[i].name.toLowerCase();
            const levenshteinDistance = (query = '', _recipe = '') => {
                const track = Array(_recipe.length + 1).fill(null).map(() =>
                Array(query.length + 1).fill(null));
                for (let i = 0; 
                    i <= query.length; 
                    i += 1) {
                track[0][i] = i;
                }
                for (let j = 0; 
                    j <= _recipe.length; 
                    j += 1) {
                track[j][0] = j;
                }
                for (let j = 1; 
                    j <= _recipe.length; 
                    j += 1) {
                for (let i = 1; 
                    i <= query.length; 
                    i += 1) {
                    const indicator = query[i - 1] === _recipe[j - 1] ? 0 : 1;
                    track[j][i] = Math.min(
                        track[j][i - 1] + 1,
                        track[j - 1][i] + 1,
                        track[j - 1][i - 1] + indicator,
                    );
                }
                }
                return track[_recipe.length][query.length];
            }
            let dif = levenshteinDistance(query, _recipe);
            _possibleRecipes.push({dif: dif, recipe: recipes[i]});
        }

        const filter = function(a) {
            if (a.dif <= 4) {
                return a.dif
            }
        }

        recipes = [..._possibleRecipes].filter(filter);

    const ul = document.createElement('ul');

    for (let i = 0;
        i < recipes.length;
        i++) {
            const li = document.createElement('li');
            li.innerHTML = `${recipes[i].recipe.name}: ${recipes[i].recipe.price}`;
            ul.appendChild(li);
        }
    document.getElementById('currentrecipes').appendChild(ul);
    query = "";
}