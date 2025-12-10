db = db.getSiblingDB("my_db");

// --- Helper: JSON fájl beolvasása és ObjectId konvertálása ---
function parseWithObjectId(jsonString) {
    const raw = JSON.parse(jsonString);

    function transform(doc) {
        // belső bejárás minden objektumra
        for (const key in doc) {
            if (doc[key] && typeof doc[key] === "object") {
                // ha { "$oid": "..." }
                if (doc[key]["$oid"]) {
                    doc[key] = ObjectId(doc[key]["$oid"]);
                } else {
                    transform(doc[key]);
                }
            }
        }
        return doc;
    }

    if (Array.isArray(raw)) {
        return raw.map(d => transform(d));
    } else {
        return transform(raw);
    }
}

function importJson(collectionName, filename) {
    const file = cat(`/docker-entrypoint-initdb.d/data/${filename}`);
    const docs = parseWithObjectId(file);

    if (docs.length > 0) {
        db.getCollection(collectionName).insertMany(docs);
        print(`Imported ${docs.length} → ${collectionName}`);
    } else {
        print(`No documents in ${filename}`);
    }
}

// --- COLLECTIONS ---
db.createCollection("bookings");
db.createCollection("cars");
db.createCollection("extras");
db.createCollection("users");
db.users.insertMany([
  {
    _id: ObjectId("67c841e1ca8cdf3ba30bca60"),
    email: "admin@admin.com",
    name: "Kristóf Molnár",
    address: "Szeged ..",
    nickname: "asdasd",
    password: "$2b$10$hW8IHmXyWYZf3SIVY7YK1..O0zJWDwEWMDlH3hkWydTQkoVRmsjsK",
    role: "Admin",
    __v: 0
  },
  {
    _id: ObjectId("68285bcb91ed0c4b5aa15e44"),
    email: "t@t.com",
    name: "Kristóf Molnár",
    address: "Budapest ..",
    nickname: "asd",
    password: "$2b$10$qt.VD2mZOyw8DbvlmGgED.MkUgIpRJugfk8Mog2wiEAvAJFItg8Um",
    role: "Admin",
    __v: 0
  },
  {
    _id: ObjectId("682a16278d389791de4d9e28"),
    email: "d@d.com",
    name: "delete",
    address: "Záhony ..",
    nickname: "delete",
    password: "$2b$10$9.AUTbuMt4lKWQqotEZqmumDBz/w.GyLkhch8PuQyyuoNM9Co2q1a",
    role: "User",
    __v: 0
  },
  {
    _id: ObjectId("682a177f8d389791de4d9e41"),
    email: "user@user.com",
    name: "Gipsz Jakab",
    address: "Szeged",
    nickname: "User1",
    password: "$2b$10$RvM6Pr8fsEa852Cesg4Kae68vkN0kFh0vM9TrnBw4J9F0L5dCTCo.",
    role: "User",
    __v: 0
  },
  {
    _id: ObjectId("682a59d30e670019bd8cf05a"),
    email: "felhasznalo@felhasznalo.com",
    name: "user",
    address: "Budapest..",
    nickname: "User",
    password: "$2b$10$DViHpK3f5NuGZPXPcDWc2ewZrPOOakRqKPYuAmOFb0xSSEYTZ0See",
    role: "User",
    __v: 0
  }
]);
db.cars.insertMany([
  {
    _id: ObjectId("68272067e96f501021d2a5de"),
    brand: "Mercedes-Benz S-Class",
    car_model: "S 500 4MATIC",
    year: 2023,
    price: 89000,
    imagePath: "/uploads/1747394663662-1740017291517.avif",
    __v: 0
  },
  {
    _id: ObjectId("682720a3e96f501021d2a5e1"),
    brand: "BMW",
    car_model: " 7 Series 2022",
    year: 2022,
    price: 85000,
    imagePath: "/uploads/1747394723152-ygHUwo.png",
    __v: 0
  },
  {
    _id: ObjectId("682720c4e96f501021d2a5e4"),
    brand: "Audi",
    car_model: " A8 L",
    year: 2023,
    price: 83000,
    imagePath: "/uploads/1747394867561-audi-a8-l-sedan-arak-meretek-uj-hasznalt-auto-arlista.jpg",
    __v: 0
  },
  {
    _id: ObjectId("68272198e96f501021d2a5f5"),
    brand: "Porsche",
    car_model: "Panamera 2022",
    year: 2022,
    price: 110000,
    imagePath: "/uploads/1747394968666-cc_2022prc130048_01_1280_a1.avif",
    __v: 0
  },
  {
    _id: ObjectId("682721bce96f501021d2a5f8"),
    brand: "Lexus",
    car_model: " LS 500h",
    year: 2025,
    price: 79000,
    imagePath: "/uploads/1747395004260-images.jpg",
    __v: 0
  },
  {
    _id: ObjectId("682721e2e96f501021d2a5fb"),
    brand: "Rolls-Royce",
    car_model: "Phantom",
    year: 2010,
    price: 120000,
    imagePath: "/uploads/1747395042322-10f7c4c4-7330-4b61-998b-68292ca8ef78.webp",
    __v: 0
  },
  {
    _id: ObjectId("682721fde96f501021d2a5fe"),
    brand: "Bentley",
    car_model: "Mulsanne",
    year: 2025,
    price: 115000,
    imagePath: "/uploads/1747395069506-10f7c4c4-7330-4b61-998b-68292ca8ef78.webp",
    __v: 0
  },
  {
    _id: ObjectId("6827229be96f501021d2a606"),
    brand: "Ferrari",
    car_model: "F8 Tributo",
    year: 2025,
    price: 780000,
    imagePath: "/uploads/1747395227420-Bianco Avus-BIA-228,224,218-640-en_US.avif",
    __v: 0
  }
]);
db.extras.insertMany([
  {
    _id: ObjectId("68299c4d7b520d80b11a1a22"),
    name: "GPS",
    price: "500",
    details: "WayteQ x995 MAX GPS navigáció",
    __v: 0
  },
  {
    _id: ObjectId("6829a1170656fac91af14e47"),
    name: "Sofőr",
    price: "40000",
    details: "Hivatásos sofőr",
    __v: 0
  },
  {
    _id: ObjectId("6829a1660656fac91af14e4a"),
    name: "Casco",
    price: "10000",
    details: "Baleset biztosítás",
    __v: 0
  },
  {
    _id: ObjectId("682a2192d8493053ef063b9d"),
    name: "Gyerekülés",
    price: 0,
    details: "Ingyenesen kérhető gyerekülés",
    __v: 0
  }
]);
