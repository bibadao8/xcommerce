const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const checkoutRoutes = require("./routes/checkoutRoutes")
const orderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscriberRoute = require("./routes/subscriberRoute")
const adminRoutes = require("./routes/adminRoutes")
const productAdminRoutes = require("./routes/productAdminRoutes")
const adminOrderRoutes = require("./routes/adminOrderRoutes")

const app = express()
app.use(express.json())

// CORS configuration for production deployment
app.use(cors({
    origin: [
        'http://localhost:5173', // Local development
        'http://localhost:3000', // Alternative local port
        'https://*.vercel.app',  // Vercel domains
        'https://*.vercel.com',   // Vercel domains
        'https://xcommerce-o3vh-6fydfc270-bis-projects-90e2b389.vercel.app', // Your specific Vercel domain
        'https://trendora-website.vercel.app', // Alternative domain name
        'https://xcommerce-5rlx-r6dalxgav-bis-projects-90e2b389.vercel.app', // New Vercel domain from error log
        'https://xcommerce-iota.vercel.app', // Your backend API domain
        'https://xcommerce-btkn.vercel.app' // Your new frontend domain
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

dotenv.config()

const PORT = process.env.PORT || 3000;

//connet to mongodb
connectDB();

app.get("/", (req, res) => {
    res.send("welcome to trendora api")
})

//api routes
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api", subscriberRoute)

//admin route
app.use("/api/admin/users", adminRoutes)
app.use("/api/admin/products", productAdminRoutes)
app.use("/api/admin/orders", adminOrderRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})