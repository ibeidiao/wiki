# Wiki

### 代码规范

1. 组件内部编写顺序
  > `static` 开头的类属性，如 `defaultProps`，`propTypes`。
  
  > 构造函数，`constructor`。
  
  > `getter`/`setter` 方法。
  
  > 组件的生命周期。
  
  > `_` 开头的私有方法。
  
  > 事件监听方法，`handle*`。
  
  > `render*` 开头的方法，有时候 `render()` 方法里面的内容会分开到不同函数里面进行，这些函数都以 `render*` 开头。
  
  > `render()` 方法
  
2. 组件的私有方法都用 `_` 开头，所有事件监听的方法都用 `handle` 开头。把事件监听方法传给组件的时候，属性名用`on`开头。
3. 文件命名规范
  > 组件文件名为大驼峰。如 `AppComponent.jsx`

  > 文件夹名为短横线命名法。如 `app-component`

  > 测试文件添加后缀 `.test`。如 `app.component.test.js`

  
  