var BearMaps = require("./bear-maps");

// The path to your BearMaps code. This should be the absolute path to the
// directory that contains the file `pom.xml`.
var PROJ_PATH = "/Users/Luise/cs61b/abc/proj3";

var deployment = createDeployment();
var baseMachine = new Machine({
	provider: "Amazon",
	size: "t2.micro",
	preemtible: "true",
	// sshKeys: githubKeys("luise"),
});
deployment.deploy(baseMachine.asMaster());
deployment.deploy(baseMachine.asWorker());

var bearMaps = BearMaps(PROJ_PATH);
deployment.deploy(bearMaps);
