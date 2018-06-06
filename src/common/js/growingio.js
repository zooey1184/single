import { appDevEvn } from './base.js'
function growingIo() {
  var _vds = _vds || [];
  window._vds = _vds;
  _vds.push(['enableHT', true])
  _vds.push(['setAccountId', '87eba2bdbd60ebd7']);
  (function() {
    var vds = document.createElement('script');
    vds.type = 'text/javascript';
    vds.async = true;
    vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(vds, s);
  })();
}

export function insertGrowingIo() {
  if (!appDevEvn()) {
    growingIo()
  }
}
