var BearMaps = require("github.com/quilt/bear-maps");

// PROJ_PATH is the path to your BearMaps code. It should be the absolute path
// to the directory that contains the file `pom.xml`.
// IMPORTANT: This *must* be an absolute path (starting with /).
// I.e. it will *not* work if you use a tilde like ~/cs61b/abc/proj3.
// var PROJ_PATH = "/Users/Luise/cs61b/abc/proj3";
var PROJ_PATH = "/";

var deployment = createDeployment();
var baseMachine = new Machine({
	provider: "Amazon",
	size: "t2.micro",
	// If you want to ssh into the VMs and container, uncomment this line
	// and replace `luise` with your GitHub username before running the spec.
	// sshKeys: githubKeys("luise"),
});
deployment.deploy(baseMachine.asMaster());
deployment.deploy(baseMachine.asWorker());

var bearMaps = BearMaps(PROJ_PATH);
deployment.deploy(bearMaps);
