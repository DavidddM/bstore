window.onload = async () => {
    const categories = fetch("http://localhost:8069/api/allcats", {
        method: "get"
    })
        .then(resp => {
            return resp.json();
        })
        .then(data => {
            const select = document.querySelector("#cat-select");
            data.forEach(element => {
                let option = document.createElement("option");
                option.text = element.catName;
                option.value = element.id;
                if (select.getAttribute("value") == element.id) {
                    option.setAttribute("selected", "");
                }
                select.appendChild(option);
            });
            const inStock = document.querySelector("#inStockSelect");
            options = inStock.querySelectorAll("option");
            if (inStock.getAttribute("value") == "true") {
                options[1].setAttribute("selected", "");
            } else {
                options[0].setAttribute("selected", "");
            }
        })
        .catch(err => {
            console.error(err.message);
        });
};
