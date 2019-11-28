var express = require('express');
var router = express.Router();
var UserView = require('../models/UserView')
var moment = require('moment')

const methodNotAllowed = (req, res, next) => res.sendStatus(405);

/* get user views. */
router.route('/getUserViews').post(async (req, res) => {
  try {
    let getViews = '';
    let query = {}
    if (req.body.searchType !== '') {
      if (req.body.searchType === 'Today') {
        query = { "$gte": moment().startOf('day').toDate(), "$lte": moment().endOf('day').toDate() };
      } else if (req.body.searchType === 'Weekly') {
        query = { "$gte": moment().startOf('week').toDate(), "$lte": moment().endOf('week').toDate() };
      } else if (req.body.searchType === 'Monthly') {
        query = { "$gte": moment().startOf('month').toDate(), "$lte": moment().endOf('month').toDate() }
      }
    } else {
      query = { "$gte": moment(req.body.startDate).startOf('day').toDate(), "$lt": moment(req.body.endDate).endOf('day').toDate() };
    }

    getViews = await UserView.aggregate([{ $match: { "viewDate": query } }, { $group: { _id: "$userId", count: { $sum: 1 } } }])

    res.status(200).json({ statusCode: 200, success: true, message: 'Data fetched successfully', data: getViews  })
  } catch (err) {
    console.log('err', err)
    res.status(400).json({ statusCode: 400, success: false, message: err, data: null })
  }

}).all(methodNotAllowed);

module.exports = router;
