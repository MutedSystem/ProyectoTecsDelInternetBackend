import database from "../database";

export const createProduct = (req, res) => {
    try {
        if(!req.body.name || !req.body.description || !req.body.price || !req.body.photosUrl){
            return res.status(400);
        }else{
            let {
                name, 
                description,
                price,
                photosUrl
            } = req.body;
        }
    } catch (error) {
        return res.status(500);
    }
}

export const getProduct = (req, res) => {
    try {
        if (!req.params.idProducto) {
            return res.status(400).json({
                message: 'incomplete data'
            });
        } else {
            let query = "SELECT nombre, precio, fotos FROM producto WHERE idProducto='" + req.params.idProducto + "';";
            database.query(query, (getProductError, product) => {
                if (getProductError) {
                    return res.status(500);
                } else {
                    return res.json({
                        product
                    });
                }
            });
        }
    } catch (error) {
        return res.status(500);
    }
}

export const getProducts = (req, res) => {
    try {
        let query = "SELECT nombre, precio, fotos FROM producto;";
        database.query(query, (getProductsError, products) => {
            if (getProductsError) {
                return res.status(500);
            } else {
                return res.json({
                    products
                });
            }
        });
    } catch (error) {
        return res.status(500);
    }
}