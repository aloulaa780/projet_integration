package handlers

import (
    "context"
    "log"
    "net/http"
    "os"
    "strconv"

    "github.com/gofiber/fiber/v2"
    "github.com/joho/godotenv"
    "github.com/jackc/pgx/v5/pgxpool"
)

var db *pgxpool.Pool

// Définir le modèle Product
type Product struct {
    ID          int      `json:"id"`
    Name        string   `json:"name"`
    Description string   `json:"description"`
    Price       float64  `json:"price"`
    Image       *string  `json:"image"` // Utilisation d'un pointeur pour gérer les valeurs NULL
}

// Fonction principale pour exécuter en local
func RunLocal() {
    // Charger les variables d'environnement
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // Charger la chaîne de connexion à partir des variables d'environnement
    dbURL := os.Getenv("DATABASE_URL")
    db, err = pgxpool.New(context.Background(), dbURL)
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Créer une instance Fiber
    app := fiber.New()

    // Routes
    setupRoutes(app)

    // Démarrer le serveur localement
    log.Fatal(app.Listen(":3001"))
}

// Fonction pour configurer les routes
func setupRoutes(app *fiber.App) {
    app.Get("/products", getProducts)
    app.Get("/products/:id", getProduct)
    app.Post("/products", createProduct)
    app.Put("/products/:id", updateProduct)
    app.Delete("/products/:id", deleteProduct)

    // Route pour récupérer l'image d'un produit
    app.Get("/uploads/:filename", func(c *fiber.Ctx) error {
        filename := c.Params("filename")
        // Renvoie l'image depuis le dossier "uploads"
        return c.SendFile("./upload/" + filename)
    })
}

// Récupérer tous les produits
func getProducts(c *fiber.Ctx) error {
    rows, err := db.Query(context.Background(), "SELECT id, name, description, price, image FROM products")
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
    }
    defer rows.Close()

    products := []Product{}
    for rows.Next() {
        var prod Product
        if err := rows.Scan(&prod.ID, &prod.Name, &prod.Description, &prod.Price, &prod.Image); err != nil {
            return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
        }
        products = append(products, prod)
    }
    return c.JSON(products)
}

// Récupérer un produit par ID
func getProduct(c *fiber.Ctx) error {
    id := c.Params("id")
    var prod Product
    err := db.QueryRow(context.Background(), "SELECT id, name, description, price, image FROM products WHERE id=$1", id).
        Scan(&prod.ID, &prod.Name, &prod.Description, &prod.Price, &prod.Image)
    if err != nil {
        return c.Status(http.StatusNotFound).SendString(err.Error())
    }
    return c.JSON(prod)
}

// Créer un nouveau produit
func createProduct(c *fiber.Ctx) error {
    // Récupérer les données du formulaire
    name := c.FormValue("name")
    description := c.FormValue("description")
    price := c.FormValue("price")

    // Récupérer l'image depuis le formulaire
    imageFile, err := c.FormFile("image")  // "image" est le nom du champ de formulaire pour l'image
    if err != nil {
        return c.Status(fiber.StatusBadRequest).SendString("Image not provided or error occurred")
    }

    // Sauvegarder le fichier dans le dossier "uploads"
    filePath := "./upload/" + imageFile.Filename
    if err := c.SaveFile(imageFile, filePath); err != nil {
        return c.Status(fiber.StatusInternalServerError).SendString("Error saving image")
    }

    // Convertir le prix en float64
    priceValue, err := strconv.ParseFloat(price, 64)
    if err != nil {
        return c.Status(http.StatusBadRequest).SendString("Invalid price")
    }

    // Insérer le produit dans la base de données avec le chemin du fichier image
    _, err = db.Exec(context.Background(),
        "INSERT INTO products (name, description, price, image) VALUES ($1, $2, $3, $4)",
        name, description, priceValue, filePath)

    if err != nil {
        return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
    }

    return c.Status(http.StatusCreated).JSON(fiber.Map{"message": "Product created"})
}

// Mettre à jour un produit
func updateProduct(c *fiber.Ctx) error {
    id := c.Params("id")

    // Récupérer les données du formulaire
    name := c.FormValue("name")
    description := c.FormValue("description")
    price := c.FormValue("price")
    image := c.FormValue("image")

    // Gestion de l'image
    var imageValue *string
    if image != "" {
        imageValue = &image
    }

    // Convertir le prix en float64
    priceValue, err := strconv.ParseFloat(price, 64)
    if err != nil {
        return c.Status(http.StatusBadRequest).SendString("Invalid price")
    }

    // Mettre à jour le produit dans la base de données
    _, err = db.Exec(context.Background(),
        "UPDATE products SET name=$1, description=$2, price=$3, image=$4 WHERE id=$5",
        name, description, priceValue, imageValue, id)

    if err != nil {
        return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
    }
    return c.JSON(fiber.Map{"message": "Product updated"})
}

// Supprimer un produit
func deleteProduct(c *fiber.Ctx) error {
    id := c.Params("id")
    _, err := db.Exec(context.Background(), "DELETE FROM products WHERE id=$1", id)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
    }
    return c.SendStatus(http.StatusNoContent)
}
