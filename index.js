const { fromEvent, map, throttleTime, asyncScheduler } = rxjs;

const progressBar = document.querySelector(".progress-bar");

// listen to scroll event
const scrollEvent$ = fromEvent(document, "scroll");

// set the width
const progress$ = scrollEvent$
  // parameter destructuring - passing {target} is same as passing event
  .pipe(
    throttleTime(30, asyncScheduler, { leading: false, trailing: true }),
    // limits the call to calculateScrollPercentage, calculates the progress pecent atmost every 30ms

    // the issue with this approach is, the scroll percentage is calculated every 30ms (it ignores the scroll progress for the next 30ms) - hence the scroll percentage won't reflect the actual scroll progress until we start scrolling again

    // asyncScheduler config properties - leading and trailing correspond with when the values should be emitted. the default behaviour is to emit at the leading edge of the silence window and then ignore all values until the window has passed.

    // in case of scroll, we need to emit the value at the trailing edge - means the last value at the end of the silence window. this will give us the latest scroll position after each silence window has passed.
    map(({ target }) => calculateScrollPercentage(target.documentElement))
  )
  .subscribe((percentage) => (progressBar.style.width = `${percentage}%`));

// calculate width
function calculateScrollPercentage(element) {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}
