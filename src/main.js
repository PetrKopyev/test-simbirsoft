import Vue from 'vue'
import 'normalize.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker } from 'element-ui';
import elementUILocale from 'element-ui/lib/locale'
import elementUILang from 'element-ui/lib/locale/lang/ru-RU';
import 'element-ui/packages/theme-chalk/lib/icon.css';
import 'element-ui/packages/theme-chalk/lib/date-picker.css';
import router from '@/router';
import store from "@/store";
import App from '@/App.vue';
import '@/scss/element-styles.scss';

dayjs.locale('ru');
dayjs.extend(customParseFormat);

Vue.config.productionTip = false

Vue.use(DatePicker);
elementUILocale.use(elementUILang);

Vue.filter('dayjs', (value, format) => {
  if (!value) return '';
  return dayjs(value).format(format);
});

Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
