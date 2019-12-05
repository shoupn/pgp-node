const keypair = require('keypair');

generateKeyPair = function (){
    const pair = keypair();
    return pair;
};

module.exports.generateKeyPair = generateKeyPair;