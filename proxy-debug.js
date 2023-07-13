// proxy-debug.js

const onRequest = (method, url) => {
  console.log('Proxy Request:', method, url);
};

const onResponse = (status) => {
  console.log('Proxy Response:', status);
};

// 导出调试函数供代理配置文件调用
module.exports = {
  onRequest,
  onResponse,
};
