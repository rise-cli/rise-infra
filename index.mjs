#! /usr/bin/env node
import * as cli from 'rise-cli-foundation'
import { deployInfra } from 'rise-deployinfra'
import * as filesystem from 'rise-filesystem-foundation'
import process from 'node:process'

cli.addCommand({
    command: 'deploy',
    description: 'Deploy functions',
    flags: [
        {
            flag: '--stage',
            default: 'dev'
        },
        {
            flag: '--region',
            default: 'us-east-1'
        }
    ],
    action: async (flags) => {
        console.time('✅ Deployed Successfully \x1b[2mDeploy Time')
        cli.hideCursor()
        const config = await filesystem.getJsFile({
            path: '/rise.mjs',
            projectRoot: process.cwd()
        })
        const template = await filesystem.getTextContent({
            path: '/template.yml',
            projectRoot: process.cwd()
        })

        const result = await deployInfra({
            name: config.name,
            stage: flags.stage,
            region: flags.region,
            template: template,
            outputs: []
        })

        if (result.status === 'error') {
            throw new Error(result.message)
        }

        cli.clear()
        console.timeEnd('✅ Deployed Successfully \x1b[2mDeploy Time')
        cli.showCursor()
    }
})

cli.addCommand({
    command: 'generate',
    description: 'Generate starter',
    flags: [
        {
            flag: '--type',
            default: 'simple'
        }
    ],
    action: async (flags) => {
        filesystem.writeFile({
            path: '/rise.mjs',
            content: `export default {
    type: 'infra',
    name: 'exmapletemplate'
}
`,
            projectRoot: process.cwd()
        })
        filesystem.writeFile({
            path: '/template.yml',
            content: `Resources:
    ExampleTable:
        Type: AWS::DynamoDB::Table
        Properties:
            TableName: ExampleTable
            AttributeDefinitions:
                - AttributeName: PK
                  AttributeType: S
                - AttributeName: SK
                  AttributeType: S
            KeySchema:
                - AttributeName: PK
                  KeyType: HASH
                - AttributeName: SK
                  KeyType: RANGE
            BillingMode: PAY_PER_REQUEST

`,
            projectRoot: process.cwd()
        })
        cli.clear()
        console.log('✅ Project successfully generated')
    }
})

cli.addCommand({
    command: 'remove',
    description: 'Remove functions',
    flags: [
        {
            flag: '--stage',
            default: 'dev'
        },
        {
            flag: '--region',
            default: 'us-east-1'
        }
    ],
    action: async (flags) => {
        console.log('in development...')
    }
})

cli.runProgram()
