const ViewMoreHandler = () => {
    window.location.pathname = "/products";
}

window.onload = () => {
    const button = document.querySelector("#seeMore");
    button.addEventListener("click", ViewMoreHandler);
};