import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const progressExample = `<label for="upload-progress">Upload progress</label>
<progress id="upload-progress" value="40" max="100" data-progress="primary">
  40%
</progress>`;

const progressTonesExample = `<progress value="20" max="100" data-progress="primary" aria-label="Primary progress">20%</progress>
<progress value="30" max="100" data-progress="accent" aria-label="Accent progress">30%</progress>
<progress value="40" max="100" data-progress="info" aria-label="Information progress">40%</progress>
<progress value="50" max="100" data-progress="success" aria-label="Successful progress">50%</progress>
<progress value="60" max="100" data-progress="warning" aria-label="Warning progress">60%</progress>
<progress value="70" max="100" data-progress="danger" aria-label="Danger progress">70%</progress>`;

const indeterminateProgressExample = `<progress data-progress="primary" aria-label="Loading results"></progress>
<progress data-progress="warning" aria-label="Saving changes"></progress>`;

const spinnerExample = `<progress data-progress="spinner primary" aria-label="Loading"></progress>
<progress data-progress="spinner danger" aria-label="Retrying"></progress>`;

export default () => (
  <DocPage page="Progress">
    <DemoSection id="progress-determinate-title" title="Determinate progress">
      <label for="upload-progress">Upload progress</label>
      <progress
        id="upload-progress"
        value="40"
        max="100"
        data-progress="primary"
      >
        40%
      </progress>
      <CodeExample code={progressExample} />
    </DemoSection>

    <DemoSection id="progress-tones-title" title="Supported tones">
      <p>
        Choose a supported tone that matches the status shown beside the bar.
        Keep a measurable value and maximum on every determinate example.
      </p>
      <progress
        value="20"
        max="100"
        data-progress="primary"
        aria-label="Primary progress"
      >
        20%
      </progress>
      <progress
        value="30"
        max="100"
        data-progress="accent"
        aria-label="Accent progress"
      >
        30%
      </progress>
      <progress
        value="40"
        max="100"
        data-progress="info"
        aria-label="Information progress"
      >
        40%
      </progress>
      <progress
        value="50"
        max="100"
        data-progress="success"
        aria-label="Successful progress"
      >
        50%
      </progress>
      <progress
        value="60"
        max="100"
        data-progress="warning"
        aria-label="Warning progress"
      >
        60%
      </progress>
      <progress
        value="70"
        max="100"
        data-progress="danger"
        aria-label="Danger progress"
      >
        70%
      </progress>
      <CodeExample code={progressTonesExample} />
    </DemoSection>

    <DemoSection
      id="progress-indeterminate-title"
      title="Indeterminate progress"
    >
      <p>
        Omit <code>value</code> when the remaining duration or amount is
        unknown. An accessible name tells assistive technology which task is
        active.
      </p>
      <progress data-progress="primary" aria-label="Loading results" />
      <progress data-progress="warning" aria-label="Saving changes" />
      <CodeExample code={indeterminateProgressExample} />
    </DemoSection>

    <DemoSection id="progress-spinner-title" title="Spinners">
      <p>
        Add the <code>spinner</code> token for a compact circular indicator,
        then pair it with one supported tone and a name for the active task.
      </p>
      <progress data-progress="spinner primary" aria-label="Loading" />
      <progress data-progress="spinner danger" aria-label="Retrying" />
      <CodeExample code={spinnerExample} />
    </DemoSection>

    <DemoSection id="progress-api-title" title="API">
      <ApiTable
        caption="Progress elements, attributes, tokens and states"
        rows={[
          {
            name: "progress",
            type: "Element",
            defaultValue: "Required",
            description: "Provides native progress semantics.",
          },
          {
            name: "value / max",
            type: "Attribute",
            defaultValue: "Indeterminate / 1",
            description: "Define measurable completion and its upper bound.",
          },
          {
            name: "data-progress",
            type: "Attribute",
            defaultValue: "Primary bar",
            description:
              "Accepts primary, accent, info, success, warning, danger and spinner.",
          },
          {
            name: "--progress-color / --progress-track",
            type: "Token",
            defaultValue: "Primary / default-lighter",
            description: "Set the indicator and track colors.",
          },
          {
            name: "determinate / indeterminate / spinner",
            type: "State",
            defaultValue: "Indeterminate without value",
            description:
              "Selects measured, animated bar or circular presentation.",
          },
        ]}
      />
    </DemoSection>

    <DemoSection id="progress-accessibility-title" title="Accessibility">
      <p>
        Give every progress element a visible label or an accessible name. Use
        <code> value</code> and <code>max</code> only when progress is
        measurable. Omit <code>value</code> for an unknown duration so assistive
        technology announces an indeterminate state.
      </p>
    </DemoSection>

    <DemoSection
      id="progress-errors-title"
      title="Composition and common errors"
    >
      <p>
        Choose only tones backed by existing variables. The documented set omits{" "}
        <code>secondary</code> because no <code>--secondary</code> token is
        defined. Do not report a guessed percentage as determinate progress.
      </p>
    </DemoSection>
  </DocPage>
);
