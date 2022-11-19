const util = require("util");
const request = util.promisify(require("request"));

task("create-human", "Creates a Human")
.addParam("contract", "The FamilyTree address")
.setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract
    const FamilyTree = await ethers.getContractFactory("FamilyTree")
    //Get signer information
    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

    async function callRpc(method, params) {
        var options = {
          method: "POST",
          url: "https://wallaby.node.glif.io/rpc/v0",
          // url: "http://localhost:1234/rpc/v0",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: method,
            params: params,
            id: 1,
          }),
        };
        const res = await request(options);
        return JSON.parse(res.body).result;
      }

    const treeContract = new ethers.Contract(contractAddr, FamilyTree.interface, signer)
    let result = await treeContract.createHuman("Jean Gal", "4/20/69", "Moon", "N/A", "N/A", 0, 0, {
        gasLimit: 1000000000,
        maxPriorityFeePerGas: priorityFee
    })
    console.log("Created a Human", result)
})

module.exports = {}