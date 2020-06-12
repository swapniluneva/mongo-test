const db = require('../../lib/base.db'),
    utils = require('../../lib/utilities'),
    collectionName = 'userView';

const getUsers = async (req, res, next) => {
    try {
        const coll = db(collectionName);
        const ProductId = req.params.ProductId;
        const startDate = req.params.startDate;
        const endDate = req.params.endDate;
        const frequency = req.params.frequency;
        let dateFrequecyGroup = {
            $dateToString: { format: "%Y-%m-%d", date: "$ViewDate" }
        };
        switch(frequency) {
            case 'monthly':
                    dateFrequecyGroup = {month: { $month: "$ViewDate" },};
                break;
            case 'weekly':
                    dateFrequecyGroup = {week: { $week: "$ViewDate" }};
                break;
        }
        const pipeline = [
            {
                $match: {
                    ProductId,
                    ViewDate: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            },
            {
                $group: { 
                    _id: dateFrequecyGroup, 
                    users: { $addToSet: "$UserId"},
                    totalUsers: { $sum: 1 } 
                } 
            },
            { 
                $project: {
                    _id: false,
                    date: "$_id",
                    totalUsers: 1,
                    uniqueUsers: { $size: "$users" }
                }
            },
        ];
        const options = {
            allowDiskUse: true
        }
        
        const result = await coll.aggregate(req.conn, pipeline, options);
        console.log(pipeline, result, pipeline[0]);
        return utils.sendData(req, res, result);
    } catch(err) {
        return utils.sendError(req, res, 'Something went wrong', err)
    }
    
}
module.exports = {
    getUsers
}