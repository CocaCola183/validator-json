var node_version = parseFloat(process.env.npm_config_node_version);
var validator_version = parseFloat(process.env.npm_package_version);

if(node_version < 4.0 && validator_version > 2.0) {
	console.log('I\'m author kivi, please use validator_version@1.0.4 beacuse your node version is below 0.12');
}

