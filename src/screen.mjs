export const requestFullscreen = () => {
  navigator.wakeLock.request("screen").catch(err => {
    alert(`${err.name}, ${err.message}`)
  })

  if (!navigator.userActivation.isActive) {
    alert('not enough activation')
    return;
  }
  const elem = document.getElementsByTagName('dashboard')[0];
  if (!elem) {
    alert('element not found');
    return;
  }
  elem.requestFullscreen().catch((err) => {
    alert(
      `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
    );
  });
}

