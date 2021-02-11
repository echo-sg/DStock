import {React,Component} from 'react';
import './App.css';
import NavigationTabs from "./components/navigation";
import DStock from './abis/DStock.json'
import Web3 from 'web3';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) 

class App extends Component {

  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = DStock.networks[networkId]
    if(networkData) {
      const dstock = new web3.eth.Contract(DStock.abi, networkData.address)
      this.setState({ dstock })
      const assetcount = await dstock.methods.assetCount.call()
      this.setState({ assetcount }) 
      // for (var i = 0; i < assetcount; i++) {
      //   const asset = await dstock.methods.assets(i).call()
      //   this.setState({
      //       asset: [...this.state.asset, asset]
      //   })
      // }

      const myId = await dstock.methods.getId.call({ from: this.state.account })
      let Person = await dstock.methods.getPerson.call({ from: this.state.account })
      // const Person = await dstock.methods.getPerson.call({ from: this.state.account })
      // const address = Person[0];
      // const earning = Person[1];
      // const tokenCount = Person[2];
      // this.setState({address, earning ,tokenCount})
      // console.log(address, earning ,tokenCount)
      this.setState({ loading: false})
    } else {
      window.alert('Contract not deployed to detected network.')
    }
    console.log(this.state)
  }
  
  captureFile = event => {
        
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        
        reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
          console.log('buffer', this.state.buffer)
        }
  }
  
  uploadAsset = (cost) => {
    console.log("Submitting file to ipfs...")
    ipfs.add(this.state.buffer, (error, result) => { //This isnt executed
      console.log('Ipfs result', result)
      if(error) {
        console.log("Error")  
        console.error(error)
        return
      }
    console.log("no error")  
      this.setState({ loading: true })
      this.state.dstock.methods.uploadAsset(result[0].hash, cost).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  buyAsset = (assetId) =>{
    this.setState({ loading: true })
    this.state.dstock.methods.buyAsset(assetId).send({ from: this.state.account}).on('transactionHash', (hash) => {
    this.setState({ loading: false })
    })
  }

  // showUploads = () =>{
      
  // }
  // showStats = () =>{
        
  // }
        constructor(props) {
          super(props)
          this.state = {
            account: '',
            tokenCount: 0,
            earnings: 0,
            address:'',
            dstock: null,
            asset: [],
            buffer:[],
            loading: true
          }
      
          this.uploadAsset = this.uploadAsset.bind(this)
          this.captureFile = this.captureFile.bind(this)  
          this.buyAsset = this.buyAsset.bind(this)  
        }
        
  render() {
    return (
      <div className="App">
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <NavigationTabs 
          account={this.state.account}
          captureFile={this.captureFile}
          uploadAsset={this.uploadAsset}
          buyAsset={this.buyAsset} />
        }
      </div>
    );
  }
}

export default App;