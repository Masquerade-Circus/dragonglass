import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const semanticNotificationsCode = `<aside data-notification="info inline" role="status">Sync started.</aside>
<aside data-notification="success inline" role="status">File uploaded successfully.</aside>
<aside data-notification="warning inline" role="status">Storage is almost full.</aside>
<aside data-notification="danger inline" role="alert">Upload failed.</aside>`;

const contentNotificationCode = `<aside data-notification="success inline" role="status">
  <button type="button" data-notification-close aria-label="Dismiss">
    <span aria-hidden="true">×</span>
  </button>
  <strong>Export ready.</strong>
  <p>Your report can be downloaded now.</p>
</aside>`;

const positionsCode = `<aside data-notification="info top right" role="status">Saved.</aside>
<aside data-notification="warning bottom center" role="status">Storage is almost full.</aside>
<aside data-notification="danger center left" role="alert">Connection lost.</aside>`;

const shadowCode = `<aside data-notification="info inline" role="status">Default shadow</aside>
<aside data-notification="info inline no-shadow" role="status">No shadow</aside>`;

const apiRows = [
  {
    name: "aside",
    type: "Element",
    defaultValue: "Fixed notification",
    description:
      "Provides a complementary message container for notification content.",
  },
  {
    name: "data-notification",
    type: "Attribute",
    defaultValue: "Primary border, top right",
    description:
      "Activates notification layout and accepts tone, position and shadow tokens.",
  },
  {
    name: "data-notification-close",
    type: "Button attribute",
    defaultValue: "Optional",
    description:
      "Marks a direct child button as the close action without coupling styles to its accessible name.",
  },
  {
    name: "info|success|warning|danger",
    type: "Attribute token",
    defaultValue: "Primary",
    description:
      "Sets the semantic border color without choosing announcement urgency.",
  },
  {
    name: "inline",
    type: "Attribute token",
    defaultValue: "Fixed",
    description:
      "Keeps a notification in document flow and resets position transforms.",
  },
  {
    name: "top|right|bottom|left|center",
    type: "Attribute token",
    defaultValue: "top right",
    description:
      "Combines vertical and horizontal placement for fixed notifications.",
  },
  {
    name: "no-shadow",
    type: "Attribute token",
    defaultValue: "--shadow-lg",
    description:
      "Removes elevation when a border or surrounding surface is sufficient.",
  },
  {
    name: 'role="status"',
    type: "State",
    defaultValue: "Recommended",
    description:
      "Politely announces non-urgent updates without interrupting current speech.",
  },
  {
    name: 'role="alert"',
    type: "State",
    defaultValue: "Urgent errors only",
    description:
      "Immediately announces a time-sensitive problem that needs attention.",
  },
  {
    name: "--notification-color",
    type: "Token",
    defaultValue: "--primary",
    description:
      "Controls the notification border and is set by semantic tone tokens.",
  },
];

export default () => (
  <DocPage page="Notifications">
    <DemoSection id="notification-semantics" title="Status and alert messages">
      <aside data-notification="info inline" role="status">
        Sync started.
      </aside>
      <aside data-notification="success inline" role="status">
        File uploaded successfully.
      </aside>
      <aside data-notification="warning inline" role="status">
        Storage is almost full.
      </aside>
      <aside data-notification="danger inline" role="alert">
        Upload failed.
      </aside>
      <CodeExample code={semanticNotificationsCode} />
    </DemoSection>

    <DemoSection id="notification-content" title="Content and close action">
      <aside data-notification="success inline" role="status">
        <button type="button" data-notification-close aria-label="Dismiss">
          <span aria-hidden="true">×</span>
        </button>
        <strong>Export ready.</strong>
        <p>Your report can be downloaded now.</p>
      </aside>
      <CodeExample code={contentNotificationCode} />
    </DemoSection>

    <DemoSection id="notification-positions" title="Fixed positions">
      <p>
        Combine one vertical token with one horizontal token. The default is top
        right. Center can stand alone or pair with top, right, bottom or left.
      </p>
      <CodeExample code={positionsCode} />
    </DemoSection>

    <DemoSection id="notification-shadow" title="Shadow">
      <aside data-notification="info inline" role="status">
        Default shadow
      </aside>
      <aside data-notification="info inline no-shadow" role="status">
        No shadow
      </aside>
      <CodeExample code={shadowCode} />
    </DemoSection>

    <DemoSection id="notification-composition" title="Composition">
      <p>
        Use short text for a single update. Add a <code>strong</code> heading
        and paragraph when the message needs context. Place an optional close
        button with <code>data-notification-close</code> as a direct child so
        the notification reserves space for it. Application behavior must remove
        the message when that button is activated.
      </p>
    </DemoSection>

    <DemoSection id="notification-responsive" title="Responsive behavior">
      <p>
        Fixed notifications stay within the viewport with a maximum width based
        on the page gap. Inline notifications use the available content width
        and remain in document flow. Prefer inline placement for persistent
        guidance or narrow layouts where fixed messages could cover controls.
      </p>
    </DemoSection>

    <DemoSection id="notification-accessibility" title="Accessibility">
      <p>
        Use <code>role="status"</code> for successful, informational and most
        warning updates. Reserve <code>role="alert"</code> for urgent failures
        that need immediate attention. Insert the live region when the message
        changes instead of rendering it long before the update. Give the close
        button an accessible name and mark its visual symbol
        <code> aria-hidden="true"</code>.
      </p>
    </DemoSection>

    <DemoSection id="notification-errors" title="Common mistakes">
      <ul>
        <li>
          Assigning <code>role="alert"</code> to every message interrupts screen
          reader users for routine updates.
        </li>
        <li>
          Choosing a danger tone does not add alert semantics. Set the role from
          urgency, not color.
        </li>
        <li>
          Positioning several fixed messages in the same corner can cover
          content unless the application manages a stack.
        </li>
        <li>
          A close icon without an accessible name leaves its action
          unidentified.
        </li>
      </ul>
    </DemoSection>

    <DemoSection id="notification-api" title="API">
      <ApiTable
        caption="Notification elements, attributes, states and tokens"
        rows={apiRows}
      />
    </DemoSection>
  </DocPage>
);
