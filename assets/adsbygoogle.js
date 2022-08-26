async function checkForAdBlocker() {
  let Blocked;

  async function Request() {
    try {
      return fetch(
        new Request(
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
          {
            method: "HEAD",
            mode: "no-cors",
          }
        )
      )
        .then(function (response) {
          // There is no AdBlocker
          Blocked = false;
          return Blocked;
        })
        .catch(function (e) {
          // Failed, Because of an AdBlocker
          Blocked = true;
          return Blocked;
        });
    } catch (error) {
      console.log(error);
      Blocked = true;
      return Blocked;
    }
  }

  return Blocked !== undefined ? Blocked : await Request();
}

const usingBlocker = await checkForAdBlocker();
