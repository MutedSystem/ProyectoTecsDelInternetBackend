import { v4 as uuidv4 } from 'uuid';

import * as buyDAOs from '../DAO/buy.dao';

export const makeBuy = (req, res) => {

    const {
        products,
        id,
        date,
        quantityToPay
    } = req.body;

    if (!products || !id || !date || !quantityToPay) {
        return res.status(400);
    } else {

        const buyId = uuidv4();

        buyDAOs.addBuy([
            buyId,
            date,
            quantityToPay,
            id
        ])
            .then(() => {

                const productsBuy = [];

                products.forEach(product => {
                    productsBuy.push([
                        buyId,
                        product.id,
                        product.quantity
                    ]);
                });

                buyDAOs.addProductBuy(productsBuy)
                    .then(() => {
                        return res.json({
                            message: 'buy made'
                        });
                    })
                    .catch((error) => {

                        console.log(error);
                        return res.status(error.code).json({
                            message: error.message
                        })
                    });

            })
            .catch((error) => {
                console.log(error);
                return res.status(error.code).json({
                    message: error.message
                });
            })
    }

    try {

        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'internal server error'
        });
    }
}

export const seeBuys = (req, res) => {
    try {

        const idUsuario = req.body.id;

        if (!idUsuario) {
            return res.status(400).json({
                message: 'incomplete data'
            });
        } else {
            buyDAOs.seeBuysMade(idUsuario)
                .then((boughts) => {

                    var currentBuyId = boughts[0].idCompra;

                    const boughtsJson = [];

                    var products = [];

                    boughts.forEach((bought) => {
                        if (currentBuyId !== bought.idCompra) {
                            boughtsJson.push({
                                total: bought.totalAComprar,
                                date: bought.fecha,
                                products
                            });
                            currentBuyId = bought.idCompra;
                            products = [];
                        }

                        products.push({
                            name: bought.nombre,
                            description: bought.descripcion,
                            quantity: bought.cantidad,
                            photoUrl: JSON.parse(bought.fotos).photosUrl[0]
                        })
                    })

                    return res.json({
                        boughtsJson
                    });

                })
                .catch((error) => {
                    console.log(error);
                    return res.status(error.code).json({
                        message: error.message
                    })
                })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'bad request'
        });
    }
}