# Forms

Collect information with semantic, accessible form controls.

## Default HTML fields

```html
<form data-card>
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
</form>
```

## Floating labels

```html
<form data-card>
  <section>
  <div data-floating>
    <input id="floating-name" name="name" type="text" placeholder="Full name" aria-describedby="floating-name-help">
    <label for="floating-name">Full name</label>
    <small id="floating-name-help">Enter the name shown to teammates.</small>
  </div>
  <div data-floating data-field="warning">
    <input id="floating-slug" name="slug" type="text" value="draft-name" placeholder="Project slug" aria-describedby="floating-slug-help">
    <label for="floating-slug">Project slug</label>
    <small id="floating-slug-help">Changing this value updates shared links.</small>
  </div>
  <div data-floating data-field="success">
    <input id="floating-domain" name="domain" type="text" value="example.com" placeholder="Domain" aria-describedby="floating-domain-help">
    <label for="floating-domain">Domain</label>
    <small id="floating-domain-help">This domain is available.</small>
  </div>
  <div data-floating>
    <input id="floating-code" name="code" type="text" value="bad code" placeholder="Invite code" aria-describedby="floating-code-error" aria-invalid="true">
    <label for="floating-code">Invite code</label>
    <small id="floating-code-error">Remove the space from the invite code.</small>
  </div>
  <div data-floating>
    <textarea id="floating-notes" name="notes" placeholder="Notes" aria-describedby="floating-notes-help"></textarea>
    <label for="floating-notes">Notes</label>
    <small id="floating-notes-help">Add context for reviewers.</small>
  </div>
  <div data-floating>
    <select id="floating-team" name="team" aria-describedby="floating-team-help">
      <option value="">Select a team</option>
      <option value="design">Design</option>
      <option value="engineering">Engineering</option>
    </select>
    <label for="floating-team">Team</label>
    <small id="floating-team-help">Choose the team that owns this work.</small>
  </div>
  </section>
</form>
```

## Selection controls

```html
<form data-card>
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
</form>
```

## Sliders

```html
<form data-card>
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
</form>
```

## Native pickers

```html
<form data-card>
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
</form>
```

## Forms on colored surfaces

```html
<form data-card class="bg-primary">
  <section>
    <fieldset>
      <label for="invite-name">Name</label>
      <input id="invite-name" name="name" type="text" aria-describedby="invite-name-help">
      <small id="invite-name-help">Enter the name shown on the invitation.</small>
    </fieldset>
    <div data-floating>
      <input id="invite-email" name="email" type="email" placeholder="Email" aria-describedby="invite-email-help">
      <label for="invite-email">Email</label>
      <small id="invite-email-help">We will send the invitation to this address.</small>
    </div>
  </section>
  <footer>
    <nav aria-label="Invitation actions">
      <button type="reset" class="text-white">Reset</button>
      <button type="submit" class="bg-white text-primary">Send invitation</button>
    </nav>
  </footer>
</form>
```

## Search forms

### Search landmark

```html
<search aria-label="Documentation">
  <form action="/dragonglass/forms.html">
    <fieldset>
      <label for="docs-search">Search docs</label>
      <input id="docs-search" type="search" name="q">
    </fieldset>
    <button type="submit">Search</button>
  </form>
</search>
```

### Search role on a form

```html
<form action="/dragonglass/forms.html" role="search" aria-label="Components">
  <fieldset>
    <label for="component-search">Find a component</label>
    <input id="component-search" type="search" name="component" value="forms">
  </fieldset>
  <button type="submit">Find</button>
</form>
```

### Search inside a toolbar

```html
<nav data-toolbar aria-label="Documentation tools">
  <search aria-label="Component filters">
    <form action="/dragonglass/forms.html">
      <fieldset>
        <label for="filter-search">Filter components</label>
        <input id="filter-search" type="search" name="filter">
      </fieldset>
      <button type="submit">Filter</button>
    </form>
  </search>
</nav>
```

## Composition

Wrap ordinary fields as needed and use `fieldset` with `legend` for related control groups. Floating fields use a neutral `data-floating` container and keep the control before its `label` because that sibling order drives the visual label state.

Radio buttons share a `name` and a group legend. Checkboxes and toggles keep their native input so forms, keyboards and assistive technology receive the expected behavior.

## Responsive behavior

Text controls fill the available width, textareas resize vertically and range inputs preserve their full track. Let the surrounding form or card control column width. Native date, time and select interfaces may vary by browser and operating system.

## Accessibility

Every control needs a stable `name` for submission and an accessible name from a `label` whose `for` matches the control ID. Connect help and error text with `aria-describedby`. Put `aria-invalid="true"` on the invalid control after validation, and move focus to the first invalid field when submission fails.

## Common mistakes

## API

**Form elements, attributes, states and tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| input, select, textarea | Element | Full width | Provides the native control behavior and Dragonglass field styling. |
| label[for] | Element | Required by guidance | Gives a control its visible, programmatic name through a matching id. |
| fieldset and legend | Element | No border | Groups related controls and names radio or checkbox groups. |
| data-floating | Attribute | Absent | Turns a neutral wrapper with a control, label and small into a floating field. |
| data-field="primary\|accent\|info\|success\|warning\|danger\|default" | Attribute token | Neutral | Applies a documented semantic color to a field container and its control. |
| data-toggle | Attribute | Absent | Displays a checkbox as a switch while preserving native checkbox semantics. |
| aria-invalid="true" | State | Absent | Marks the control, not its wrapper, as invalid and applies the danger state. |
| aria-describedby | Attribute | Absent | Connects a control to persistent help or its current error message. |
| --control-accent | Token | Theme value | Controls focus, checked and range accents. |
| search / form[role=search] | Element / attribute | Contextual | Creates a search landmark and aligns a fieldset with its submit action. |
| input[type=search] | Element / attribute | Empty | Provides native search input and clear-button behavior. |
