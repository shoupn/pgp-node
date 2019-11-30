
var assert = require('assert');
const createkeys = require('../src/scripts/createKeys')

describe('KeyPair', function() {
    const keypair = createkeys.generateKeyPair();
    describe('PublicKey', function() {

        it('public key should not be null or empty string', function() {
            assert.equal(keypair.public !== "" && keypair.public !== null && keypair.public !== undefined, true);
        });

        it('public key should contain PUBLIC KEY text', function() {
            assert.equal(keypair.public.includes('RSA PUBLIC KEY'), true);
        });
    });

    describe('PrivateKey', function() {
        it('private key should not be null or empty string', function() {
            assert.equal(keypair.private !== "" && keypair.private !== null && keypair.private !== undefined, true);
        });

        it('private key should contain PRIVATE KEY text', function() {
            assert.equal(keypair.private.includes('RSA PRIVATE KEY'), true);
        });

    });
});