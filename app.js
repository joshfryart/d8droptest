let userAddress;

async function connectWallet() {
    const provider = new WalletConnectProvider({
        rpc: {
            1: "https://mainnet.infura.io/v3/6ef05aa7b8494603a5b92291fe0cf00c",
            4: "https://rinkeby.infura.io/v3/6ef05aa7b8494603a5b92291fe0cf00c",
        }
    });

    await provider.enable();

    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    userAddress = await signer.getAddress();

    // Check if user has any NFT in the contract ID 0xc8eaa330e9172e4b1fcdae21ab90188dc03f0cc5
    const nftContract = new ethers.Contract('0xc8eaa330e9172e4b1fcdae21ab90188dc03f0cc5', ['function balanceOf(address) view returns (uint256)'], web3Provider);
    const balance = await nftContract.balanceOf(userAddress);

    // Show the dice roller if the user has any NFT
    if (balance > 0) {
        document.getElementById('diceRoller').style.display = 'block';
    } else {
        alert('You do not own the required NFT to play this game.');
    }
}

document.getElementById('rollDice').addEventListener('click', () => {
    const result = Math.floor(Math.random() * 8) + 1;
    document.getElementById('result').textContent = result;
});

document.getElementById('connectWallet').addEventListener('click', connectWallet);
