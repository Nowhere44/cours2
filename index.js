const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const publicRoutes = [
  "/api/fans/signup",
  "/api/fans/login",
  "/test",
  "/getAll",
];
const SECRET_KEY = "VGYGVygdygy5667";

console.log("test");

let utilisateurs = [
  {
    id: 1,
    pseudo: "SuperFan123",
    password: "password123",
  },
  {
    id: 2,
    pseudo: "HeroWatcher456",
    password: "password456",
  },
];

let critiques = [
  {
    id: 1,
    titre: "The Superhero Returns",
    critique: "Un film incroyable avec des effets spéciaux époustouflants.",
    auteurId: 1,
    date: "2023-11-01T10:00:00Z",
    likes: 7,
    comments: 3,
  },
  {
    id: 2,
    titre: "Night Hero: The Darkening",
    critique:
      "Un scénario un peu faible, mais des performances d'acteur solides.",
    auteurId: 2,
    date: "2023-11-03T15:30:00Z",
    likes: 5,
    comments: 7,
  },
  {
    id: 3,
    titre: "Guardians of the Galaxy Far Away",
    critique:
      "Une aventure spatiale hilarante et émouvante, remplie de personnages attachants.",
    auteurId: 1,
    date: "2023-11-05T09:20:00Z",
    likes: 15,
    comments: 10,
  },
  {
    id: 4,
    titre: "Heroic Battles: Dawn of Power",
    critique:
      "Une expérience cinématographique épique, marquant un tournant dans l'univers des supers heros",
    auteurId: 2,
    date: "2023-11-07T13:45:00Z",
    likes: 20,
    comments: 12,
  },
  {
    id: 5,
    titre: "Mystery of the Shadow Knight",
    critique:
      "Un thriller de super-héros sombre et captivant, avec une intrigue pleine de suspense.",
    auteurId: 3,
    date: "2023-11-10T17:30:00Z",
    likes: 8,
    comments: 5,
  },
];
//Endpoint de Liste des Critiques avec Filtrage JWT
app.get("/api/critiques", (req, res) => {
  const { titre, auteur } = req.query;
  let resultats = critiques;

  if (titre) {
    resultats = resultats.filter((c) =>
      c.titre.toLowerCase().includes(titre.toLowerCase())
    );
  }

  if (auteur) {
    resultats = resultats.filter((c) => {
      const auteurCritique = utilisateurs.find((u) => u.id === c.auteurId);
      return (
        auteurCritique &&
        auteurCritique.pseudo.toLowerCase().includes(auteur.toLowerCase())
      );
    });
  }

  const critiquesAvecAuteur = resultats.map((c) => {
    const auteurCritique = utilisateurs.find((u) => u.id === c.auteurId);
    return {
      id: c.id,
      titre: c.titre,
      critique: c.critique,
      auteur: auteurCritique ? auteurCritique.pseudo : "Auteur inconnu",
    };
  });

  res.json(critiquesAvecAuteur);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
