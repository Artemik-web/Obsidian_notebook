# Axios 接口对接教程

## 1. 什么是 Axios？

Axios 是一个基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js。它提供了以下特点：
- 从浏览器发送 XMLHttpRequests
- 从 Node.js 发送 http 请求
- 支持 Promise API
- 拦截请求和响应
- 自动转换 JSON 数据
- 取消请求
- 自动转换请求和响应数据

## 2. 安装与引入

### 安装
```bash
# 使用 npm
npm install axios

# 使用 yarn
yarn add axios

# 使用 CDN
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

### 引入
```javascript
// 浏览器中
import axios from 'axios';

// Node.js 中
const axios = require('axios');

// 或直接在浏览器中使用全局变量
window.axios.get('/api');
```

## 3. 基础用法

### 发送 GET 请求
```javascript
// 基础用法
axios.get('/api/users')
  .then(response => {
    console.log('数据:', response.data);
  })
  .catch(error => {
    console.error('错误:', error);
  });

// 带参数的 GET 请求
axios.get('/api/users', {
  params: {
    id: 123,
    name: '张三'
  }
})
  .then(response => {
    console.log('数据:', response.data);
  });

// 使用 async/await
async function getUser() {
  try {
    const response = await axios.get('/api/users', {
      params: { id: 123 }
    });
    console.log('数据:', response.data);
  } catch (error) {
    console.error('错误:', error);
  }
}
```

### 发送 POST 请求
```javascript
// 发送 JSON 数据
axios.post('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com'
})
  .then(response => {
    console.log('创建成功:', response.data);
  })
  .catch(error => {
    console.error('错误:', error);
  });

// 发送表单数据
const formData = new FormData();
formData.append('name', '张三');
formData.append('email', 'zhangsan@example.com');

axios.post('/api/users', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
  .then(response => {
    console.log('创建成功:', response.data);
  });
```

### 其他 HTTP 方法
```javascript
// PUT 请求
axios.put('/api/users/123', {
  name: '李四'
});

// DELETE 请求
axios.delete('/api/users/123');

// PATCH 请求
axios.patch('/api/users/123', {
  email: 'newemail@example.com'
});
```

## 4. 响应结构

```javascript
axios.get('/api/users')
  .then(response => {
    console.log('响应状态码:', response.status); // 200
    console.log('响应状态文本:', response.statusText); // 'OK'
    console.log('响应数据:', response.data); // 服务器返回的数据
    console.log('响应头:', response.headers); // 响应头信息
    console.log('请求配置:', response.config); // 请求配置
  });
```

## 5. 请求配置

```javascript
// 全局配置
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = 'Bearer token';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 实例配置
const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  }
});

// 单个请求配置
axios.get('/api/users', {
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json' // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
});
```

## 6. 拦截器

### 请求拦截器
```javascript
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    console.log('请求即将发送');
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
```

### 响应拦截器
```javascript
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    console.log('响应接收');
    return response;
  },
  error => {
    // 对响应错误做点什么
    if (error.response) {
      // 服务器返回了错误状态码
      console.error('错误状态码:', error.response.status);
      console.error('错误数据:', error.response.data);
      
      if (error.response.status === 401) {
        // 未授权，重定向到登录页
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

### 移除拦截器
```javascript
const myInterceptor = axios.interceptors.request.use(config => {
  return config;
});

axios.interceptors.request.eject(myInterceptor);
```

## 7. 错误处理

### 基础错误处理
```javascript
axios.get('/api/users')
  .catch(error => {
    if (error.response) {
      // 服务器返回了错误状态码
      console.error('状态码:', error.response.status);
      console.error('错误信息:', error.response.data);
    } else if (error.request) {
      // 请求已发出但未收到响应
      console.error('请求超时或网络错误');
    } else {
      // 请求配置错误
      console.error('请求配置错误:', error.message);
    }
  });
```

### 取消请求
```javascript
// 使用 cancel token
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/api/users', {
  cancelToken: source.token
})
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('请求被取消:', error.message);
    }
  });

// 取消请求（message 参数是可选的）
source.cancel('用户取消了请求');
```

## 8. 并发请求

```javascript
// 同时发送多个请求
axios.all([
  axios.get('/api/users'),
  axios.get('/api/posts')
])
  .then(axios.spread((usersResponse, postsResponse) => {
    console.log('用户数据:', usersResponse.data);
    console.log('文章数据:', postsResponse.data);
  }));

// 使用 async/await
async function fetchData() {
  const [usersResponse, postsResponse] = await axios.all([
    axios.get('/api/users'),
    axios.get('/api/posts')
  ]);
  
  console.log('用户:', usersResponse.data);
  console.log('文章:', postsResponse.data);
}
```

## 9. 在 Vue 中使用

### 在 Vue 2 中
```javascript
// main.js
import Vue from 'vue';
import axios from 'axios';

// 配置
axios.defaults.baseURL = 'https://api.example.com';

// 添加响应拦截器
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // 未授权处理
    }
    return Promise.reject(error);
  }
);

// 挂载到 Vue 原型上
Vue.prototype.$axios = axios;

// 在组件中使用
export default {
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.get('/api/users');
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
```

### 在 Vue 3 中
```javascript
// main.js
import { createApp } from 'vue';
import axios from 'axios';

const app = createApp(App);

// 配置
axios.defaults.baseURL = 'https://api.example.com';

// 挂载到 app.config.globalProperties
app.config.globalProperties.$axios = axios;

// 在组件中使用
<script setup>
import { getCurrentInstance } from 'vue';

const appContext = getCurrentInstance();
const axios = appContext?.appContext.config.globalProperties.$axios;

const fetchData = async () => {
  try {
    const response = await axios.get('/api/users');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
</script>
```

## 10. 在 React 中使用

### 基础用法
```javascript
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 渲染逻辑
}
```

## 11. 最佳实践

### 1. 创建实例
```javascript
// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 2. 封装 API 方法
```javascript
// api/user.js
import api from './api';

export const userAPI = {
  getUsers: (params = {}) => 
    api.get('/users', { params }),
  
  getUser: (id) => 
    api.get(`/users/${id}`),
  
  createUser: (data) => 
    api.post('/users', data),
  
  updateUser: (id, data) => 
    api.put(`/users/${id}`, data),
  
  deleteUser: (id) => 
    api.delete(`/users/${id}`)
};

// 使用
import { userAPI } from '@/api/user';

const response = await userAPI.getUsers({ page: 1, limit: 10 });
```

### 3. 错误处理函数
```javascript
// utils/errorHandler.js
export const handleAPIError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return '请求参数错误';
      case 401:
        return '未授权，请重新登录';
      case 403:
        return '禁止访问';
      case 404:
        return '资源不存在';
      case 500:
        return '服务器内部错误';
      default:
        return '请求失败';
    }
  } else if (error.request) {
    return '网络错误，请检查网络连接';
  } else {
    return '请求配置错误';
  }
};
```

## 12. 常见问题

### Q1: 跨域问题
```javascript
// 使用代理（开发环境）
// vue.config.js (Vue)
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
};

// 使用 CORS（服务器配置）
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
```

### Q2: 请求超时
```javascript
axios.get('/api/users', {
  timeout: 10000 // 10秒超时
})
  .catch(error => {
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时');
    }
  });
```

### Q3: 重复请求
```javascript
// 使用 debounce 或 throttle 限制请求频率
const debouncedGetData = debounce(async () => {
  const response = await axios.get('/api/users');
}, 300);
```

---

## 相关笔记

- [[04-异步与AJAX]]
- [[Vue/04-路由与Pinia]]
- [[React/04-React路由与状态管理]]
