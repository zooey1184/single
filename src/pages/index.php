<?php
//资源模式
//gio
$user_sid="";
if(isset($_GET['user_sid'])){
  $user_sid=$_GET['user_sid'];
}
if(isset($_COOKIE["jianbing_customer_id"])){
    $user_sid=$_COOKIE["jianbing_customer_id"];
}
//页面来源
$from="home_icon";
if(isset($_GET['from'])){
  $from=$_GET['from'];
}
else if(isset($_COOKIE["page_from"])){
    $from=$_COOKIE["page_from"];
}
setcookie("page_from",$from, time()+3600,'/');
//业务来源
$bankTag="";
if(isset($_GET['bankTag'])){
  $bankTag=$_GET['bankTag'];
}
//特色账户
$people = array("3603706","814934","815392","19936");
$testAccount=in_array($user_sid, $people);
?>
<?php
$isLoadPage=true;
$href=explode("&",$_SERVER["QUERY_STRING"])[0];
$query=explode("/",$href);
$query[1]="hualu";
for($i=2;$i<5;$i++){
    $app=implode("/",array_slice($query,1,$i))."/index.html";
    if(is_file($app)&&$isLoadPage){
      $isLoadPage=false;
      include $app;
    }
}
if($isLoadPage){
include "hualu/index/index.html";
}

?>
<?php if(1){ ?>
<script src='//r.51gjj.com/package/vconsole.3.0.min.js'></script>
<script>var vConsole = new VConsole();</script>
<?php } ?>
<?php if(1||isset($_SERVER['CI_ENV'])&&$_SERVER['CI_ENV']=='production'){ ?>
<script type='text/javascript'>
var _vds = _vds || [];
window._vds = _vds;
_vds.push(['enableHT', true])
_vds.push(['setAccountId', '87eba2bdbd60ebd7']);
<?php if ($user_sid) { ?>_vds.push(['setCS1', 'user_id', '<?php echo $user_sid; ?>']);<?php } ?>
<?php if ($from) { ?>_vds.push(['setCS2', 'from', '<?php echo $from; ?>']);<?php } ?>
<?php if ($bankTag) { ?>_vds.push(['setCS3', 'bankTag', '<?php echo $bankTag; ?>']);<?php } ?>
(function(){_vds.push(["setCS4","agent",function(){var a=navigator.userAgent,e=-1<a.indexOf("Android")||-1<a.indexOf("Linux")||-1<a.indexOf("android"),b=!!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)||-1<a.indexOf("ios"),d=-1<a.indexOf("MicroMessenger"),f=/^[\w\W]*android\/[\w\W]*client\/[\w\W]*theme\/[\w\W]*$/.test(a)||/^[\w\W]*ios\/[\w\W]*client\/[\w\W]*device\/[\w\W]*theme\/[\w\W]*$/.test(a),a=/^[\w\W]*ios\/[\w\W]*client\/[\w\W]*device\/[\w\W]*theme\/[\w\W]*$/.test(a),c="other";f?c=a?"IOSGjj":"AndroidGjj":
d?c="Wechat":b?c="IOSH5":e&&(c="AndroidH5");return c}()]);var b=navigator.userAgent.replace("client/and","client/").split("client/"),d="other";1<b.length&&(d=b[1].split(",theme")[0]);_vds.push(["setCS5","version",d]);(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"==document.location.protocol?"https://":"http://")+"dn-growing.qbox.me/vds.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})()})();
</script>
<?php } ?>
<?php
//获取网页地址
//获取网址参数
// echo  $_SERVER['REQUEST_URI'];

 ?>
