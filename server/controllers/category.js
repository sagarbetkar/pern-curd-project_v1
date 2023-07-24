const Category = require('../models/Category');

exports.createCategory = (req,res) => {
    if(req.body.name) {
        Category
        .findOne({where: {name: req.body.name}})
        .then((category) => {
            if(category) {
                return res.json({
                    message: 'Category already exists',
                    status: 200
                })
            } else {
                Category.create({
                    name: req.body.name,
                    createdAt: new Date()
                }).then(() => {
                    return res.json({
                        message: 'Category added successfully',
                        status: 200
                    })
                })
            }
        })
        .catch((error) => {
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

exports.getCategory = (req, res) => {
    Category.findAndCountAll({order: ['id']})
      .then((categories) => {
        if (categories.count == 0) {
          return res.json({
            message: 'No category found',
            status: 404
          });
        } else {
          return res.json({
            message: 'All category fetched',
            count: categories.count,
            data: categories.rows.map((category) => {
              return (category = {
                id: category.id,
                name: category.name,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt
              });
            }),
            status: 200
          });
        }
      })
      .catch((error) => {
        res.json({
          message: 'Server Error',
          error: error,
          status: 500
        });
      });
  };
  
  exports.getCategoryById = (req, res) => {
    Category.findOne({where: {id: req.params.id}})
      .then((category) => {
        if (category == null) {
          return res.json({
            message: 'No Category found',
            status: 404
          });
        } else {
          return res.json({
            category,
            status: 200
          });
        }
      })
      .catch((error) => {
        return res.json({
          message: 'Server Error',
          error: error,
          status: 500
        });
      });
  };
  
  exports.updateCategory = (req, res) => {
    if (
      req.body.name
    ) {
      Category.findOne({where: {id: req.params.id}})
        .then((category) => {
          if (category == null) {
            return res.json({
              message: 'No Category Found',
              status: 404
            });
          } else {
            category
              .update(
                {
                  name: req.body.name,
                  updatedAt: new Date()
                },
                {fields: ['name']}
              )
              .then(() => {
                return res.json({
                  message: 'Category updated successfully',
                  status: 200
                });
              });
          }
        })
        .catch((error) => {
          return res.json({
            message: 'Server Error',
            error: error,
            status: 500
          });
        });
    } else {
      return res.json({
        message: 'Incomplete Inputs',
        status: 400
      });
    }
  };
  
  exports.deleteCategory = (req, res) => {
    Category.findOne({where: {id: req.params.id}})
      .then((category) => {
        if (category == null) {
          return res.json({
            message: 'No category found',
            status: 404
          });
        } else {
          category.destroy({where: {id: req.params.id}});
          return res.json({
            message: 'Category deleted successfully',
            status: 200
          });
        }
      })
      .catch((error) => {
        return res.json({
          message: 'Server Error',
          error: error,
          status: 500
        });
      });
  };