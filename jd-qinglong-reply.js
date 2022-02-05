//[rule: ?] 匹配所有消息
//[priority: 99999] 超高的优先级
function main() {
  var message = param(1)
  var userID = GetUserID()
  var adongQQ = get("adongQQ")
  if (userID == adongQQ) {
      var lastUser = get("lastUser");
      if (/pt_key=/.test(message) && lastUser != "") {
          set("jd-qinglong-ck", message)
          set("lastUser", "")
          return;
      }
      if (/等待你的验证/.test(message)) {
          set("jd-qinglong-lastMsg", message)
      }
      push({
          imType: "qq",
          userID: lastUser,
          content: message
      })
  } else {
      Continue();
  }
}

main();