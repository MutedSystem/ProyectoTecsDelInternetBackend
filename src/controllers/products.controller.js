import database from "../database";

import * as productDAOs from '../DAO/products.dao';

export const createProduct = (req, res) => {

    try {
        const {
            name,
            description,
            price,
            state
        } = req.body;

        if (!name || !description || !price || !state) {
            return res.status(400).json({
                message: 'incomplete information'
            });
        } else {


            const photosUrl = [];

            req.files.forEach(file => {
                photosUrl.push(("localhost:54215" || process.env.PORT) + "/productImages/" + file.filename);
            });

            const productInfo = [
                [
                    description,
                    name,
                    price,
                    JSON.stringify({
                        photosUrl
                    }),
                    state
                ]
            ];

            productDAOs.createProduct(productInfo)
                .then(() => {
                    return res.json({
                        message: 'product correctly added'
                    });
                })
                .catch((error) => {
                    return res.status(error.code).json({
                        message: error.message
                    });
                })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'internal server error'
        });
    }
}

export const getProduct = (req, res) => {
    try {
        if (!req.params.idProducto) {
            return res.status(400).json({
                message: 'incompconste data'
            });
        } else {
            productDAOs.getProduct(req.params.idProducto)
                .then((product) => {
                    return res.json({
                        product
                    });
                })
                .catch((error) => {
                    return res.status(error.code).json({
                        message: error.message
                    });
                });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'bad request'
        });
    }
}

export const getProducts = (req, res) => {
    try {
        productDAOs.getProducts()
            .then((products) => {
                return res.json({
                    products: products.products
                });
            })
            .catch((error) => {
                return res.status(error.code).json({
                    message: error.message
                });
            });
    } catch (error) {
        return res.status(500).json({
            message: 'internal server error'
        });
    }
}