const { fromEvent, pluck, map } = rxjs;

const progressBar = document.querySelector(".progress-bar");

// listen to scroll event
const scrollEvent$ = fromEvent(document, "scroll");

// set the width
const progress$ = scrollEvent$
  .pipe(map((event) => calculateScrollPercentage(event.target.documentElement)))
  .subscribe((percentage) => (progressBar.style.width = `${percentage}%`));

// calculate width
function calculateScrollPercentage(element) {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}
