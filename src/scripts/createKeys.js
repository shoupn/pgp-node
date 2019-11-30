const keypair = require('keypair');

generateKeyPair = function (){
    const pair = keypair();
    return pair;
};

exports.generateKeyPair = generateKeyPair;