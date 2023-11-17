import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Routs for search queries
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/randomCocktail", async (req, res) => {
  try {
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const cocktail = response.data.drinks[0];
    res.render("cocktail", { cocktail });
  } catch (error) {
    res.render("error", { error });
  }
});


app.post("/searchByLetter", async (req, res) => {
  const letter = req.body.letter;
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    const cocktails = response.data.drinks;
    res.render("results", { cocktails });
  } catch (error) {
    res.render("error", { error });
  }
});

app.post("/searchByIngredient", async (req, res) => {
  const ingredient = req.body.ingredient;
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const cocktails = response.data.drinks;
    res.render("results", { cocktails });
  } catch (error) {
    res.render("error", { error });
  }
});

app.post("/searchByName", async (req, res) => {
  const name = req.body.name;
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const cocktails = response.data.drinks;
    res.render("results", { cocktails });
  } catch (error) {
    res.render("error", { error });
  }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });