exports.getTokenByID = (req, res) => {
    const tokenID = req.params.tokenID;

    const tokenData = {
            "image": "ipfs://QmeycVEh9ywcDf2gNvaPC6VkKhkLmH67CFkgLoAPqzxEuY",
            "name": "Gamer " + tokenID,
            "attributes": [
                {"trait_type": "Charchter", "value": 1}
            ]
    };
        res.json(tokenData);
};
