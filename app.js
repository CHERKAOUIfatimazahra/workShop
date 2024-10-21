const express = require("express");
const fs = require("fs");
const app = express();

// Configuration d'EJS comme moteur de templates
app.set("view engine", "ejs");

// Route principale - Affichage du statut de l'application
app.get("/", (req, res) => {
  res.render("index", { status: "Healthy" });
});

// Route pour simuler une surcharge CPU
app.get("/trigger-cpu-alarm", (req, res) => {
  res.render("index", { status: "CPU Overload!" });
  let i = 0;
  while (i < 1e8) {
    i++;
  }
});

// Route pour simuler des files d'attente IO
app.get("/trigger-io-alarm", (req, res) => {
  res.render("index", { status: "IO Queue Spike!" });
  for (let i = 0; i < 1000; i++) {
    fs.open("/tmp/testfile" + i, "w", (err) => {
      if (err) throw err;
    });
  }
});

// Route pour simuler une activité réseau intense
app.get("/trigger-network-alarm", (req, res) => {
  res.render("index", { status: "Network Spike!" });
  for (let i = 0; i < 100; i++) {
    require("http").get("http://example.com");
  }
});

// Route pour simuler une erreur de disque
app.get("/trigger-disk-error", (req, res) => {
  res.render("index", { status: "Disk Error Simulation!" });
  for (let i = 0; i < 1000; i++) {
    fs.writeFile(
      "/tmp/disk-error-file" + i + ".txt",
      "Simulating disk error!",
      (err) => {
        if (err) throw err;
      }
    );
  }
});

// Route pour simuler l'arrêt de l'application
app.get("/trigger-application-shutdown", (req, res) => {
  res.render("index", { status: "Application Shutdown!" });
  process.exit(1); // Arrêt de l'application
});

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur Express.js démarré sur le port 3000");
});
