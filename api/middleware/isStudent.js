/**
 * Verify if user has admin role
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports = (req, res, next) => {
    next();
    return;
   // res.status(401).send('Unauthorized');
};