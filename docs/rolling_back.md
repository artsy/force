## How to Rollback (on Kubernetes, deployed w/ Hokusai)

So, you're reading this doc, in which case either nothing is on fire and you're simply educating yourself (yay!), or, there's a problem and you need to rollback Force. Take a deep breath, and read on.

1. Run `hokusai registry images`. You'll see output like the below.

![list of images](images/hokusai_images.png "Hokusai Images")

2. Locate the name of a tag you want to deploy. In this case, since we're rolling back, it'll be the previous tag of the form `production-YYYY-mm-dd..`

![specific image](images/single_image.png "Last Prod Image")

3. Locate the Circle CI deploy process that corresponded to the deploy you are rolling back to. You may need to scroll back in the build history until you find it. One such example is: https://circleci.com/workflow-run/9fec809a-d096-4fc0-88b7-82419ada519d

4. When that completes, run the following command to deploy the desired image that you've located above. `hokusai production deploy production--2018-11-21--20-05-37`
