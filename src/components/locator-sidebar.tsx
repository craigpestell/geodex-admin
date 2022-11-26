
const progressWrapper = `var progressWrapper, progress, progressDiv;
progressWrapper = document.querySelector(".progress-wrapper");
// because white space impacts rendering, add via JS to avoid formatting/linting issues
progressWrapper.innerHTML = \`
<div className="mdc-circular-progress mdc-circular-progress--large" role="progressbar" aria-label="Example Progress Bar" aria-valuemin="0" aria-valuemax="1">
<div className="mdc-circular-progress__determinate-container">
<svg className="mdc-circular-progress__determinate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<circle className="mdc-circular-progress__determinate-circle" cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="113.097"/>
</svg>
</div>
<div className="mdc-circular-progress__indeterminate-container">
<div className="mdc-circular-progress__spinner-layer">
<div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
<svg className="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549"/>
</svg>
</div><div className="mdc-circular-progress__gap-patch">
<svg className="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549"/>
</svg>
</div><div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
<svg className="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549"/>
</svg>
</div>
</div>
</div>
</div>
\`;

progress = new mdc.circularProgress.MDCCircularProgress(
  document.querySelector(".mdc-circular-progress")
);
progress.open();
progress.determinate = false;
progress.done = function () {
  progress.close();
  progressWrapper.remove();
};`;
export const LocatorSidebar = () => {

    return <div id="sidebar">
    <div id="search">
      <label className="mdc-text-field mdc-text-field--outlined">
        <input
          type="text"
          className="mdc-text-field__input"
          aria-labelledby="my-label-id"
          id="search-input"
        />
        <span className="mdc-notched-outline">
          <span className="mdc-notched-outline__leading"></span>
          <span className="mdc-notched-outline__notch">
            <span className="mdc-floating-label" id="my-label-id"
              >Enter a location</span
            >
          </span>
          <span className="mdc-notched-outline__trailing"></span>
        </span>
      </label>
      <button id="near-me" className="mdc-icon-button material-icons">
        near_me
      </button>
      <button id="refresh" className="mdc-icon-button material-icons">
        refresh
      </button>
    </div>
    <div id="cards">
      <div className="progress-wrapper"></div>
<script>
        {progressWrapper}
</script>
    </div>
  </div>
}