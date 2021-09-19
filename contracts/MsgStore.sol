pragma solidity ^0.4.18;

// 消息存储合约 V1.0，只能存储单个信息
contract MsgStore {
    
    string message;
    
    event msgEvent(string returnMsg);
    
    function store(string memory mes) public {
        
        message = mes;
        
        msgEvent("Message has been stored");
        
    }
    
    function retrive() public view returns (string memory){
        
        return message;
        
    }
    
}

