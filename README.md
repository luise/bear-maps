# BearMaps on Quilt
This tutorial will walk you through how to run BearMaps with [Quilt](http://quilt.io/). By the end, you will have your BearMaps application hosted in the [Amazon AWS cloud](https://aws.amazon.com/), where it is accessible to you and the rest of the world.

The instructions assume that Windows users use GitBash. If you don't, just make sure to change the directory paths accordingly.

## AWS Account
Follow the below instructions to set up your AWS account. You'll be using AWS's **free** tier, so it won't cost you a penny. AWS is super widely used, so chances are that you either already have an account or will need one in your future CS career. If you already have an account, just skip step 1.

1.  Sign up for the AWS Free Tier on the [AWS website](https://aws.amazon.com/s/dm/optimization/server-side-test/free-tier/free_np/). They will ask for a debit/credit card, but don't worry, they won't charge you anything for just running BearMaps.
2. Sign in to the [AWS console](https://aws.amazon.com/console/).
3. In the top right corner, click your name and then `My Security Credentials`. In the pop up window, click `Continue to Security Credentials`.
4. Click `Access Keys (Access Key ID and Secret Access Key)` and then `Create New Access Key` to download your AWS key and key ID.
5. Put the key and ID in a file called `~/.aws/credentials`. This credentials file must be formatted *exactly* like this:

```bash
[default]
aws_access_key_id=<YOUR_AWS_KEY_ID>
aws_secret_access_key=<YOUR_AWS_KEY>
```

Your AWS account is now ready!


## Installing Quilt

Go to the [releases page on Quilt’s github](https://github.com/quilt/quilt/releases).

### Windows
1. Click on `quilt_windows.zip` to install Quilt.
2. In your terminal, navigate to the location of `quilt_windows.zip` (this will be `~\Downloads` by default, but you are free to move it), and unzip the file: `unzip quilt_windows.zip`.
3. From the same directory, run `./quilt`. If Quilt is succesfully installed, you should see output starting with `Usage: quilt ...`.

### Mac

1. Click on `quilt_mac.tgz` to download Quilt.
2. In the terminal, move the Quilt binary by running `mv ~/Downloads/quilt /usr/local/bin/quilt`.
3. Run `quilt` from the terminal. Quilt is succesfully installed if the output starts with `Usage: quilt ...`.

## Run BearMaps

The rest of the instructions are practically the same for Windows and Mac. The only difference is that if you're on Windows, you need to use `./quilt` instead of `quilt` and make sure you're in the directory containing `quilt.exe`.

1. We made a [Quilt specification](https://github.com/quilt/bear-maps) for you to deploy BearMaps. You can get it by running `quilt get github.com/quilt/bear-maps`. The code is now in `~/.quilt/github.com/quilt/bear-maps`.
2. Open the file `~/.quilt/github.com/quilt/bear-maps/main.js`. Change the `PROJ_PATH` variable to be the path to your BearMaps code (the directory that contains the `pom.xml` file). Use an absolute path like `/Users/Josh/cs61b/abc/proj3`.
3. Open one more terminal window. In one of them, run `quilt daemon` (it is supposed to keep running), and in the other terminal, run `quilt run github.com/quilt/bear-maps/main.js`.
	* If you're using GitBash, you can open a second terminal by holding down the `shift` key and clicking the GitBash icon in the task bar.

## Accessing Your BearMaps
Quilt is now setting up your virtual machines (VMs) and container (lightweight VM) in the Amazon AWS cloud.
You can use the command `quilt ps` to see the status of your VMs and container. When everything is ready (after a few minutes), you should see a `running` container in the bottom row, similar to this:

```bash
$ quilt ps
MACHINE         ROLE      PROVIDER    REGION       SIZE        PUBLIC IP         STATUS
e5b1839d2bea    Master    Amazon      us-west-1    t2.micro    54.67.64.87       connected
e2401c348c78    Worker    Amazon      us-west-1    t2.micro    54.183.134.153    connected

CONTAINER       MACHINE         COMMAND                              LABELS       STATUS     CREATED           PUBLIC IP
3482fd5f7197    e2401c348c78    luise/bear-maps-base /bin/sh -...    bear-maps    running    53 seconds ago    54.183.134.153:4567
```

Now you can access your BearMaps application! Simply use your browser to go to the public IP address and port shown in the `quilt ps` output - in this case `54.183.134.153:4567`. Now that your BearMaps is running in the cloud, your friends, parents, and pets can also access it by using the same IP address!

## Stopping Quilt
When you're done enjoying your great work, run `quilt stop` to shut down the VMs. In the terminal that's running `quilt daemon`, wait for it to say `Successfully stopped machines` and then exit with Ctrl+c.