var openpgp = require('openpgp'); 
var IPFS = require('ipfs');
openpgp.initWorker({ path:'openpgp.worker.js' })
    .then(function(data){
        console.log(data);

        var options, encrypted, decryptoptions;

        options = {
            message: openpgp.message.fromBinary(new Uint8Array([0x01, 0x01, 0x01])), // input as Message object
            passwords: ['secret stuff'],                                             // multiple passwords possible
            armor: false                                                             // don't ASCII armor (for Uint8Array output)
        };
    
        openpgp.encrypt(options).then(function(ciphertext) {
            encrypted = ciphertext.message.packets.write(); 
        // get raw encrypted packets as Uint8Array
        });


    }).catch(function(err){
        console.log("err", err);
    })


    async function fun(){
        await openpgp.initWorker({ path:'openpgp.worker.js' });
        var options, encrypted, decryptoptions;
        options = {
            message: openpgp.message.fromBinary(new Uint8Array([0x01, 0x01, 0x01])), // input as Message object
            passwords: ['secret stuff'],                                             // multiple passwords possible
            armor: false                                                             // don't ASCII armor (for Uint8Array output)
        };
        
        await openpgp.encrypt(options).then(function(ciphertext) {
            encrypted = ciphertext.message.packets.write(); // get raw encrypted packets as Uint8Array
        });
        decryptoptions = {
            message: await openpgp.message.read(encrypted), // parse encrypted bytes
            passwords: ['secret stuff'],              // decrypt with password
            format: 'binary'                          // output as Uint8Array
        };
        
        await openpgp.decrypt(decryptoptions).then(function(plaintext) {
            console.log(plaintext.data);
            return plaintext.data // Uint8Array([0x01, 0x01, 0x01])
        });

        const node = await IPFS.create()
        // Your node is now ready to use \o/
        await node.stop()
        console.log("stopping node");

    };

    fun(); 