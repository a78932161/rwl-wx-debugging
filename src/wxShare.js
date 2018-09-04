import router from './router'

import {baseURL} from 'api/config';
import {wxConfig} from 'common/js/util';

router.beforeEach((to, from, next) => {

  if(to.path.indexOf('commodity')===-1) {
    wxConfig('分享页面',to.path);
  }
  next();
});

