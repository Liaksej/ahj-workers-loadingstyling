function app() {}
// TODO: entrypoint https://ahj-workers-loadingstyling-server.onrender.com
if (navigator.serviceWorker) {
  window.addEventListener("load", async () => {
    try {
      if (navigator.serviceWorker) {
        await navigator.serviceWorker.register("/service.worker.js");
        console.log("sw registered");
      }
      // await registration.unregister();
    } catch (e) {
      console.log(e);
    }
  });
}
app();
