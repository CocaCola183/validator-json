var version = parseFloat(process.env.npm_config_node_version);
if(version < 4.0) {
	process.env.npm_package_version = '1.0.4';
}
console.log('package version:', process.env.npm_package_version);