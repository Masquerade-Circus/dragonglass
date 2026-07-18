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
  <p>Your report is ready to download.</p>
</aside>`;

const positionsCode = `<aside data-notification="info top right" role="status">Saved.</aside>
<aside data-notification="warning bottom center" role="status">Storage is almost full.</aside>
<aside data-notification="danger center left" role="alert">Connection lost.</aside>`;

const shadowCode = `<aside data-notification="info inline" role="status">Default shadow</aside>
<aside data-notification="info inline no-shadow" role="status">No shadow</aside>`;

const apiRows = [
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
      "Styles a direct close button and reserves its space without removing the notification.",
  },
  {
    name: "info|success|warning|danger",
    type: "Attribute token",
    defaultValue: "Primary",
    description: "Sets the semantic border color.",
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
    description: "Removes elevation.",
  },
  {
    name: "--notification-color",
    type: "Token",
    defaultValue: "--primary-accent",
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
        <p>Your report is ready to download.</p>
      </aside>
      <CodeExample code={contentNotificationCode} />
    </DemoSection>

    <DemoSection id="notification-positions" title="Fixed positions">
      <p>
        Combine one vertical token with one horizontal token. The default is top
        right. Center stands alone or pairs with top, right, bottom or left.
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
        A direct close button with <code>data-notification-close</code> receives
        absolute positioning and reserved space. The attribute provides the
        presentation and does not remove the notification.
      </p>
    </DemoSection>

    <DemoSection id="notification-responsive" title="Responsive behavior">
      <p>
        Fixed notifications stay within the viewport with a maximum width based
        on the page gap. Inline notifications use the available content width
        and remain in document flow.
      </p>
    </DemoSection>

    <DemoSection id="notification-api" title="API">
      <ApiTable
        caption="Notification elements, attributes, states and tokens"
        rows={apiRows}
      />
    </DemoSection>
  </DocPage>
);
