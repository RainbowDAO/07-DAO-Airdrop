const AirDropFactoryOrchestrator = artifacts.require("AirDropFactoryOrchestrator");

module.exports = function (deployer) {
    let airDropFactoryOrchestrator;
    deployer.deploy(AirDropFactoryOrchestrator);
    deployer.then(function() {
	   
	  	return AirDropFactoryOrchestrator.deployed();
	}).then(function(instance) {
		airDropFactoryOrchestrator = instance;
		return airDropFactoryOrchestrator.init();
	})
};