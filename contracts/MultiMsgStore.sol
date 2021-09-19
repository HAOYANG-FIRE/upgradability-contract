pragma solidity ^0.4.18;

// 
contract MultiMsgStore {
    
    mapping(bytes => string) message;
    
    event returnMsg(bytes key);
    
    function store(string memory mes) public {
        
        bytes32 tmp = keccak256(bytes(mes));
        
        bytes memory key = new bytes(32);
        
        for (uint256 i; i < 32; i++) {
            key[i] = tmp[i];
        }
        
        message[key] = mes;
        
        returnMsg(key);
    }
    
    function retrive(bytes memory key) public view returns (string memory){
        
        return message[key];
        
    }
}

