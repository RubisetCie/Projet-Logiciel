/* 
 * The code containing functions associated with the Restaurant's requests.
 * Author	: Rubisetcie
 */

// Importing the associated service
const service = require("../service/restaurantService");

// Importing the utils functions
const handleError = require("../utils/apiUtils").handleError;

// Importing the ApiError exception class
const ApiError = require("../exception/apiError");

// Retrieving restaurant data by ID
module.exports.getById = function(req, res) {
    try {
        const id = parseInt(req.params.id, 10);

        // Paramters verification
        if (isNaN(id))
            throw new ApiError("Parameter not recognized: id", 400);
        
        service.getById(id).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "retrieving resturant");
        });
    } catch (err) {
        handleError(err, res, "retrieving resturant");
    }
};

// Retrieving multiple restaurant data by filter
module.exports.getAll = function(req, res) {
    try {
        var limit = null;
        var offset = null;
        var status = null;
        
        // Parameters reading
        if (req.query) {
            limit = req.query["limit"] ? parseInt(req.query["limit"]) : null;
            offset = req.query["offset"] ? parseInt(req.query["offset"]) : null;
            status = req.query["status"] ? req.query["status"].split(';') : null;
        }
        
        // Paramters verification
        if (limit) {
            if (isNaN(limit))   throw new ApiError("Parameter type not recognized: limit", 400);
            if (limit < 1)      throw new ApiError("Parameter below accepted value: limit below 1", 400);
        }
        
        if (offset) {
            if (isNaN(offset))  throw new ApiError("Parameter type not recognized: offset", 400);
            if (offset < 0)     throw new ApiError("Parameter below accepted value: offset below 0", 400);
        }
        
        if (status) {
            if (!Array.isArray(status))
                throw new ApiError("Parameter type not recognized: status", 400);
        }
        
        service.getAll(limit, offset, status).then((result) => {
            const json = [];
            result.forEach((r) => {
                json.push(r.toJson());
            });
            res.json(json);
        }).catch((error) => {
            handleError(error, res, "retrieving resturant");
        });
    } catch (err) {
        handleError(err, res, "retrieving resturant");
    }
};