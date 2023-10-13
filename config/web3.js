const { JsonRpcProvider, ethers } = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

const provider = new JsonRpcProvider(process.env.NETWORK_RPC);

const lootBoxContractABI = [
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "boxType",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const itemContractABI = [
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenType",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const keyContractABI = [
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "keyBoxID",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const lootBoxContract = new ethers.Contract(
  process.env.LOOTBOX_CONTRACT,
  lootBoxContractABI,
  provider,
);
const itemContract = new ethers.Contract(
  process.env.ITEM_CONTRACT,
  itemContractABI,
  provider,
);
const keyContract = new ethers.Contract(
  process.env.KEY_CONTRACT,
  keyContractABI,
  provider,
);

module.exports = { provider, lootBoxContract, itemContract, keyContract };
