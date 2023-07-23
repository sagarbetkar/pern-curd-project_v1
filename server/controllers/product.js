const Category = require('../models/Category');
const Product = require('../models/Product');

exports.createProduct = (req, res) => {
    if(req.body.name && req.body.categoryId) {
        Product.create({
            name: req.body.name,
            categoryId: req.body.categoryId,
            createdAt: new Date()
        }).then(() => {
            return res.json({
                message: 'Product added successfully',
                status: 200
            })
        }).catch((error) => {
            return res.json({
                message: 'Server Error',
                error: error,
                status: 500
              });
        })
    } else {
        return res.json({
            message: 'Incomplete Inputs',
            status: 400
        });
    }
}

exports.getAllProducts = async (req,res) => {
    try {
        const [limit, offset] = [10, (req.query.page - 1) * 10];
        const products = await Product.findAndCountAll({
        order: ['id'],
        include:{
            model: Category
        }, offset, limit});
        if(products.count === 0) {
            return res.json({
                message: "No product found",
                status: 200
            })
        } else {
            return res.json({
                products,
                status: 200
            })
        }
    } catch(error) {
        return res.json({
            message: 'Server Error',
            error: error,
            status: 500
        });
    }
}

exports.getProductById = async (req,res) => {
    try {
        const product = await Product.findOne({where: {id: req.params.id}});
        if(product) {
            return res.json({
                product,
                status: 200
            })
        } else {
            return res.json({
                message: "No product found",
                status: 200
            })
        }
    } catch(error) {
        res.json({
            message: 'Server Error',
            error,
            status:500
        })
    }
}

exports.updateProduct = async (req,res) => {
    try {
        if(req.body.name && req.body.categoryId) {
            const product = await Product.findOne({where: {id: req.params.id}});
            if(product === null) {
                return res.json({
                    message: "No product found",
                    status: 200
                })
            } else {
                product.update({
                    name: req.body.name,
                    categoryId: req.body.categoryId,
                    updatedAt: new Date()
                },{
                    fields: ['name', 'categoryId', 'updatedAt']
                })
                .then(() => {
                    return res.json({
                        message: "Product update successfully",
                        status: 200
                    })
                })
            }
        } else {
            return res.json({
              message: 'Incomplete Inputs',
              status: 400
            });
          }
    } catch(error) {
        return res.json({
            message: 'Server Error',
            error: error,
            status: 500
          });
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({where: {id: req.params.id}});
        if(product == null) {
            return res.json({
                message: 'No user found',
                status: 404
              });
        } else {
            product.destroy({where: {id: req.params.id}});
            return res.json({
                message: 'Product deleted successfully',
                status: 200
            });
        }
    } catch(error) {
        return res.json({
            message: 'Server Error',
            error: error,
            status: 500
          });
    }
  };