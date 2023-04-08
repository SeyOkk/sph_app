import Vue from "vue";

import { MessageBox, Message } from "element-ui";

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
