const fs = require('fs')

function getFile(path) {
    const data = fs.readFileSync(path, 'utf8')
    return data
}
module.exports.deploy = async (cli, aws, flags) => {
    try {
        const config = require(process.cwd() + '/rise.js')
        const file = getFile(process.cwd() + '/template.yml')
        console.log(file)

        await aws.cloudformation.deployStack({
            name: config.name + stage,
            template: file,
            region: flags.region
        })

        cli.terminal.clear()
        cli.terminal.printInfoMessage('Deploying Cloudformation Template...')

        await aws.cloudformation.getDeployStatus({
            config: {
                stackName: config.name + stage,
                minRetryInterval: 5000,
                maxRetryInterval: 10000,
                backoffRate: 1.1,
                maxRetries: 200,
                onCheck: (resources) => {
                    cli.terminal.clear()
                    resources.forEach((item) => {
                        cli.terminal.printInfoMessage(
                            `${item.id}: ${item.status}`
                        )
                    })
                    console.log('resources: ', resources)
                }
            }
        })
        cli.terminal.clear()
        cli.terminal.printSuccessMessage('Deployment Complete')
    } catch (e) {
        cli.terminal.clear()
        cli.terminal.printErrorMessage('Rise Functions Error')
        cli.terminal.printInfoMessage(e.message)
    }
}
