const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;


const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.mvaju.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    err ? console.error(err.message) : console.info("Database Connected Successfully!")

    app.get('/', (req, res, next) => {
        res.send({
            status: 'OK',
            code: 200
        })
    })

    // Services
    const servicesCollection = client.db(DB_NAME).collection("services");
    app.get('/services', (req, res) => {
        servicesCollection.find({})
            .toArray((error, result) => {
                res.send(result);
            });
    });

    app.get('/service/:id', (req, res) => {
        const { id } = req.params;
        servicesCollection.find({ _id: ObjectId(id) })
            .toArray((error, result) => {
                res.send(result[0]);
            });
    });

    app.post('/add-service', (req, res) => {
        const newService = req.body;
        servicesCollection.insertOne(newService)
            .then(result => {
                res.send({ isAdded: result.insertedCount > 0 });
            });
    });

    app.delete('/delete-service/:id', (req, res) => {
        const id = req.params.id;
        servicesCollection.deleteOne({ _id: ObjectId(id) })
            .then(result => {
                res.send({ isDeleted: result.deletedCount > 0 });
            });
    });

    // Blogs
    const BlogsCollection = client.db(DB_NAME).collection("reviews");
    app.get('/reviews', (req, res) => {
        BlogsCollection.find({})
            .toArray((error, result) => {
                res.send(result);
            });
    });

    app.post('/add-review', (req, res) => {
        const newReview = req.body;
        BlogsCollection.insertOne(newReview)
            .then(result => {
                res.send({ isAdded: result.insertedCount > 0 });
            });
    });

    app.delete('/delete-service/:id', (req, res) => {
        const id = req.params.id;
        BlogsCollection.deleteOne({ _id: ObjectId(id) })
            .then(result => {
                res.send({ isDeleted: result.deletedCount > 0 });
            });
    });

    // Admins
    const adminsCollection = client.db(DB_NAME).collection("admins");

    app.get('/all-admins', (req, res) => {
        adminsCollection.find({})
            .toArray((error, result) => {
                res.send(result);
            });
    });

    app.post('/make-admin', (req, res) => {
        const admin = req.body;
        adminsCollection.findOne({ email: admin.email })
            .then(result => {
                if (result) {
                    res.send({ isAdmin: true });
                }
                else {
                    adminsCollection.insertOne(admin)
                        .then(result => {
                            res.send({ isAdded: result.insertedCount > 0 });
                        });
                }
            });
    });

    app.get('/check-admin/', (req, res) => {
        const { email } = req.query;
        if (email) {
            adminsCollection.findOne({ email })
                .then(result => {
                    if (result) {
                        res.send({ isAdmin: true });
                    }
                    else {
                        res.send({ isAdmin: false });
                    }
                });
        }
        else {
            res.send({ isAdmin: false });
        }
    });

    app.delete('/remove-admin/:id', (req, res) => {
        const id = req.params.id;
        adminsCollection.deleteOne({ _id: ObjectId(id) })
            .then(result => {
                res.send({ isDeleted: result.deletedCount > 0 });
            });
    });

    // Bookings
    const bookingsCollection = client.db(DB_NAME).collection('bookings');
    app.get('/bookings', (req, res) => {
        const { email } = req.query;
        if (email) {
            bookingsCollection.find({ user: email })
                .toArray((error, result) => {
                    res.send(result);
                });
        }
        else {
            bookingsCollection.find({})
                .toArray((error, result) => {
                    res.send(result);
                });
        }
    });

    app.post('/add-booking', (req, res) => {
        const newBooking = req.body;
        bookingsCollection.insertOne(newBooking)
            .then(result => {
                res.send({ isAdded: result.insertedCount > 0 });
            });
    });

    app.patch('/change-booking-status/:id', (req, res) => {
        bookingsCollection.updateOne({ _id: ObjectId(req.params.id) }, {
            $set: { status: req.body.status }
        })
            .then(result => {
                res.send({ isUpdated: result.modifiedCount > 0 });
            });
    });

});


app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));
