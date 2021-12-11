function fetch() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'ingredients.php', true);

    xhr.onload = function() {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            let output = ``;
            for (let i = 0;
                i < data.length;
                i++) {
                    output += `<option value="${data[i].name}">${data[i].price}</option>`;
                }
            document.getElementById('ingredientlist').innerHTML = output;
        }
    }
}
fetch();