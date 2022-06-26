pragma solidity ^0.4.17;



contract CampaignFactory{
    address[] public deployedCampaign;

    function createCampaign(uint minimum) public{
        address newCampaign=new Campaign(minimum,msg.sender);
        deployedCampaign.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaign;
    }
}

contract Campaign{

    struct Request{
        string description;
        uint value;
        address recipent;
        bool complete;
        mapping(address=>bool) approvals;
        uint approvalCount;
    }
    address public manager;
    uint public minimumContribution;
    // address[] public approvers;
    Request[] public requests;
    mapping(address=>bool) public approvers;

    uint public approversCount;

    // uint public balance=contract.balance;

    function Campaign(uint minimum,address creator) public{
         manager=creator;  //msg is global variable
         minimumContribution=minimum;
    }

    function contribute() public payable{
        require(msg.value>=minimumContribution);
        // approvers.push(msg.sender);
        approvers[msg.sender]=true;
        approversCount++;
    }

    function createRequest(string description,uint value,address recipent) onlyManagerCanCall public {
        Request memory newRequest=Request({
            description:description,
            value:value,
            recipent:recipent,
            complete:false,
            approvalCount:0
        });

        requests.push(newRequest);

    }


    function approveRequest(uint index) public {

        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender]=true;
        request.approvalCount++; 

    }


    function finalizeRequest(uint index) public onlyManagerCanCall{
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount>(approversCount/2));
        request.complete=true;
        request.recipent.transfer(request.value);

    }

    modifier onlyManagerCanCall(){
        require(msg.sender==manager);
        _;
    }

}