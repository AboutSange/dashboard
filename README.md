# Yunion Dashboard

[![Build Status](https://www.travis-ci.org/yunionio/dashboard.svg?branch=master)](https://www.travis-ci.org/yunionio/dashboard)

Yunion Dashboard is the web-based UI for [OneCloud](https://github.com/yunionio/onecloud)

#### [README in Chinese](./README-CN.md)

## Developer Guide

### Preparation

Make sure the following software is installed and added to the $PATH variable:

- Node.js 10.16+ ([installation with nvm](https://github.com/creationix/nvm#usage))
- Yarn 1.19.1+ ([documentation](https://classic.yarnpkg.com/en/docs/install))

or

Install yarn with npm:

```sh
npm install -g yarn
```

Fork the following repository, then clone dashboard main repository and install dependencies

- [dashboard](https://github.com/yunionio/dashboard)
- [dashboard-common](https://github.com/yunionio/dashboard-common)
- [dashboard-module-compute](https://github.com/yunionio/dashboard-module-compute)
- [dashboard-module-network](https://github.com/yunionio/dashboard-module-network)
- [dashboard-module-cloudenv](https://github.com/yunionio/dashboard-module-cloudenv)
- [dashboard-module-dashboard](https://github.com/yunionio/dashboard-module-dashboard)
- [dashboard-module-monitor](https://github.com/yunionio/dashboard-module-monitor)
- [dashboard-module-storage](https://github.com/yunionio/dashboard-module-storage)
- [dashboard-module-k8s](https://github.com/yunionio/dashboard-module-k8s)
- [dashboard-module-helm](https://github.com/yunionio/dashboard-module-helm)
- [dashboard-module-db](https://github.com/yunionio/dashboard-module-db)

```sh
git clone https://github.com/<owner>/dashboard.git
cd dashboard
yarn
yarn setup:dev
```

Enter the prefix of the repository address as prompted, such as: https://github.com/yunionio

Note: If you are in China Mainland, execute the following command before running the command above for faster installation.

```sh
yarn config set registry https://registry.npm.taobao.org
```

### Start Dashboard for development

If you want to configure the proxy, please create dev.server.config.js in the project root directory and export configuration

Please change the configuration according to your needs, the following is just an example

```javascript
// dev.server.config.js
module.exports = {
  open: process.platform === 'darwin',
  port: 8080,
  proxy: {
    '/api': {
      target: 'https://192.168.1.10',
      ws: true,
      changeOrigin: true,
      secure: false,
    },
  },
}
```

[More configuration](https://webpack.js.org/configuration/dev-server/)

```sh
yarn serve
```

Now, you can open http://localhost:8080 to view

### Build Dashboard for production

```sh
yarn build
```

## Other commands

### Switch all modules to the specified version

```sh
yarn checkout <branch>
```

### Update all modules

```sh
yarn sync <branch>
```

### Make docker image

```bash
REGISTRY=registry.cn-beijing.aliyuncs.com/yunionio TAG=your-tag ./scripts/docker-push.sh
```
