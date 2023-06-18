const featured_products_list = document.querySelector("#featured_products_list")

document.querySelectorAll("#navbarSupportedContent ul li a").forEach((a) => {
    if (a.textContent.trim().toLowerCase() === 'home') {
        a.classList.add("active")
    };
})

function render_products(products) {
    products.reverse()
    products = products.slice(0, 10)
    products.forEach(element => {
        const productEl = document.createElement("div")

        productEl.classList.add("card")
        productEl.classList.add("col-12")
        productEl.classList.add("col-sm-5")
        productEl.classList.add("col-md-4")
        productEl.classList.add("col-lg-3")
        productEl.classList.add("col-xl-2")
        
        productEl.innerHTML = `
            <img src="${element.image}" class="card-img-top" alt="image">
            <div class="card-body">
                <h6 class="card-title">${element.title.length > 50 ? element.title.slice(0, 47) + '...' : element.title}</h6>
                <p class="card-text"> 
                    <i class="bi bi-star${element.rating.rate >= 1 ? '-fill' : element.rating.rate >= 0.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 2 ? '-fill' : element.rating.rate >= 1.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 3 ? '-fill' : element.rating.rate >= 2.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 4 ? '-fill' : element.rating.rate >= 3.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 5 ? '-fill' : element.rating.rate >= 4.5 ? '-half' : ''}"></i>
                    ${element.rating.rate}
                </p>
                <a href="/product/?id=${element.id}" class="btn primary-btn">See product</a>
            </div>
        `
        featured_products_list.appendChild(productEl)
    });
}

if (localStorage.getItem("products")) {
    render_products(JSON.parse(localStorage.getItem("products")))
} else {
    fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((json) => {
        localStorage.setItem("products", JSON.stringify(json))
        render_products(json)
    })
}

