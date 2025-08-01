const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./nsa-membership-9eba9-firebase-adminsdk-fbsvc-30c21a7a04.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
// app.use(cors());
app.use(
  cors({
    // origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    origin: "https://nsa-membership.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

// app.options("/submit", cors());

app.get("/", (req, res) => {
  res.send("NSA Membership Server is Running ✅");
});

app.post("/submit", async (req, res) => {
  try {
    const { name, email, category } = req.body;

    const priceMap = {
      "Student (Single)": 25,
      "Student Couple": 40,
      "Working (Single)": 40,
      "Working Couple": 60,
      "Family Membership": 75,
    };

    const fee = priceMap[category] || 0;

    await db.collection("memberships").add({
      name,
      email,
      category,
      fee,
      timestamp: admin.firestore.Timestamp.now(),
    });

    res.status(200).json({ message: "Membership submitted successfully!" });
  } catch (err) {
    console.error("Error saving to Firestore:", err);
    res.status(500).json({ error: "Failed to submit membership." });
  }
});

app.listen(5050, () => {
  console.log("Server is running on http://127.0.0.1:5050");
});
