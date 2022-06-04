import database from '../database';

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT idProducto,nombre, precio, fotos FROM producto WHERE estado='public';";
        database.query(query, (getProductsError, products) => {
            if (getProductsError) {
                reject({
                    code: 500,
                    message: 'internal server error'
                });
            } else {
                resolve({
                    products
                });
            }
        });
    });
}

export const getProduct = (idProducto) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT nombre, precio, fotos, descripcion FROM producto WHERE idProducto=?;";
        database.query(query, idProducto, (getProductError, product) => {
            if (getProductError) {
                reject({
                    code: 500,
                    message: 'internal server error'
                });
            } else {
                if (product.length >= 1) {
                    resolve(product);
                } else {
                    reject({
                        code: 404,
                        message: 'product not found'
                    });
                }
            }
        });
    });
}

export const createProduct = (productInfo) => {
    return new Promise((resolve, reject) => {
        let query = "INSERT INTO `producto`( `descripcion`, `nombre`, `precio`, `fotos`,`estado`) VALUES (?)";

        database.query(query, productInfo, (addProductError, addProductResponse) => {
            if (addProductError) {
                reject({
                    code: 500,
                    message : 'internal server error'
                });
            } else {
                resolve(true);
            }
        });
    });
}