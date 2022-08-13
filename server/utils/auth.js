function authenticateKey(key){
    if (key != process.env.LOGINKEY) return false;
    return true;
}

module.exports = { authenticateKey };