const AddCat = () => {
    window.location.pathname = "/admin/category";
};
const ActionHandler = async ({ target }) => {
    const action = target.dataset.action;
    switch (action) {
        case "delete": {
            const id = target.dataset.id;
            const response = fetch(
                `${document.location.origin}/admin/category/${id}`,
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
            window.location.pathname = `/admin/category/${id}`;
            break;
        }
    }
};

window.onload = () => {
    document.querySelector("#addCat").addEventListener("click", AddCat);
    const actions = document.querySelectorAll(".actions");

    actions.forEach(element => {
        element.addEventListener("click", ActionHandler);
    });
};
