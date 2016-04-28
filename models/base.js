var base={ };
base.getClientIp = function(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

base.heredoc = function (fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n';
}

module.exports = base;