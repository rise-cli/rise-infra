# Rise Infra

[Github](https://github.com/rise-cli/rise-infra)

Rise Infra is a CLI that helps you deploy Cloudformation template.yml files. The CloudFormation CLI is already a pretty nice CLI solution. This CLI is mostly to give consistency to projects that are already using other rise frameworks.

## How to install

```js
npm i -g rise-infra
```

## How to deploy a project

`cd` into a project that has a template.yml file containing CloudFormation

```js
rise-infra deploy
```

## How to remove a project

`cd` into a project that has a template.yml file containing CloudFormation

```js
rise-infra remove
```

## What a project looks like

A project must have a `rise.mjs` file at the root of the project that looks like the following:

```js
export default {
    name: 'NameOfTemplate'
}
```

Rise Infra will also assume that the CloudFormation template is inside the root folder called `template.yml`
