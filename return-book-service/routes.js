
class Routes {
  constructor(app) {
    this.app = app;
  }

  /* creating app Routes starts */
  appRoutes() {
    // this.app.get('/product/:productId', (req, res) => {
    //   console.log(req.params);
    //   res.send(`Req Product Data for ${req.params.productId}`);
    // });

    // this.app.get('/product', (req, res) => {
    //   res.send(`Get All Products, code goes here `);
    // });
  }

  routesConfig() {
    this.appRoutes();
  }
}
module.exports = Routes;
