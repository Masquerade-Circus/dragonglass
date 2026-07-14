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
        Without a <code>value</code>, Dragonglass applies the animated
        indeterminate bar.
      </p>
      <progress data-progress="primary" aria-label="Loading results" />
      <progress data-progress="warning" aria-label="Saving changes" />
      <CodeExample code={indeterminateProgressExample} />
    </DemoSection>

    <DemoSection id="progress-spinner-title" title="Spinners">
      <p>
        The <code>spinner</code> token creates a compact circular indicator and
        combines with one supported tone.
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
            description: "Receives the full-width base track.",
          },
          {
            name: "value",
            type: "Attribute",
            defaultValue: "Absent",
            description:
              "Its absence selects the animated indeterminate presentation.",
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
  </DocPage>
);
