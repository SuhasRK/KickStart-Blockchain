const asset=require('assert');
const ganache=require('ganache-cli');
const Web3=require('web3');
const web3=new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign=require('../ethereum/build/Campaign.json');
const { compile } = require('solc');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async()=>{
    accounts= await web3.eth.getAccounts();
    factory= await web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
        data:compiledFactory.bytecode
    })
    .send({
        from:accounts[0],
        gas:'1000000'
    })

    await factory.method.createCampaign('100').send({
        from:accounts[0],
        gas:'100000'
    })

    const addresses=await factory.methods.getDeployedCampaign().call();
    campaignAddress=addresses[0];
    campaign=await new web3.eth.Contract(
        JSON.parse(compiledCampaign,interface),campaignAddress
    )
});



