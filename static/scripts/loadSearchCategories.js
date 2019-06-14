const categories = fetch(`${document.location.origin}/api/allcats`, {
    method: "get"
})
    .then(resp => {
        return resp.json();
    })
    .then(data => {
        const select = document.querySelector("#search-select");
        const active_category = select.getAttribute("value");
        data.forEach(element => {
            let option = document.createElement("option");
            option.text = element.catName;
            option.value = element.id;
            if (element.id == active_category)
                option.setAttribute("selected", "");
            select.appendChild(option);
        });
    })
    .catch(err => {
        console.error(err.message);
    });
