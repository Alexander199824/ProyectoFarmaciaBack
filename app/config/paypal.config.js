const paypal = require('paypal-rest-sdk');

// Configura PayPal con tus credenciales
paypal.configure({
    'mode': 'sandbox', // Cambiar a 'live' para producción
    'client_id': 'YOUR_CLIENT_ID', // Reemplaza con tu client_id de PayPal
    'client_secret': 'YOUR_CLIENT_SECRET' // Reemplaza con tu client_secret de PayPal
});

module.exports = paypal;
