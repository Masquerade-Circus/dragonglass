import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const defaultFieldsCode = `<form data-card>
  <section>
  <fieldset>
    <label for="profile-name">Name</label>
    <input id="profile-name" name="name" type="text" aria-describedby="profile-name-help">
    <small id="profile-name-help">Use a readable public name.</small>
  </fieldset>
  <fieldset>
    <label for="profile-email">Email</label>
    <input id="profile-email" name="email" type="email" required aria-describedby="profile-email-help">
    <small id="profile-email-help">Enter the address used for account messages.</small>
  </fieldset>
  <fieldset>
    <label for="account-id">Account ID</label>
    <input id="account-id" name="account-id" type="text" value="AC-1042" disabled aria-describedby="account-id-help">
    <small id="account-id-help">Account IDs cannot be changed.</small>
  </fieldset>
  <fieldset>
    <label for="profile-handle">Handle</label>
    <input id="profile-handle" name="handle" type="text" value="Ada Lovelace" aria-invalid="true" aria-describedby="profile-handle-error">
    <small id="profile-handle-error">Use letters, numbers or hyphens without spaces.</small>
  </fieldset>
  <fieldset>
    <label for="profile-message">Message</label>
    <textarea id="profile-message" name="message" aria-describedby="profile-message-help"></textarea>
    <small id="profile-message-help">Write a short message.</small>
  </fieldset>
  <fieldset>
    <label for="profile-role">Role</label>
    <select id="profile-role" name="role" aria-describedby="profile-role-help">
      <option value="">Select a role</option>
      <option value="admin">Admin</option>
      <option value="editor">Editor</option>
      <option value="viewer">Viewer</option>
    </select>
    <small id="profile-role-help">Choose the access level for this person.</small>
  </fieldset>
  </section>
</form>`;

const floatingFieldsCode = `<form data-card>
  <section>
  <fieldset data-floating>
    <input id="floating-name" name="name" type="text" placeholder="Full name" aria-labelledby="floating-name-label" aria-describedby="floating-name-help">
    <legend id="floating-name-label">Full name</legend>
    <small id="floating-name-help">Enter the name shown to teammates.</small>
  </fieldset>
  <fieldset data-floating data-field="warning">
    <input id="floating-slug" name="slug" type="text" value="draft-name" placeholder="Project slug" aria-labelledby="floating-slug-label" aria-describedby="floating-slug-help">
    <legend id="floating-slug-label">Project slug</legend>
    <small id="floating-slug-help">Changing this value updates shared links.</small>
  </fieldset>
  <fieldset data-floating data-field="success">
    <input id="floating-domain" name="domain" type="text" value="example.com" placeholder="Domain" aria-labelledby="floating-domain-label" aria-describedby="floating-domain-help">
    <legend id="floating-domain-label">Domain</legend>
    <small id="floating-domain-help">This domain is available.</small>
  </fieldset>
  <fieldset data-floating>
    <input id="floating-code" name="code" type="text" value="bad code" placeholder="Invite code" aria-labelledby="floating-code-label" aria-describedby="floating-code-error" aria-invalid="true">
    <legend id="floating-code-label">Invite code</legend>
    <small id="floating-code-error">Remove the space from the invite code.</small>
  </fieldset>
  <fieldset data-floating>
    <textarea id="floating-notes" name="notes" placeholder="Notes" aria-labelledby="floating-notes-label" aria-describedby="floating-notes-help"></textarea>
    <legend id="floating-notes-label">Notes</legend>
    <small id="floating-notes-help">Add context for reviewers.</small>
  </fieldset>
  <fieldset data-floating>
    <select id="floating-team" name="team" aria-labelledby="floating-team-label" aria-describedby="floating-team-help">
      <option value="">Select a team</option>
      <option value="design">Design</option>
      <option value="engineering">Engineering</option>
    </select>
    <legend id="floating-team-label">Team</legend>
    <small id="floating-team-help">Choose the team that owns this work.</small>
  </fieldset>
  </section>
</form>`;

const selectionControlsCode = `<form data-card>
  <section>
  <fieldset>
    <legend>Review frequency</legend>
    <input id="review-weekly" name="review-frequency" type="radio" value="weekly">
    <label for="review-weekly">Weekly</label>
    <input id="review-monthly" name="review-frequency" type="radio" value="monthly">
    <label for="review-monthly">Monthly</label>
  </fieldset>
  <fieldset>
    <legend>Updates</legend>
    <input id="email-updates" name="email-updates" type="checkbox" value="enabled">
    <label for="email-updates">Send email updates</label>
  </fieldset>
  <fieldset>
    <legend>Availability</legend>
    <input id="public-profile" name="public-profile" type="checkbox" value="public" data-toggle>
    <label for="public-profile">Public profile</label>
  </fieldset>
  </section>
</form>`;

const slidersCode = `<form data-card>
  <section>
  <fieldset>
    <label for="volume">Volume</label>
    <input id="volume" name="volume" type="range" min="0" max="100" value="60" aria-describedby="volume-help">
    <small id="volume-help">Choose a value from 0 to 100.</small>
  </fieldset>
  <fieldset>
    <label for="locked-volume">Managed volume</label>
    <input id="locked-volume" name="locked-volume" type="range" min="0" max="100" value="20" disabled aria-describedby="locked-volume-help">
    <small id="locked-volume-help">Your administrator manages this value.</small>
  </fieldset>
  </section>
</form>`;

const nativePickersCode = `<form data-card>
  <section>
  <fieldset>
    <label for="start-date">Date</label>
    <input id="start-date" name="start-date" type="date">
  </fieldset>
  <fieldset>
    <label for="start-time">Time</label>
    <input id="start-time" name="start-time" type="time">
  </fieldset>
  <fieldset>
    <label for="billing-month">Month</label>
    <input id="billing-month" name="billing-month" type="month">
  </fieldset>
  <fieldset>
    <label for="reporting-week">Week</label>
    <input id="reporting-week" name="reporting-week" type="week">
  </fieldset>
  <fieldset>
    <label for="brand-color">Brand color</label>
    <input id="brand-color" name="brand-color" type="color" value="#3366ff">
  </fieldset>
  <fieldset>
    <label for="shirt-size">Size</label>
    <select id="shirt-size" name="shirt-size">
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
    </select>
  </fieldset>
  </section>
</form>`;

const coloredSurfaceCode = `<form data-card class="bg-primary">
  <section>
    <fieldset>
      <label for="invite-name">Name</label>
      <input id="invite-name" name="name" type="text" aria-describedby="invite-name-help">
      <small id="invite-name-help">Enter the name shown on the invitation.</small>
    </fieldset>
    <fieldset data-floating>
      <input id="invite-email" name="email" type="email" placeholder="Email" aria-labelledby="invite-email-label" aria-describedby="invite-email-help">
      <legend id="invite-email-label">Email</legend>
      <small id="invite-email-help">We will send the invitation to this address.</small>
    </fieldset>
  </section>
  <footer>
    <nav aria-label="Invitation actions">
      <button type="reset" class="text-white">Reset</button>
      <button type="submit" class="bg-white text-primary">Send invitation</button>
    </nav>
  </footer>
</form>`;

const searchCode = `<search aria-label="Documentation">
  <form action="/dragonglass/forms.html">
    <fieldset>
      <label for="docs-search">Search docs</label>
      <input id="docs-search" type="search" name="q">
    </fieldset>
    <button type="submit">Search</button>
  </form>
</search>`;

const searchFormCode = `<form action="/dragonglass/forms.html" role="search" aria-label="Components">
  <fieldset>
    <label for="component-search">Find a component</label>
    <input id="component-search" type="search" name="component" value="forms">
  </fieldset>
  <button type="submit">Find</button>
</form>`;

const toolbarSearchCode = `<nav data-toolbar aria-label="Documentation tools">
  <search aria-label="Component filters">
    <form action="/dragonglass/forms.html">
      <fieldset>
        <label for="filter-search">Filter components</label>
        <input id="filter-search" type="search" name="filter">
      </fieldset>
      <button type="submit">Filter</button>
    </form>
  </search>
</nav>`;

const apiRows = [
  {
    name: "input, select, textarea",
    type: "Element",
    defaultValue: "Full width",
    description:
      "Provides the native control behavior and Dragonglass field styling.",
  },
  {
    name: "label[for]",
    type: "Element",
    defaultValue: "Required by guidance",
    description:
      "Gives a control its visible, programmatic name through a matching id.",
  },
  {
    name: "fieldset and legend",
    type: "Element",
    defaultValue: "No border",
    description:
      "Groups related controls and names radio, checkbox or floating-field groups.",
  },
  {
    name: "data-floating",
    type: "Attribute",
    defaultValue: "Absent",
    description:
      "Positions a following legend as a floating label for the control.",
  },
  {
    name: 'data-field="warning|success"',
    type: "Attribute token",
    defaultValue: "Neutral",
    description:
      "Applies a non-error semantic state to a fieldset and its control.",
  },
  {
    name: "data-toggle",
    type: "Attribute",
    defaultValue: "Absent",
    description:
      "Displays a checkbox as a switch while preserving native checkbox semantics.",
  },
  {
    name: 'aria-invalid="true"',
    type: "State",
    defaultValue: "Absent",
    description:
      "Marks the control, not its wrapper, as invalid and applies the danger state.",
  },
  {
    name: "aria-describedby",
    type: "Attribute",
    defaultValue: "Absent",
    description:
      "Connects a control to persistent help or its current error message.",
  },
  {
    name: "--control-accent",
    type: "Token",
    defaultValue: "Theme value",
    description: "Controls focus, checked and range accents.",
  },
  {
    name: "search / form[role=search]",
    type: "Element / attribute",
    defaultValue: "Contextual",
    description:
      "Creates a search landmark and aligns a fieldset with its submit action.",
  },
  {
    name: "input[type=search]",
    type: "Element / attribute",
    defaultValue: "Empty",
    description: "Provides native search input and clear-button behavior.",
  },
];

export default () => (
  <DocPage page="Forms">
    <DemoSection id="default-fields" title="Default HTML fields">
      <form data-card>
        <section>
          <fieldset>
            <label for="profile-name">Name</label>
            <input
              id="profile-name"
              name="name"
              type="text"
              aria-describedby="profile-name-help"
            />
            <small id="profile-name-help">Use a readable public name.</small>
          </fieldset>
          <fieldset>
            <label for="profile-email">Email</label>
            <input
              id="profile-email"
              name="email"
              type="email"
              required
              aria-describedby="profile-email-help"
            />
            <small id="profile-email-help">
              Enter the address used for account messages.
            </small>
          </fieldset>
          <fieldset>
            <label for="account-id">Account ID</label>
            <input
              id="account-id"
              name="account-id"
              type="text"
              value="AC-1042"
              disabled
              aria-describedby="account-id-help"
            />
            <small id="account-id-help">Account IDs cannot be changed.</small>
          </fieldset>
          <fieldset>
            <label for="profile-handle">Handle</label>
            <input
              id="profile-handle"
              name="handle"
              type="text"
              value="Ada Lovelace"
              aria-invalid="true"
              aria-describedby="profile-handle-error"
            />
            <small id="profile-handle-error">
              Use letters, numbers or hyphens without spaces.
            </small>
          </fieldset>
          <fieldset>
            <label for="profile-message">Message</label>
            <textarea
              id="profile-message"
              name="message"
              aria-describedby="profile-message-help"
            />
            <small id="profile-message-help">Write a short message.</small>
          </fieldset>
          <fieldset>
            <label for="profile-role">Role</label>
            <select
              id="profile-role"
              name="role"
              aria-describedby="profile-role-help"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            <small id="profile-role-help">
              Choose the access level for this person.
            </small>
          </fieldset>
        </section>
      </form>
      <CodeExample code={defaultFieldsCode} />
    </DemoSection>

    <DemoSection id="floating-labels" title="Floating labels">
      <form data-card>
        <section>
          <fieldset data-floating>
            <input
              id="floating-name"
              name="name"
              type="text"
              placeholder="Full name"
              aria-labelledby="floating-name-label"
              aria-describedby="floating-name-help"
            />
            <legend id="floating-name-label">Full name</legend>
            <small id="floating-name-help">
              Enter the name shown to teammates.
            </small>
          </fieldset>
          <fieldset data-floating data-field="warning">
            <input
              id="floating-slug"
              name="slug"
              type="text"
              value="draft-name"
              placeholder="Project slug"
              aria-labelledby="floating-slug-label"
              aria-describedby="floating-slug-help"
            />
            <legend id="floating-slug-label">Project slug</legend>
            <small id="floating-slug-help">
              Changing this value updates shared links.
            </small>
          </fieldset>
          <fieldset data-floating data-field="success">
            <input
              id="floating-domain"
              name="domain"
              type="text"
              value="example.com"
              placeholder="Domain"
              aria-labelledby="floating-domain-label"
              aria-describedby="floating-domain-help"
            />
            <legend id="floating-domain-label">Domain</legend>
            <small id="floating-domain-help">This domain is available.</small>
          </fieldset>
          <fieldset data-floating>
            <input
              id="floating-code"
              name="code"
              type="text"
              value="bad code"
              placeholder="Invite code"
              aria-labelledby="floating-code-label"
              aria-describedby="floating-code-error"
              aria-invalid="true"
            />
            <legend id="floating-code-label">Invite code</legend>
            <small id="floating-code-error">
              Remove the space from the invite code.
            </small>
          </fieldset>
          <fieldset data-floating>
            <textarea
              id="floating-notes"
              name="notes"
              placeholder="Notes"
              aria-labelledby="floating-notes-label"
              aria-describedby="floating-notes-help"
            />
            <legend id="floating-notes-label">Notes</legend>
            <small id="floating-notes-help">Add context for reviewers.</small>
          </fieldset>
          <fieldset data-floating>
            <select
              id="floating-team"
              name="team"
              aria-labelledby="floating-team-label"
              aria-describedby="floating-team-help"
            >
              <option value="">Select a team</option>
              <option value="design">Design</option>
              <option value="engineering">Engineering</option>
            </select>
            <legend id="floating-team-label">Team</legend>
            <small id="floating-team-help">
              Choose the team that owns this work.
            </small>
          </fieldset>
        </section>
      </form>
      <CodeExample code={floatingFieldsCode} />
    </DemoSection>

    <DemoSection id="selection-controls" title="Selection controls">
      <form data-card>
        <section>
          <fieldset>
            <legend>Review frequency</legend>
            <input
              id="review-weekly"
              name="review-frequency"
              type="radio"
              value="weekly"
            />
            <label for="review-weekly">Weekly</label>
            <input
              id="review-monthly"
              name="review-frequency"
              type="radio"
              value="monthly"
            />
            <label for="review-monthly">Monthly</label>
          </fieldset>
          <fieldset>
            <legend>Updates</legend>
            <input
              id="email-updates"
              name="email-updates"
              type="checkbox"
              value="enabled"
            />
            <label for="email-updates">Send email updates</label>
          </fieldset>
          <fieldset>
            <legend>Availability</legend>
            <input
              id="public-profile"
              name="public-profile"
              type="checkbox"
              value="public"
              data-toggle
            />
            <label for="public-profile">Public profile</label>
          </fieldset>
        </section>
      </form>
      <CodeExample code={selectionControlsCode} />
    </DemoSection>

    <DemoSection id="sliders" title="Sliders">
      <form data-card>
        <section>
          <fieldset>
            <label for="volume">Volume</label>
            <input
              id="volume"
              name="volume"
              type="range"
              min="0"
              max="100"
              value="60"
              aria-describedby="volume-help"
            />
            <small id="volume-help">Choose a value from 0 to 100.</small>
          </fieldset>
          <fieldset>
            <label for="locked-volume">Managed volume</label>
            <input
              id="locked-volume"
              name="locked-volume"
              type="range"
              min="0"
              max="100"
              value="20"
              disabled
              aria-describedby="locked-volume-help"
            />
            <small id="locked-volume-help">
              Your administrator manages this value.
            </small>
          </fieldset>
        </section>
      </form>
      <CodeExample code={slidersCode} />
    </DemoSection>

    <DemoSection id="native-pickers" title="Native pickers">
      <form data-card>
        <section>
          <fieldset>
            <label for="start-date">Date</label>
            <input id="start-date" name="start-date" type="date" />
          </fieldset>
          <fieldset>
            <label for="start-time">Time</label>
            <input id="start-time" name="start-time" type="time" />
          </fieldset>
          <fieldset>
            <label for="billing-month">Month</label>
            <input id="billing-month" name="billing-month" type="month" />
          </fieldset>
          <fieldset>
            <label for="reporting-week">Week</label>
            <input id="reporting-week" name="reporting-week" type="week" />
          </fieldset>
          <fieldset>
            <label for="brand-color">Brand color</label>
            <input
              id="brand-color"
              name="brand-color"
              type="color"
              value="#3366ff"
            />
          </fieldset>
          <fieldset>
            <label for="shirt-size">Size</label>
            <select id="shirt-size" name="shirt-size">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </fieldset>
        </section>
      </form>
      <CodeExample code={nativePickersCode} />
    </DemoSection>

    <DemoSection id="colored-surfaces" title="Forms on colored surfaces">
      <form data-card class="bg-primary">
        <section>
          <fieldset>
            <label for="invite-name">Name</label>
            <input
              id="invite-name"
              name="name"
              type="text"
              aria-describedby="invite-name-help"
            />
            <small id="invite-name-help">
              Enter the name shown on the invitation.
            </small>
          </fieldset>
          <fieldset data-floating>
            <input
              id="invite-email"
              name="email"
              type="email"
              placeholder="Email"
              aria-labelledby="invite-email-label"
              aria-describedby="invite-email-help"
            />
            <legend id="invite-email-label">Email</legend>
            <small id="invite-email-help">
              We will send the invitation to this address.
            </small>
          </fieldset>
        </section>
        <footer>
          <nav aria-label="Invitation actions">
            <button type="reset" class="text-white">
              Reset
            </button>
            <button type="submit" class="bg-white text-primary">
              Send invitation
            </button>
          </nav>
        </footer>
      </form>
      <CodeExample code={coloredSurfaceCode} />
    </DemoSection>

    <DemoSection id="search-forms" title="Search forms">
      <h3>Search landmark</h3>
      <search aria-label="Documentation">
        <form action="/dragonglass/forms.html">
          <fieldset>
            <label for="docs-search">Search docs</label>
            <input id="docs-search" type="search" name="q" />
          </fieldset>
          <button type="submit">Search</button>
        </form>
      </search>
      <CodeExample code={searchCode} />

      <h3>Search role on a form</h3>
      <form
        action="/dragonglass/forms.html"
        role="search"
        aria-label="Components"
      >
        <fieldset>
          <label for="component-search">Find a component</label>
          <input
            id="component-search"
            type="search"
            name="component"
            value="forms"
          />
        </fieldset>
        <button type="submit">Find</button>
      </form>
      <CodeExample code={searchFormCode} />

      <h3>Search inside a toolbar</h3>
      <nav data-toolbar aria-label="Documentation tools">
        <search aria-label="Component filters">
          <form action="/dragonglass/forms.html">
            <fieldset>
              <label for="filter-search">Filter components</label>
              <input id="filter-search" type="search" name="filter" />
            </fieldset>
            <button type="submit">Filter</button>
          </form>
        </search>
      </nav>
      <CodeExample code={toolbarSearchCode} />
    </DemoSection>

    <DemoSection id="forms-composition" title="Composition">
      <p>
        Place each control and its help text in a <code>fieldset</code>. Use a
        visible <code>label</code> for ordinary fields. Floating fields keep the
        control before the <code>legend</code> because that sibling order drives
        the visual label state.
      </p>
      <p>
        Radio buttons share a <code>name</code> and a group legend. Checkboxes
        and toggles keep their native input so forms, keyboards and assistive
        technology receive the expected behavior.
      </p>
    </DemoSection>

    <DemoSection id="forms-responsive" title="Responsive behavior">
      <p>
        Text controls fill the available width, textareas resize vertically and
        range inputs preserve their full track. Let the surrounding form or card
        control column width. Native date, time and select interfaces may vary
        by browser and operating system.
      </p>
    </DemoSection>

    <DemoSection id="forms-accessibility" title="Accessibility">
      <p>
        Every control needs a stable <code>name</code> for submission and an
        accessible name from <code>label</code> or <code>aria-labelledby</code>.
        Connect help and error text with <code>aria-describedby</code>. Put
        <code> aria-invalid="true"</code> on the invalid control after
        validation, and move focus to the first invalid field when submission
        fails.
      </p>
    </DemoSection>

    <DemoSection id="forms-errors" title="Common mistakes">
      <ul>
        <li>Placeholders do not replace persistent labels.</li>
        <li>
          Putting <code>aria-invalid</code> on a fieldset does not expose the
          invalid state on its control.
        </li>
        <li>
          Error text without <code>aria-describedby</code> can be visually close
          while remaining disconnected to a screen reader.
        </li>
        <li>
          Giving radio buttons different names prevents them from behaving as
          one exclusive group.
        </li>
      </ul>
    </DemoSection>

    <DemoSection id="forms-api" title="API">
      <ApiTable
        caption="Form elements, attributes, states and tokens"
        rows={apiRows}
      />
    </DemoSection>
  </DocPage>
);
