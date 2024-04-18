// const https = require('https');
const express = require('express')
const axios = require('axios')
const testRouter = require('./routes/main')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json())

app.use(bodyParser.json());


const PORT = process.env.PORT || 3001

// api's for registering
app.post('/test/register', async(req,res) => {
    const response = await axios.get("https://20.244.56.144/test/register")
    res.json(response.data)

})
app.post('/test/auth', async(req,res) => {
    const response = await axios.get("https://20.244.56.144/test/auth")
    res.json(response.data)

})



app.get('/:companyname/categories/:categoryname/products', (req, res) => {
    const { companyname, categoryname } = req.params;
    const { top, minPrice, maxPrice } = req.query;


    let filteredProducts = productsData.filter(product => {
        return product.company === companyname && 
               product.category === categoryname &&
               product.price >= minPrice &&
               product.price <= maxPrice;
    });
    console.log(filteredProducts)

    // Sorting the filtered products based on rating, price, discount, or company
    if (req.query.sortBy) {
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

        filteredProducts.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1 * sortOrder;
            if (a[sortBy] > b[sortBy]) return 1 * sortOrder;
            return 0;
        });
    } else {
        // Default sorting by price in ascending order
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    // Appling limit if specified, default to 10 if not provided
    const limit = top ? parseInt(top) : 10;
    const paginatedProducts = filteredProducts.slice(0, limit);

    res.json(paginatedProducts);
});



app.get('/test/companies/:companyname/categories/:categoryname/products?top=9&minPrice=300&maxPrice=2000', (req, res) => {
    const { companyname, categoryname } = req.params;
    const { top, minPrice, maxPrice } = req.query;


    let filteredProducts = productsData.filter(product => {
        return product.company === companyname && 
               product.category === categoryname &&
               product.price >= minPrice &&
               product.price <= maxPrice;
    });
    console.log(filteredProducts)

    // Sorting the filtered products based on rating, price, discount, or company
    if (req.query.sortBy) {
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

        filteredProducts.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1 * sortOrder;
            if (a[sortBy] > b[sortBy]) return 1 * sortOrder;
            return 0;
        });
    } else {
        // Default sorting by price in ascending order
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    // Appling limit if specified, default to 10 if not provided
    const limit = top ? parseInt(top) : 10;
    const paginatedProducts = filteredProducts.slice(0, limit);

    res.json(paginatedProducts);
});




app.listen(PORT , () => {
    console.log("Server is listening on 3001")
})


