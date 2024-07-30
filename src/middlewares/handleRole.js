export const handleRole = async (req, res, next) => {
    const adminEndPoint = '/adminsignup';
    if (req.path === adminEndPoint) {
        req.body.role = 'admin';
    } else {
        req.body.role = 'customer'; // Default role if not admin
    }

    next();
}