# Wiki

## 代码规范

### React组件编写规范

- 内部属性／函数顺序：
  1. `static` 开头的类属性，如 `defaultProps`，`propTypes`。
  2. 构造函数，`constructor`。
  3. `getter`/`setter` 方法。
  4. 组件的生命周期。
  5. `_` 开头的私有方法。
  6. 事件监听方法，`handle*`。
  7. `render*` 开头的方法，有时候 `render()` 方法里面的内容会分开到不同函数里面进行，这些函数都以 `render*` 开头。
  8. `render()` 方法

- 组件的私有方法都用 `_` 开头，所有事件监听的方法都用 `handle` 开头。把事件监听方法传给组件的时候，属性名用`on`开头。

- 一个组件文件在单独的文件夹下，同级目录下还可以有`.css/.less`，`.test.js`，和一些组件必要的资源文件，如图片等。

### 文件／文件夹命名规范

- React组件文件名为大驼峰。如 `AppComponent.jsx`
- 文件夹命名法为短横线命名法。如 `app-component`
- 测试文件添加后缀 `.test`。如 `AppComponent.test.js`
