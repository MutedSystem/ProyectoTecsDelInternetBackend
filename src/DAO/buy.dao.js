import database from '../database';

export const addBuy = (buyData) => {
    return new Promise((resolve, reject) => {

        const addBuyQuery = "INSERT INTO `compra`(`idCompra`, `fecha`, `totalAComprar`, `idUsuario`) VALUES (?);";

        database.query(addBuyQuery, [buyData], (addBuyError, addBuyResult) => {
            if (addBuyError) {
                reject({
                    code: 500,
                    message: 'internal server error',
                    addBuyError
                });
            } else {
                resolve(true);
            }
        });

    });
}

export const addProductBuy = (productBuyInfo) => {
    return new Promise((resolve, reject) => {

        const productBuyQuery = "INSERT INTO `compraproducto`(`idCompra`, `idProducto`, `cantidad`) VALUES ?";
       
        database.query(productBuyQuery, [productBuyInfo], (productBuyAddqueryError, productBuyQueryResult) => {
            if (productBuyAddqueryError) {
                reject({
                    code: 500,
                    message: 'internal server error',
                    productBuyAddqueryError
                });
            } else {
                resolve(true);
            }
        });
    });

}

export const seeBuysMade = (idUsuario)=>{

    return new Promise((resolve,reject) => {
        const query = `SELECT c.idCompra, c.totalAComprar, c.fecha ,p.nombre, p.fotos ,p.descripcion, p.precio , cp.cantidad
        FROM compraproducto cp  left join  compra c on (cp.idCompra=c.idCompra) left join producto p on (cp.idProducto=p.idProducto)
        WHERE c.idUsuario=? order by c.idCompra ASC;`

        database.query(query, idUsuario,(getBoughtsError, boughts) => {
            if(getBoughtsError){
                reject({
                    code: 500,
                    message : 'internal server error'
                });
            }else{
                resolve(boughts);
            }
        });

    })


}