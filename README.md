# cuteghost_cli
 
一个前端自动化打包编译开发框架，基于grafana Text插件为运行宿主

## 特点

* 打包体积小
* 支持整个项目自动二次打包成一个文本文件，复制内容到grafana插件面板即可运行为正常Web站点

## 环境
* grafana需配置panels disable_sanitize_html=true
## 安装

```
cd ./cutehost_cli
npm i -g cnpm
cnpm i
```
## 目录结构
```
cuteghost_cli
├─dist       //打包输出目录
├─node_modules
└─src
    ├─css
    ├─fonts
    ├─img
    ├─js
    ├─libs
    └─template   
├─grafana.config.js
├─package.json
├─package-lock.json
├─postcss.config.js
└─webpack.config.js
```

## 开发模式
```
npm run dev
```

## 普通打包
```
npm run build
```

## 针对grafana平台打包
```
npm run grafana-build
```

## 导入grafana Text plugin
```
cd ./dist
nano grafa-encode.html  //拷贝内容至grafana
```
