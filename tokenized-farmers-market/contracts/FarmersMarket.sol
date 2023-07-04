// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FarmersMarket {
	struct Product {
    	uint256 id;
    	address seller;
    	string name;
    	uint256 price;
    	uint256 quantity;
    	bool sold;
	}

	mapping(uint256 => Product) public products;
	uint256 public totalProducts;
	address public admin;
	IERC20 public cUSDToken;

	event ProductAdded(uint256 id, address seller, string name, uint256 price, uint256 quantity);
	event ProductSold(uint256 id, address buyer, uint256 quantity);

	constructor(address _cUSDTokenAddress) {
    	admin = msg.sender;
    	cUSDToken = IERC20(_cUSDTokenAddress);
	}

	modifier onlyAdmin() {
    	require(msg.sender == admin, "Only admin can perform this action");
    	_;
	}

	function addProduct(string memory _name, uint256 _price, uint256 _quantity) external {
    	totalProducts++;
    	products[totalProducts] = Product(totalProducts, msg.sender, _name, _price, _quantity, false);
    	emit ProductAdded(totalProducts, msg.sender, _name, _price, _quantity);
	}

	function buyProduct(uint256 _id, uint256 _quantity) external {
    	require(_id <= totalProducts, "Invalid product ID");
    	Product storage product = products[_id];
    	require(!product.sold, "Product is already sold");
    	require(product.quantity >= _quantity, "Insufficient quantity");

    	uint256 totalPrice = product.price * _quantity;
    	require(cUSDToken.allowance(msg.sender, address(this)) >= totalPrice, "Insufficient allowance");



    	product.quantity -= _quantity;
    	if (product.quantity == 0) {
        	product.sold = true;
    	}

    	cUSDToken.transferFrom(msg.sender, product.seller, totalPrice);
    	emit ProductSold(_id, msg.sender, _quantity);
	}

	function updateProductPrice(uint256 _id, uint256 _newPrice) external onlyAdmin {
    	require(_id <= totalProducts, "Invalid product ID");
    	Product storage product = products[_id];
    	require(!product.sold, "Cannot update price for sold product");

    	product.price = _newPrice;
	}
}