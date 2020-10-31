const express = require('express');
const indexRouter = express.Router();

/**API for routing the index page.
 */
indexRouter.get('', (req,res) =>{
    res.render('index');
})

module.exports = indexRouter;