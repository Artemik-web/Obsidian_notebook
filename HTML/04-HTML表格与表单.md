# HTML 表格与表单

## 1. 表格 table

表格用于展示二维数据（行和列）。

### 1.1 基本结构

```html
<table>
  <thead> <!-- 表头 -->
    <tr>  <!-- 行 -->
      <th>姓名</th> <!-- 表头单元格 -->
      <th>年龄</th>
      <th>城市</th>
    </tr>
  </thead>
  <tbody> <!-- 表格主体 -->
    <tr>
      <td>张三</td> <!-- 数据单元格 -->
      <td>25</td>
      <td>北京</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>30</td>
      <td>上海</td>
    </tr>
  </tbody>
  <tfoot> <!-- 表尾 -->
    <tr>
      <td colspan="3">合计：共 2 人</td>
    </tr>
  </tfoot>
</table>
```

### 1.2 主要标签

| 标签 | 说明 |
|------|------|
| `<table>` | 表格容器 |
| `<tr>` | table row - 行 |
| `<th>` | table header - 表头单元格 |
| `<td>` | table data - 数据单元格 |
| `<thead>` | 表头区域 |
| `<tbody>` | 主体区域 |
| `<tfoot>` | 表尾区域 |
| `<caption>` | 表格标题 |
| `<colgroup>` | 列分组 |
| `<col>` | 列定义 |

### 1.3 表格标题

```html
<table>
  <caption>用户信息表</caption>
  <thead>
    ...
  </thead>
</table>
```

### 1.4 合并单元格

#### 跨行合并 `rowspan`
```html
<tr>
  <td rowspan="2">张三</td> <!-- 跨越 2 行 -->
  <td>语文</td>
  <td>90</td>
</tr>
<tr>
  <td>数学</td> <!-- 这里不需要第一列了 -->
  <td>85</td>
</tr>
```

#### 跨列合并 `colspan`
```html
<tr>
  <td colspan="3">合计：共 3 门课程</td>
</tr>
```

**规则：** 在起始单元格写属性，被合并的单元格要删掉。

### 1.5 列分组

```html
<table>
  <colgroup>
    <col style="background: #eee;">
    <col span="2" style="width: 100px;">
    <col style="background: #eee;">
  </colgroup>
  <tr>
    <th>姓名</th>
    <th>语文</th>
    <th>数学</th>
    <th>总分</th>
  </tr>
</table>
```

### 1.6 表格边框与间距

```html
<!-- HTML 属性方式（已废弃，用 CSS） -->
<table border="1" cellpadding="10" cellspacing="0">

<!-- CSS 方式（推荐） -->
<style>
table {
  border-collapse: collapse; /* 合并边框 */
  /* border-collapse: separate; 分离边框 */
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>
```

### 1.7 表格最佳实践

✅ **适合用表格：**
- 展示二维表格数据（如报表、数据列表）
- 邮件排版（某些邮件客户端只认表格）

❌ **不适合用表格：**
- 页面布局（用 CSS Flex/Grid 代替）
- 非表格数据展示

## 2. 表单 form

表单用于收集用户输入，提交到服务器。

### 2.1 基本结构

```html
<form action="https://example.com/submit" method="POST">
  <!-- 各种表单控件 -->
  <input type="text" name="username">
  <button type="submit">提交</button>
</form>
```

### 2.2 form 属性

| 属性 | 说明 |
|------|------|
| `action` | 提交的 URL 地址 |
| `method` | HTTP 方法：`GET` 或 `POST` |
| `enctype` | 编码类型：`application/x-www-form-urlencoded`（默认）`multipart/form-data`（文件上传）`text/plain` |
| `target` | 打开方式：`_self` `_blank` |
| `novalidate` | 不做 HTML5 原生验证 |
| `autocomplete` | 自动完成：`on` `off` |

**GET vs POST：**

| GET | POST |
|-----|------|
| 参数在 URL 中 | 参数在请求体中 |
| 长度有限制 | 无长度限制 |
| 可书签收藏、可分享 | 不能收藏分享 |
| 适合搜索、分页 | 适合表单提交、文件上传 |

## 3. input 输入框

input 是最常用的表单控件，type 决定类型。

### 3.1 text - 单行文本

```html
<input
  type="text"
  name="username"
  id="username"
  placeholder="请输入用户名"
  required
  minlength="3"
  maxlength="20"
  autocomplete="off"
  autofocus
>
```

### 3.2 password - 密码

```html
<input
  type="password"
  name="password"
  placeholder="请输入密码"
  required
  minlength="8"
>
```

### 3.3 radio - 单选按钮

同一组的 `name` 必须相同：

```html
<p>性别：</p>
<label>
  <input type="radio" name="gender" value="male" checked>
  男
</label>
<label>
  <input type="radio" name="gender" value="female">
  女
</label>
```

`checked` - 默认选中

### 3.4 checkbox - 复选框

可以多选，name 可以用数组形式：

```html
<p>爱好：</p>
<label>
  <input type="checkbox" name="hobbies[]" value="reading" checked>
  阅读
</label>
<label>
  <input type="checkbox" name="hobbies[]" value="sports">
  运动
</label>
<label>
  <input type="checkbox" name="hobbies[]" value="music">
  音乐
</label>
```

### 3.5 其他常用类型

```html
<!-- 隐藏域，用户看不见但会提交 -->
<input type="hidden" name="csrf_token" value="abc123">

<!-- 文件上传 -->
<input
  type="file"
  name="avatar"
  accept="image/*" <!-- 只接受图片 -->
  multiple <!-- 允许多选 -->
>

<!-- 多选文件：accept 示例 -->
<input type="file" accept=".jpg,.png,.gif,.pdf">

<!-- 邮箱 -->
<input type="email" name="email" placeholder="example@domain.com">

<!-- 手机号 -->
<input type="tel" name="phone">

<!-- URL -->
<input type="url" name="website" placeholder="https://">

<!-- 数字 -->
<input
  type="number"
  name="age"
  min="0"
  max="150"
  step="1"
  value="18"
>

<!-- 滑块 -->
<input
  type="range"
  name="volume"
  min="0"
  max="100"
  step="5"
  value="50"
>

<!-- 日期 -->
<input type="date" name="birthday">

<!-- 时间 -->
<input type="time" name="start_time">

<!-- 日期时间（本地） -->
<input type="datetime-local" name="event_time">

<!-- 月份 -->
<input type="month" name="month">

<!-- 星期 -->
<input type="week" name="week">

<!-- 颜色选择器 -->
<input type="color" name="bg_color" value="#ff0000">

<!-- 搜索框 -->
<input type="search" name="query" placeholder="搜索...">

<!-- 重置按钮 -->
<input type="reset" value="重置表单">

<!-- 普通按钮 -->
<input type="button" value="点击我">
```

## 4. label 标签

label 用于描述表单控件，点击 label 时对应的控件会获得焦点。

### 两种用法：

```html
<!-- 方法一：嵌套 -->
<label>
  用户名：
  <input type="text" name="username">
</label>

<!-- 方法二：for + id（推荐） -->
<label for="username">用户名：</label>
<input type="text" id="username" name="username">
```

**始终使用 label！** 提高可访问性，用户体验更好。

## 5. select 下拉选择框

```html
<label for="city">城市：</label>
<select id="city" name="city">
  <option value="">请选择</option>
  <option value="beijing" selected>北京</option>
  <option value="shanghai">上海</option>
  <option value="guangzhou">广州</option>
  <option value="shenzhen">深圳</option>
</select>

<!-- 分组 -->
<select name="city">
  <optgroup label="华北">
    <option value="beijing">北京</option>
    <option value="tianjin">天津</option>
  </optgroup>
  <optgroup label="华东">
    <option value="shanghai">上海</option>
    <option value="nanjing">南京</option>
  </optgroup>
</select>

<!-- 多选 -->
<select name="fruits[]" multiple size="5">
  <option value="apple">苹果</option>
  <option value="banana">香蕉</option>
  <option value="orange">橙子</option>
</select>
```

`selected` - 默认选中
`multiple` - 允许多选，按住 Ctrl/Cmd 多选
`size` - 显示多少行

## 6. textarea 文本域

用于多行文本输入：

```html
<label for="description">简介：</label>
<textarea
  id="description"
  name="description"
  rows="4"     <!-- 显示行数 -->
  cols="50"    <!-- 显示列数 -->
  placeholder="请输入自我介绍..."
  maxlength="500"
></textarea>
```

**注意：** textarea 不是自闭合标签，内容写在标签之间。

**CSS 设置：**
```css
textarea {
  resize: vertical; /* 只允许垂直调整大小 */
  /* resize: none;  禁止调整 */
  /* resize: both;  允许横竖调整（默认） */
  width: 100%;
  box-sizing: border-box;
}
```

## 7. button 按钮

```html
<button type="submit">提交表单</button>
<button type="reset">重置表单</button>
<button type="button" onclick="doSomething()">普通按钮</button>

<!-- button 和 input 比较： -->
<input type="submit" value="提交"> <!-- 只能是文本 -->
<button type="submit">             <!-- 内容可以包含 HTML -->
  <strong>提交</strong> <span>🚀</span>
</button>
```

| type | 说明 |
|------|------|
| `submit` | 提交表单（默认） |
| `reset` | 重置表单到初始状态 |
| `button` | 普通按钮，需要 JS 绑定事件 |

**注意：** button 默认 type 是 `submit`，如果你只是普通按钮，记得写 `type="button"`。

## 8. HTML5 表单验证

### 8.1 原生验证属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `required` | 必填 | `<input required>` |
| `pattern` | 正则验证 | `pattern="[0-9]{6}"` |
| `min`/`max` | 最小/最大值 | `<input type="number" min="0" max="100">` |
| `minlength`/`maxlength` | 最小/最大长度 | `<input minlength="3" maxlength="20">` |

### 8.2 使用示例

```html
<form>
  <!-- 必填 + 长度验证 -->
  <input
    type="text"
    name="username"
    required
    minlength="3"
    maxlength="20"
    placeholder="用户名 3-20 位"
  >

  <!-- 正则：邮编 6 位数字 -->
  <input
    type="text"
    name="zipcode"
    pattern="[0-9]{6}"
    title="请输入 6 位数字邮编"
    placeholder="邮编"
  >

  <button type="submit">提交</button>
</form>
```

### 8.3 关闭验证

```html
<form novalidate>
  <!-- 这里所有原生验证都不生效，自己用 JS 验证 -->
</form>

<button type="submit" formnovalidate>
  保存草稿（不验证）
</button>
```

## 9. 其他表单元素

### 9.1 fieldset 和 legend - 分组

```html
<fieldset>
  <legend>个人信息</legend>

  <p>
    <label>姓名：<input type="text" name="name"></label>
  </p>
  <p>
    <label>年龄：<input type="number" name="age"></label>
  </p>
</fieldset>
```

### 9.2 datalist - 自动补候选项

```html
<input
  type="text"
  name="city"
  list="city-list"
  placeholder="输入或选择城市"
>

<datalist id="city-list">
  <option value="北京"></option>
  <option value="上海"></option>
  <option value="广州"></option>
  <option value="深圳"></option>
</datalist>
```

### 9.3 progress - 进度条

```html
<progress value="50" max="100">50%</progress>
```

### 9.4 meter - 计量器

```html
<p>磁盘使用率：</p>
<meter value="0.75" min="0" max="1" low="0.5" high="0.8" optimum="0.3">
  75%
</meter>
<!-- low 以下：绿色，low~high：黄色，high 以上：红色 -->
```

## 10. 表单属性总结

### 通用属性

| 属性 | 说明 |
|------|------|
| `name` | 控件名称，提交给服务器用 |
| `id` | 唯一标识，供 label for 使用 |
| `value` | 默认值 |
| `placeholder` | 提示文本 |
| `required` | 必填 |
| `disabled` | 禁用，不会提交 |
| `readonly` | 只读，会提交 |
| `autofocus` | 页面加载后自动聚焦 |
| `autocomplete` | 自动完成 `on`/`off` |

**disabled vs readonly：**

- `disabled` - 不能编辑，值不会提交给服务器
- `readonly` - 不能编辑，但值会提交给服务器

## 11. 表单最佳实践

### 11.1 结构

```html
<!-- ✅ 推荐：每个控件占一行，label 正确关联 -->
<p>
  <label for="username">用户名：</label><br>
  <input type="text" id="username" name="username" required>
</p>

<p>
  <label for="password">密码：</label><br>
  <input type="password" id="password" name="password" required>
</p>

<!-- ✅ 组内单选/复选对齐 -->
<fieldset>
  <legend>性别</legend>
  <label><input type="radio" name="gender" value="male"> 男</label>
  <label><input type="radio" name="gender" value="female"> 女</label>
</fieldset>
```

### 11.2 可访问性

- 始终使用 `label` 关联 `for` + `id`
- 分组用 `fieldset` + `legend`
- 必填项可以在 label 标注：`用户名 *`
- 错误信息要关联：`aria-describedby="error-message"`

```html
<label for="username">用户名 *</label>
<input
  type="text"
  id="username"
  name="username"
  aria-describedby="username-error"
  required
>
<div id="username-error" class="error">用户名不能为空</div>
```

### 11.3 CSS 提示

```css
/* 盒模型统一 */
input, textarea, select, button {
  box-sizing: border-box;
}

/* 基础样式统一 */
input[type="text"],
input[type="password"],
input[type="email"],
textarea,
select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

/* 焦点状态 */
input:focus,
textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}
```

## 12. 练习

```html
<!-- 练习：写一个注册表单 -->
<form action="/register" method="POST">
  <!-- 在这里写 -->
</form>
```

参考结构：
- 用户名：必填，3-20 位
- 邮箱：必填，邮箱格式
- 密码：必填，至少 8 位
- 确认密码：必填
- 性别：单选
- 爱好：多选
- 城市：下拉选择
- 简介：textarea
- 同意协议：复选框（必填）
- 提交按钮
