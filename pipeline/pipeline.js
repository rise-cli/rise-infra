module.exports = {
    name: 'rise-infra-pipeline',
    stages: [
        {
            name: 'Source',
            actions: [
                {
                    type: 'SOURCE',
                    name: 'GithubRepo',
                    repo: 'rise-infra',
                    owner: 'rise-cli'
                }
            ]
        },
        {
            name: 'Prod',
            actions: [
                {
                    type: 'BUILD',
                    name: 'DeployDocumentation',
                    script: '/docs.yml'
                },
                {
                    type: 'APPROVAL',
                    name: 'ReleaseNewVersion'
                },
                {
                    type: 'BUILD',
                    name: 'PublishToNpm',
                    script: '/publish.yml',
                    env: {
                        NPM_TOKEN: '@secret.NPM_KEY'
                    }
                }
            ]
        }
    ]
}
