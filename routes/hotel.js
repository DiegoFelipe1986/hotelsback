var express = require('express');
var app = express();
var Hotel = require('../models/hotel')

// =======================================
// Get all hotels
// =======================================
app.get('/', (req, res, next) => {
    Hotel.find({}, 'name starts price image amenities')
        .exec(
            (err, hotels) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error cargando hoteles',
                        errors: err
                    })
                }

                res.status(200).json({
                    ok: true,
                    hotels
                })
            })
});

// =======================================
// Create hotel
// =======================================
app.post('/', (req, res) => {
    var body = req.body;
    var hotel = new Hotel({
        name: body.name,
        starts: body.starts,
        price: body.price,
        image: body.image,
        amentities: body.amentities
    });

    hotel.save((err, hotelSaving) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear hotel',
                errors: err
            })
        }

        res.status(201).json({
            ok: true,
            hotel: hotelSaving
        })
    });

});

// =======================================
// Create hotel
// =======================================
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Hotel.findById(id, (err, hotel) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar hotel',
                errors: err
            });
        }

        if (!hotel) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'El hotel con el id' + id + 'no existe',
                    errors: { message: 'NO exite hotel con ese id' }
                });
            }
        }

        hotel.name = body.name;
        hotel.starts = body.starts;
        hotel.price = body.price;

        hotel.save((err, hotelSaving) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al actualizar hotel',
                    errors: err
                });
            }

            res.status(201).json({
                ok: true,
                hotel: hotelSaving
            });

        });

    });

});

// =======================================
// Delete hotel by Id
// =======================================
app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Hotel.findByIdAndRemove(id, (err, hotelDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al borrar hotel',
                errors: err
            })
        }

        if (!hotelDeleted) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'El hotel con el id' + id + 'no existe',
                    errors: { message: 'NO exite hotel con ese id' }
                });
            }
        }

        res.status(200).json({
            ok: true,
            hotel: hotelDeleted
        })
    });

});

module.exports = app;