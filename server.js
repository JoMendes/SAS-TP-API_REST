// Importation des modules externes
const express = require("express"); // Module JS permettant de créer des endpoints HTTP facilement
const bodyParser = require("body-parser"); // Module JS permettant de tranformer les paramètres en JSON

/*
  Paramètrage d'Express. Pas besoin de toucher.
  ------------------------------------------------
  Pour lancer le serveur : node server.js
  Pour le lancer en mode daemon : npm run dev
  */
// Paramètrage de Express
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
  );
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
  next();
});
/*
  ------------------------------------------------
  */

/*
  Déclaration des données
  */
  const data = {
    items: [
    {
      title: "Michael",
      content: "Jordan",
    },
    {
      title: "Kobe",
      content: "Bryant",
    },
    {
      title: "Shaquille",
      content: "Oneal",
    },
    {
      title: "Wilt",
      content: "Chamberlain",
    },
    ],
  };

/*
  Déclaration des endpoints (également appelés *routes*)

  req: Contient toutes les données de la requête reçue: headers, paramètres GET, paramètres POST etc..
  res: Contient des fonctions permettant de répondre à la requête

  Obtenir les paramètres GET: req.query
  Obtenir les paramètres POST: req.body
  Obtenir les "paramètres" dans l'URL: req.params
  Répondre un message text: res.send("Okay, bien reçu")
  Répondre avec un object jSON: res.json({message: "Okay, bien reçu"})
  */
// Lorsqu'on reçoit une requête GET
// Exemple: curl localhost:8080/?index=3
// TODO: Retourner l'item correspondant à l'index envoyé dans la requête
app.get("/", (req, res) => {
  const paramsGet = req.query; // {index: "3"}
  console.log({ paramsGet });
  const text = data.items[paramsGet.index]; // Va chercher l'index sélectionné
  res.send(text); // On répond à la requête avec un texte
});

// Lorsqu'on reçoit une requête POST
// Exemple: curl -X POST -H "Content-Type: application/json" localhost:8080 -d '{"title":"Mon titre"}'
// TODO: Sauvegarder l'item reçu dans le tableau des items
app.post("/", (req, res) => {
  const paramsPost = req.body; // {title: "Mon titre"}
  console.log(paramsPost.title);
  res.json(data.items.push(paramsPost));
});

// Lorsqu'on reçoit une requête DELETE
// Exemple: curl -X DELETE localhost:8080/6
// TODO: Supprimer l'item correspondant à l'index envoyé en paramètre d'URL
app.delete("/:number", (req, res) => {
  const paramsURL = req.params; //  {number: "6"}
  console.log(paramsURL.number);
  data.items = data.items.filter((item, index) => index !== parseInt(paramsURL.number)); // Pour supprimer le contenu complet de l'index correspondant
  res.json(paramsURL);
});

// Lorsqu'on reçoit une requête PUT
// Exemple: curl -X PUT -H "Content-Type: application/json" localhost:8080/?index=2 -d '{"newTitle":"Mon nouveau titre"}'
// TODO: Modifier l'item correspondant à l'index reçu en paramètre GET avec les données reçues en paramètre POST
app.put("/", (req, res) => {
  const paramsGet = req.query; // {index: 2}
  const paramsPost = req.body; // {newTitle: "Mon nouveau titre"}
  data.items[paramsGet.index].title = paramsPost.newTitle; // Va chercher le titre dans l'index et le POST avec le nouveau titre
  console.log({ paramsPost });
  console.log(data.items);
  res.json(paramsPost);
});

/*
**Lancement du serveur sur le port 8080
*/
app.listen(8080, () => console.log(`Listen on port 8080`));
