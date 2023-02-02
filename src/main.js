/*
 * @Author: curechen 981470148@qq.com
 * @Date: 2023-01-08 10:21:11
 * @LastEditors: curechen 981470148@qq.com
 * @LastEditTime: 2023-01-15 14:14:26
 * @FilePath: \GraduationProject\local-life-mall\src\main.js
 * @Description: 
 */
import { createApp } from 'vue'
import {
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Divider,
  Popup,
  Overlay,
  Loading,
  Dialog,
  ContactCard,
  Form,
  AddressEdit,
  AddressList,
  Field,
  CellGroup,
  Cell,
  SwipeCell,
  Icon,
  Stepper,
  Card,
  Checkbox,
  CheckboxGroup,
  Button,
  Swipe,
  SwipeItem,
  PullRefresh,
  List,
  Tab,
  Tabs,
  SubmitBar,
  Toast,
  Skeleton,
  Popover
} from 'vant'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible/flexible'
import 'vant/lib/index.css'; // 全局引入样式

const app = createApp(App) // 创建实例

// 全局过滤器
app.config.globalProperties.$filters = {
  prefix(url) {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `http://backend-api-01.newbee.ltd${url}`
      return url
    }
  }
}

app.use(ActionBarButton)
  .use(ActionBarIcon)
  .use(ActionBar)
  .use(Divider)
  .use(Popup)
  .use(Overlay)
  .use(Loading)
  .use(Dialog)
  .use(Toast)
  .use(ContactCard)
  .use(Form)
  .use(AddressEdit)
  .use(AddressList)
  .use(Field)
  .use(CellGroup)
  .use(Cell)
  .use(SwipeCell)
  .use(Icon)
  .use(Stepper)
  .use(Card)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(PullRefresh)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Skeleton)
  .use(Popover)

app.use(router)
app.use(store)

app.mount('#app')