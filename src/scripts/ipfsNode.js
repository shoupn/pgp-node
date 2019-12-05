const IPFS = require('ipfs');

const ipfsNode = function(){

    let node = null;

    async function createNode(){
        console.log("creating a new node");
        this.node = await IPFS.createNode();
        return this.node;
    }

    async function startNode(){
        if(this.node !== null || this.node !== undefined){
            try { 
                // node is not always in a ready state so await for ready
                await this.node.ready;
                await this.node.start();
            }
            catch (error) {
                console.error('Node failed to start!', error)
            }
        }
    }

    async function stopNode(){
        if(this.node !== null || this.node !== undefined){
            this.node.stop(error => {
                if (error) {
                  return console.error('Node failed to stop cleanly!', error)
                }else{
                    console.log('stopped succesfully');
                }

              })
        }; 
    }

    async function uploadFileToNode(path , content){
        await this.node.ready;
        const filesAdded = await this.node.add({
            path: path,
            content: content
          })
        
        console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)
        
        const fileBuffer = await this.node.cat(filesAdded[0].hash)
        
        console.log('Added file contents:', fileBuffer.toString())
        return filesAdded; 
    }

    function getFileFromNode(){

    }

    return {
        node: node,
        startNode: startNode,
        createNode: createNode,
        stopNode: stopNode,
        uploadFileToNode: uploadFileToNode
    }
};

module.exports = ipfsNode;