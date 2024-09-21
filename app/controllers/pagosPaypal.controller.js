const paypal = require('../config/paypal.config.js');
const db = require('../config/db.config.js');
const Transacciones = db.Transacciones;

// Crear un pago de PayPal
exports.createPayment = (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://return.url",  // Reemplaza con tu URL de retorno
            "cancel_url": "http://cancel.url"   // Reemplaza con tu URL de cancelación
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Nombre del Producto",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Esta es la descripción de la transacción."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al crear el pago",
                error: error
            });
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.status(200).json({
                        approval_url: payment.links[i].href
                    });
                }
            }
        }
    });
};

// Ejecutar un pago de PayPal
exports.executePayment = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            res.status(500).json({
                message: "Error al ejecutar el pago",
                error: error.response
            });
        } else {
            console.log("Pago completado con éxito");
            res.status(200).json({
                message: "Pago completado con éxito",
                payment: payment
            });
        }
    });
};

// Cancelar un pago de PayPal
exports.cancelPayment = (req, res) => {
    res.status(200).json({
        message: "Pago cancelado"
    });
};
