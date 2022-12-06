// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lending {
    struct Entry {
        uint256 amount;
        uint256 timeStamp;
    }

    address owner;

    mapping(address => Entry[]) lenders;
    mapping(address => Entry[]) borrowers;

    uint256 constant lend_interest_rate = 60;
    uint256 constant borrow_interest_rate = 85;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        require(msg.sender == owner);
    }

    fallback() external payable {}

    function computeLenderBalance(address lender, uint256 index, uint256 timestamp)
        internal
        view
        returns (uint256)
    {
        Entry memory entry = lenders[lender][index];
        uint256 amount = entry.amount;
        uint256 time_sec = entry.timeStamp;

        // Return amount to be withdrawn P + I
        return
            amount +
            (((amount * (timestamp - time_sec)) / 1000 / 3600 / 24 / 30) *
                lend_interest_rate) /
            10000;
    }

    function getLenderEntries() public view returns (uint256[] memory) {
        uint256[] memory arr = new uint256[](lenders[msg.sender].length);

        for (uint256 i = 0; i < lenders[msg.sender].length; i++)
            arr[i] = lenders[msg.sender][i].amount;

        return arr;
    }

    function getLenderBalance(uint256 index, uint256 timestamp) public view returns (uint256) {
        // Return amount to be withdrawn P + I
        return computeLenderBalance(msg.sender, index, timestamp);
    }

    function lend(uint256 timestamp) public payable {
        lenders[msg.sender].push(Entry(msg.value, timestamp));
    }

    function withdraw(uint256 index, uint256 timestamp) public payable {
        require(index <= lenders[msg.sender].length);
        uint256 amount = computeLenderBalance(msg.sender, index, timestamp);

        for(uint i = index; i < lenders[msg.sender].length - 1; i++)
            lenders[msg.sender][i] = lenders[msg.sender][i + 1];
        // TODO: Properly delete array element

        lenders[msg.sender].pop();
        payable(msg.sender).transfer(amount);
    }

    function computeBorrowerBalance(address borrower, uint256 index, uint256 timestamp)
        internal
        view
        returns (uint256)
    {
        Entry memory entry = borrowers[borrower][index];
        uint256 amount = entry.amount;
        uint256 time_sec = entry.timeStamp;

        // Return amount to be paid back P + I
        return
            amount +
            (((amount * (timestamp - time_sec)) / 1000 / 3600 / 24 / 30) *
                borrow_interest_rate) /
            10000;
    }

    function getBorrowerEntries() public view returns (uint256[] memory) {
        uint256[] memory arr = new uint256[](borrowers[msg.sender].length);

        for (uint256 i = 0; i < borrowers[msg.sender].length; i++)
            arr[i] = borrowers[msg.sender][i].amount;

        return arr;
    }

    function getBorrowerBalance(uint256 index, uint256 timestamp) public view returns (uint256) {
        // Return amount to be paid back P + I
        return computeBorrowerBalance(msg.sender, index, timestamp);
    }

    function borrow(uint256 amount, uint256 timestamp) public payable {
        require(amount <= address(this).balance);
        borrowers[msg.sender].push(Entry(amount, timestamp));
        payable(msg.sender).transfer(amount);
    }

    function payback(uint256 index, uint256 timestamp) public payable {
        require(index <= lenders[msg.sender].length);
        uint256 amount = computeBorrowerBalance(msg.sender, index, timestamp);
        require(msg.value > amount);

        // TODO: Properly delete array element
        for(uint i = index; i < borrowers[msg.sender].length - 1; i++)
            borrowers[msg.sender][i] = borrowers[msg.sender][i + 1];

        borrowers[msg.sender].pop();
        payable(msg.sender).transfer(msg.value - amount);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
