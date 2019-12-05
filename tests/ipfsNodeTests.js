var assert = require('assert');
const ipfsNode = require('../src/scripts/ipfsNode');

const node = ipfsNode();

describe('IPFS Node', function(){
    it('node should not be null', function(){
        assert.equal(node !== null, true, "node was empty")
    });
}); 

node.createNode().then(function(){
    let path = 'ipfs.txt';
    let content =  Buffer.from('Intergalactic Planetary!');
    const filesAdded = node.uploadFileToNode(path,content).then(function(){
        describe('Files Added', function(){
            it('should have a path ', function(){
                assert.notEqual(filesAdded[0].path.length > 0, true, "file path length is 0");
            })
        })
        node.stopNode();
    })
});