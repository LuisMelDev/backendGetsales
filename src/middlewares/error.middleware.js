module.exports = (err, req, res, next) => {
    const httpStatus = err.status || 500;

    return res.status(httpStatus).json({
        status: httpStatus,
        message: "[ERROR] " + err.message || "Internal server error",
    });
};
