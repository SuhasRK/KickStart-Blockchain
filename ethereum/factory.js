import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const address="0x07540ADEeCdAa319E7816038969450BDb003Ca5b"

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    address
)

export default instance;