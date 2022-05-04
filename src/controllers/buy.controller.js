import database from '../database';
import crypto from 'crypto';

export const makeBuy = (req, res) => {
    try {
        if (!req.body.products || !req.body.id || !req.body.date || !req.body.quantityToPay) {
            return res.status(400);
        } else {
            const {
                products,
                id,
                date,
                quantityToPay
            } = req.body;

            const buyId = crypto.randomUUID();
            const addBuyQuery = "INSERT INTO `compra`(`idCompra`, `fecha`, `totalAComprar`, `idUsuario`) VALUES ('" + buyId + "','" + date + "','" + quantityToPay + "','" + id + "')";

            database.query(addBuyQuery, (addBuyError, addBuyResult) => {
                if (addBuyError) {
                    return res.status(500).json({
                        message: 'bad request'
                    });
                } else {
                    const productBuyQuery = "INSERT INTO `compraproducto`(`idCompra`, `idProducto`, `cantidad`) VALUES ?";
                    const productsBuy = [];
                    products.forEach(product => {
                        productsBuy.push([
                            buyId,
                            product.id,
                            product.quantity
                        ]);
                    });

                    database.query(productBuyQuery, [productsBuy], (productBuyAddqueryError, productBuyQueryResult) => {
                        if (productBuyAddqueryError) {
                            return res.status(500).json({
                                message: 'bad request'
                            });
                        } else {
                            return res.json({
                                message: 'added'
                            });
                        }
                    });
                }
            });

        }
    } catch (error) {
        return res.status(500).json({
            message: 'something gone wrong'
        });
    }
}

export const seeBuys = (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400);
        } else {

        }
    } catch (error) {
        return res.status(500).json({
            message: 'bad request'
        });
    }
}