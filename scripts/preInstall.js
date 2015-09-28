var version = parseFloat(process.env.npm_config_node_version);
if(version < 4.0) {
	process.env.npm_config_versions = '1.0.4';
}