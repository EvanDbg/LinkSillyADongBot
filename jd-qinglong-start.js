// [rule:raw ^挂机$]
// [rule:raw ^登录$]
// [rule:raw ^登陆$]
// [priority:100000]
function main() {
  var userID = GetUserID();
  var jdQLBot = get("adongQQ");
  var adongUrl = get("adongUrl")
  var counter = 0;
  sendText("提示：如机器人交互失败，请使用下方链接手动获取ck发送给我。");
  sendText(adongUrl);
  set('lastUser', userID);
  
  push({
      imType: "qq",
      userID: jdQLBot,
      content: "登录"
  })
  
  var sec = ""
  while (sec == "" || sec) {
      if (sec === 'q') {
          push({
              imType: "qq",
              userID: jdQLBot,
              content: sec
          })
          return;
      }
      sec = input(1000)
      if (sec) {
          counter = 0;
          push({
              imType: "qq",
              userID: jdQLBot,
              content: sec
          })
          continue;
      }
      counter = counter + 1;
      var ck = get("jd-qinglong-ck");
      if (ck) {
          breakIn(ck);
          set("jd-qinglong-ck", "")
          return;
      }
      var lastMsg = get("jd-qinglong-lastMsg");
      if (lastMsg) {
          counter = 0;
          set("jd-qinglong-lastMsg", "")
      }
      
      if (counter >= 30) {
          set("jd-qinglong-ck", "")
          set('lastUser', "");
          sendText("操作超时或出现错误，已退出本次交互。");
          return;
      }
  }
}
main();