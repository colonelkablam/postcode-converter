import express from "express";
import axios from "axios";

// constants
const app = express();
const port = 3000;
const baseURL = "https://api.postcodes.io/postcodes";
const randomURL = "https://api.postcodes.io/random/postcodes";



// MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// ROUTE HANDLING
// landing page
app.get("/", (req, res) => {
    res.render("index.ejs");
})

// single postcode submission route
app.post("/get-single-info", async (req, res) => {
try {
    const response = await axios.get(`${baseURL}/${req.body.postcode}`);
    res.render("index.ejs", {
        locationData: response.data.result, 
    }
    );
} catch (error) {
    res.render("index.ejs", {
        error: error.message, 
    });
}
})

// single postcode submission route
app.post("/get-random-info", async (req, res) => {
    try {
        const response = await axios.get(randomURL);
        res.render("index.ejs", {
            locationData: response.data.result, 
        }
        );
    } catch (error) {
        res.render("index.ejs", {
            error: error.message, 
        });
    }
    })

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})