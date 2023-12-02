// ----------------------------
// Collection structure for books
// ----------------------------
db.getCollection("books").drop();
db.createCollection("books");

// ----------------------------
// Documents of books
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("bookhubconnect");
db.getCollection("books").insert([ {
    _id: ObjectId("6568872d734d579e5c6e09b8"),
    title: "Beatae in et dolores",
    author: "Similique in rerum e",
    details: "Et vero eum est rep",
    isbn: "Est sit qui ullam i",
    genre: [
        ObjectId("65659aacf2e06d4c7624e262")
    ],
    user: [
        ObjectId("6568afb3b2af31d42c7b6fa0")
    ],
    __v: NumberInt("0")
} ]);
db.getCollection("books").insert([ {
    _id: ObjectId("65688831d73f43e9d65d03ad"),
    title: "Omnis excepturi nost",
    author: "Officia aut iste ver",
    details: "Veniam sint perspi",
    isbn: "Ea fugit amet volu",
    genre: [
        ObjectId("65659abcf2e06d4c7624e263")
    ],
    user: [
        ObjectId("6568afb3b2af31d42c7b6fa0")
    ],
    __v: NumberInt("0")
} ]);
db.getCollection("books").insert([ {
    _id: ObjectId("6568b36bd60fd69cc4393d98"),
    title: "Dolore placeat labo",
    author: "Expedita sit archit",
    details: "Enim est consequat ",
    isbn: "Libero magnam conseq",
    genre: [
        ObjectId("65659aacf2e06d4c7624e262")
    ],
    user: [
        ObjectId("6568afb3b2af31d42c7b6fa0")
    ],
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for genres
// ----------------------------
db.getCollection("genres").drop();
db.createCollection("genres");

// ----------------------------
// Documents of genres
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("bookhubconnect");
db.getCollection("genres").insert([ {
    _id: ObjectId("65659aacf2e06d4c7624e262"),
    name: "childrens literature"
} ]);
db.getCollection("genres").insert([ {
    _id: ObjectId("65659abcf2e06d4c7624e263"),
    name: "travel"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for reviews
// ----------------------------
db.getCollection("reviews").drop();
db.createCollection("reviews");

// ----------------------------
// Documents of reviews
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("bookhubconnect");
db.getCollection("reviews").insert([ {
    _id: ObjectId("6568880cd73f43e9d65d039e"),
    score: NumberInt("3"),
    content: "Test",
    createTime: ISODate("2023-11-30T13:03:08.595Z"),
    user: [
        ObjectId("6565974465ea7ebbbd36343d")
    ],
    book: [
        ObjectId("6568872d734d579e5c6e09b8")
    ],
    __v: NumberInt("0")
} ]);
db.getCollection("reviews").insert([ {
    _id: ObjectId("6568bcdc78b7a0c115bc8e85"),
    score: NumberInt("3"),
    content: "11",
    createTime: ISODate("2023-11-30T16:48:28.143Z"),
    user: [
        ObjectId("6565974465ea7ebbbd36343d")
    ],
    book: [
        ObjectId("65688831d73f43e9d65d03ad")
    ],
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("bookhubconnect");
db.getCollection("users").insert([ {
    _id: ObjectId("6565974465ea7ebbbd36343d"),
    username: "9527",
    password: "202cb962ac59075b964b07152d234b70",
    nickname: "9527",
    role: NumberInt("2"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("6568afb3b2af31d42c7b6fa0"),
    username: "admin",
    password: "202cb962ac59075b964b07152d234b70",
    nickname: "admin",
    role: NumberInt("1"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("6568b1d6a31fba1194d0d395"),
    username: "mefipi",
    password: "f3ed11bbdb94fd9ebdefbaf646ab94d3",
    nickname: "Britanney Montgomery",
    role: NumberInt("2"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("6568b20a6fad235156479b95"),
    username: "pumupen",
    password: "f3ed11bbdb94fd9ebdefbaf646ab94d3",
    nickname: "Heidi Faulkner",
    role: NumberInt("1"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("6568b2b57511f2a01e7245e7"),
    username: "tykuf",
    password: "f3ed11bbdb94fd9ebdefbaf646ab94d3",
    nickname: "Courtney Jacobson",
    role: NumberInt("2"),
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();
