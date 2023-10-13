# Metadata API

Welcome to the Metadata API! 
This backend service allows you to manage metadata for your Items, LootBoxes, and Keys. If you're interested in the associated smart contracts, please visit our [LootboxContract repository](https://github.com/3engine/LootboxContract).

While this backend provides a foundational structure, it's designed to be a starting point. We encourage the community to enhance and tailor it to their needs. Contributions and improvements are always welcome!

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## 🛠 Tech Stack

- **Server:** JS, Node.js, Express, WEB3

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/3engine/metadataAPI
```

### 2. Navigate to the Directory

```bash
cd metadataAPI
```

### 3. Install Dependencies

```bash
npm i
```

### 4. Start the Server

```bash
npm run start
```

## 🌍 Environment Variables

To run this project, ensure you have the following environment variables set up in your `.env` file:

| Variable            | Description                               |
|---------------------|-------------------------------------------|
| `ITEM_CONTRACT`     | Address of the Item Contract              |
| `LOOTBOX_CONTRACT`  | Address of the LootBox Contract           |
| `KEY_CONTRACT`      | Address of the Key Contract               |
| `MONGODB_URI`       | MongoDB Connection URI                    |
| `NETWORK_RPC`       | EVM Network RPC                           |

## 📜 License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
