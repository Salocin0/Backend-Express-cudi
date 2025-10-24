import express from "express";
import productsRouter from "./router/productsRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import userRouter from "./router/userRouter.js";
import cartRouter from "./router/cartRouter.js";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

env.config();

const PORT = process.env.PORT;

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
};

/*app.use(compression({
    filter:(req,res)=>{
        return compression.filter(req,res)
    },
    threshold:5000,
    level:6
}))*/

/*app.use(compression({
    brotli:{
        enabled:true,
        level:zlib.constants.BROTLI_PARAM_QUALITY
    }
}))*/

app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use("/api/products", productsRouter); //ABMC
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
/*app.get("/protegido",authMiddleware, (req,res)=>{
    res.json({
        mensage:"ruta protegida"
    })
})*/

/*app.get("/admin", authMiddleware,authRoles(["admin"]), (req, res) => {
  res.json({
    mensage: "ruta para el admin",
  });
});

app.get("/adminyuser", authMiddleware,authRoles(["admin","user"]), (req, res) => {
  res.json({
    mensage: "ruta para el admin y el usuario",
  });
});*/

/*app.get("/compression",brotliCompression, (req, res) => {
  const productos = [];

  for (let i = 1; i <= 10000; i++) {
    productos.push({
      id: i,
      name: `producto ${i}`,
      price: Math.random() * 100 * i,
    });
  }

  res.status(200).json({
    mensage: "Success",
    code: 200,
    data: productos,
  });
});

app.get("/compression2", (req, res) => {
  const productos = [];

  for (let i = 1; i <= 10000; i++) {
    productos.push({
      id: i,
      name: `producto ${i}`,
      price: Math.random() * 100 * i,
    });
  }

  res.status(200).json({
    mensage: "Success",
    code: 200,
    data: productos,
  });
});*/

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency = "usd", userid } = req.body;
  const intentoPago = await stripe.paymentIntents.create({
    amount,
    currency,
    customer: userid,
    automatic_payment_methods: { enabled: true },
  });
  res.json({clientSecret:intentoPago.client_secret})
});

app.use((req, res) => {
  res.status(404).json({
    mensage: "Route not found",
    code: 404,
    data: {},
  });
});

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("base de datos conectada a " + process.env.MONGOURL);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`running in http://localhost:${PORT}`);
});
