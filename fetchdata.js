function fetch() {
    const div = document.getElementById('recipes');
    var xhrf = new XMLHttpRequest();
    xhrf.open('GET', 'recipeget.php', true);

    xhrf.onload = function() {
        if (this.status == 200) {
            let metadata = this.responseText;
            metadata = JSON.parse(metadata);
            let output = ``;
            for (let i = 0;
                i < metadata.length;
                i++) {
                metadata[i].data = JSON.parse(metadata[i].data)
                if (document.getElementById('selectusername')) {
                    const option = document.createElement('option');
                    option.value = metadata[i].data.username;
                    option.innerHTML = metadata[i].data.username;
                    document.getElementById('selectusername').appendChild(option);
                }
            }
            return metadata;
        }
    }

    xhrf.send();
}
export { fetch, };