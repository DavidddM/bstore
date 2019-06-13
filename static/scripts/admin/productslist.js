const AddProduct = () => {
    window.location.pathname = "/admin/products";
};
const ActionHandler = async ({ target }) => {
    const action = target.dataset.action;
    switch (action) {
        case "delete": {
            const id = target.dataset.id;
            const response = fetch(
                `${document.location.origin}/admin/products/${id}`,
                {
                    method: "delete"
                }
            );
            response.then(resp => {
                if (resp.status != 200) {
                    console.error(`received status code ${resp.status}`);
                }
                window.location.reload();
            });
            break;
        }
        case "edit": {
            const id = target.dataset.id;
            window.location.pathname = `/admin/products/${id}`;
            break;
        }
    }
};

window.onload = () => {
    document.querySelector("#addProd").addEventListener("click", AddProduct);
    const actions = document.querySelectorAll(".actions");

    actions.forEach(element => {
        element.addEventListener("click", ActionHandler);
    });

    const tds = document.querySelectorAll(".category-id");
    tds.forEach(element => {
        const categoryId = element.getAttribute("value");
        const catName = fetch(
            `${document.location.origin}/api/catname/${categoryId}`,
            { method: "get" }
        )
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                element.innerHTML = data.catName;
            })
            .catch(e => {
                console.error(e.message);
            });
    });

    const inStocks = document.querySelectorAll(".inStock>span");
    inStocks.forEach(element => {
        const value = element.getAttribute("value");
        if (value == "false") {
            element.style.color = "darkred";
        } else {
            element.style.color = "green";
        }
    });
};
