import database from "../database";

export const createProduct = (req, res) => {

    try {

        const photosUrl = [];

        req.files.forEach(file => {
            photosUrl.push(("localhost:54215" || process.env.PORT) + "/productImages/" + file.filename);
        });

        if (!req.body.name || !req.body.description || !req.body.price) {
            return res.status(400).json({
                message: 'incomplete information'
            });
        } else {
            const {
                name,
                description,
                price,
                state
            } = req.body;

            let query = "INSERT INTO `producto`( `descripcion`, `nombre`, `precio`, `fotos`,`estado`) VALUES (?)";

            let productInfo = [
                [
                    description,
                    name,
                    price,
                    JSON.stringify({ photosUrl }),
                    state
                ]
            ];

            database.query(query, productInfo, (addProductError, addProductResponse) => {
                if (addProductError) {
                    return res.status(500).json({
                        message: 'bad query',
                        addProductError
                    });
                } else {
                    return res.json({
                        message: 'product correctly added'
                    });
                }
            });

        }
    } catch (error) {
        return res.status(500).json({
            message: 'internal server error',
            error
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
            const query = "SELECT nombre, precio, fotos FROM producto WHERE idProducto='" + req.params.idProducto + "';";
            database.query(query, (getProductError, product) => {
                if (getProductError) {
                    return res.status(500).json({
                        message: 'bad request'
                    });
                } else {
                    return res.json({
                        product
                    });
                }
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
        const query = "SELECT nombre, precio, fotos FROM producto WHERE estado='public';";
        database.query(query, (getProductsError, products) => {
            if (getProductsError) {
                return res.status(500).json({
                    message: 'bad request'
                });
            } else {
                return res.json({
                    products
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'bad request'
        });
    }
}