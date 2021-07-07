window.addEventListener('load', async (event) => {
    // console.log('page is fully loaded');
    let products = await getdata();
    console.log(products);
    console.log("in on load");
    //map
    let card = '';

    let featuredProducts = products.filter((item) => item.featured === true);
    console.log(featuredProducts);
    featuredProducts.map((item) => {
// id in  root element 
        card += `<div class="featured-products" >
        <div class="featured-product-image"><img src="${item.imageUrl}" alt="chair"></div>
        <p>${item.product_name}</p>
        <p class="price-bold">&#8377; ${item.product_price}</p>
    </div>`;
    });
    document.getElementById('display').innerHTML = card;

});

const getdata = () => {

    const productsList = axios.get('http://localhost:3000/products')
        .then(resp => {
            data = resp.data;
            return data;
        })
        .catch(error => {
            console.log(error);
        });
    return productsList;
};