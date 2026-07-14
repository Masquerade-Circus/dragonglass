import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const basicRowsExample = `<ul data-list>
  <li><span>Bryan Cranston</span></li>
</ul>

<ul data-list>
  <li>
    <span><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span>Bryan Cranston</span>
    <span aria-label="Favorite"><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span>Bryan Cranston</span>
    <span><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span><span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span></span>
  </li>
</ul>`;

const combinedRowsExample = `<ul data-list>
  <li>
    <span><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></span>
    <span aria-label="Favorite"><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></span>
    <span><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span>
      <i class="material-icons" aria-hidden="true">person</i>
      <span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span>
    </span>
    <span><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>`;

const actionRowsExample = `<ul data-list>
  <li><button type="button">Bryan Cranston</button></li>
</ul>

<ul data-list>
  <li>
    <button type="button"><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button">Bryan Cranston</button>
    <button type="button" aria-label="Add Bryan Cranston to favorites"><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button">Bryan Cranston</button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button"><span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button"><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></button>
    <button type="button" aria-label="Add Bryan Cranston to favorites"><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button"><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button">
      <i class="material-icons" aria-hidden="true">person</i>
      <span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>`;

const completeListExample = `<ul data-list>
  <li>
    <button type="button">
      <i class="material-icons bg-info" aria-hidden="true">person</i>
      <span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
  <li>
    <button type="button">
      <i class="material-icons bg-primary" aria-hidden="true">person</i>
      <span>Aaron Paul<small>Played Jesse Pinkman in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Aaron Paul to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
  <li>
    <button type="button">
      <i class="material-icons bg-success" aria-hidden="true">person</i>
      <span>Bob Odenkirk<small>Played Saul Goodman in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Bob Odenkirk to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>`;

const orderedListExample = `<ol data-list>
  <li><span>Create the project</span></li>
  <li><span>Invite the team</span></li>
  <li><span>Publish the first release</span></li>
</ol>`;

const definitionListExample = `<dl>
  <dt>Status</dt>
  <dd>Ready for review</dd>
  <dt>Owner</dt>
  <dd>Documentation team</dd>
</dl>`;

const listRows = [
  {
    name: "ul[data-list]",
    type: "Element and attribute",
    defaultValue: "Unordered",
    description: "Removes list markers and applies the application-row layout.",
  },
  {
    name: "ol[data-list]",
    type: "Element and attribute",
    defaultValue: "Numbered",
    description:
      "Generates numbered application rows with an internal counter.",
  },
  {
    name: "li",
    type: "Direct child",
    defaultValue: "Required per row",
    description:
      "Creates a row with a flexible primary region and an optional compact secondary region.",
  },
  {
    name: "dl > dt + dd",
    type: "Definition elements",
    defaultValue: "Term and detail",
    description: "Uses an intrinsic term column and a flexible detail column.",
  },
  {
    name: "a / button",
    type: "Interactive element",
    defaultValue: "Optional",
    description:
      "Fills the primary row region or stays compact as the second child.",
  },
];

export default () => (
  <DocPage page="Lists">
    <DemoSection id="list-basic" title="Basic combinations">
      <h3>Simple row</h3>
      <ul data-list>
        <li>
          <span>Bryan Cranston</span>
        </li>
      </ul>

      <h3>Avatar</h3>
      <ul data-list>
        <li>
          <span>
            <i class="material-icons" aria-hidden="true">
              person
            </i>
            <span>Bryan Cranston</span>
          </span>
        </li>
      </ul>

      <h3>Secondary icon</h3>
      <ul data-list>
        <li>
          <span>Bryan Cranston</span>
          <span aria-label="Favorite">
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </span>
        </li>
      </ul>

      <h3>Secondary icon and information</h3>
      <ul data-list>
        <li>
          <span>Bryan Cranston</span>
          <span>
            <small>Actor</small>
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </span>
        </li>
      </ul>

      <h3>Details</h3>
      <ul data-list>
        <li>
          <span>
            <span>
              Bryan Cranston
              <small>Played Walter White in Breaking Bad.</small>
            </span>
          </span>
        </li>
      </ul>
      <CodeExample code={basicRowsExample} />
    </DemoSection>

    <DemoSection id="list-combined" title="Combined display content">
      <h3>Avatar and secondary icon</h3>
      <ul data-list>
        <li>
          <span>
            <i class="material-icons" aria-hidden="true">
              person
            </i>
            <span>Bryan Cranston</span>
          </span>
          <span aria-label="Favorite">
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </span>
        </li>
      </ul>

      <h3>Avatar, secondary icon and information</h3>
      <ul data-list>
        <li>
          <span>
            <i class="material-icons" aria-hidden="true">
              person
            </i>
            <span>Bryan Cranston</span>
          </span>
          <span>
            <small>Actor</small>
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </span>
        </li>
      </ul>

      <h3>Details, avatar, secondary icon and information</h3>
      <ul data-list>
        <li>
          <span>
            <i class="material-icons" aria-hidden="true">
              person
            </i>
            <span>
              Bryan Cranston
              <small>Played Walter White in Breaking Bad.</small>
            </span>
          </span>
          <span>
            <small>Actor</small>
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </span>
        </li>
      </ul>
      <CodeExample code={combinedRowsExample} />
    </DemoSection>

    <DemoSection id="list-actions" title="Action combinations">
      <h3>Primary action</h3>
      <ul data-list>
        <li>
          <button type="button">Bryan Cranston</button>
        </li>
      </ul>

      <h3>Primary action with avatar</h3>
      <ul data-list>
        <li>
          <button type="button">
            <i class="material-icons" aria-hidden="true">
              person
            </i>
            <span>Bryan Cranston</span>
          </button>
        </li>
      </ul>

      <h3>Primary and secondary actions</h3>
      <ul data-list>
        <li>
          <button type="button">Bryan Cranston</button>
          <button type="button" aria-label="Add Bryan Cranston to favorites">
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </button>
        </li>
      </ul>

      <h3>Secondary action with information</h3>
      <ul data-list>
        <li>
          <button type="button">Bryan Cranston</button>
          <button
            type="button"
            aria-label="Add actor Bryan Cranston to favorites"
          >
            <small>Actor</small>
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </button>
        </li>
      </ul>

      <h3>Primary action with details</h3>
      <ul data-list>
        <li>
          <button type="button">
            <span>
              Bryan Cranston
              <small>Played Walter White in Breaking Bad.</small>
            </span>
          </button>
        </li>
      </ul>

      <h3>Avatar and secondary action</h3>
      <ul data-list>
        <li>
          <button type="button">
            <i class="material-icons" aria-hidden="true">
              person
            </i>
            <span>Bryan Cranston</span>
          </button>
          <button type="button" aria-label="Add Bryan Cranston to favorites">
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </button>
        </li>
      </ul>

      <h3>Avatar, secondary action and information</h3>
      <ul data-list>
        <li>
          <button type="button">
            <i class="material-icons" aria-hidden="true">
              person
            </i>
            <span>Bryan Cranston</span>
          </button>
          <button
            type="button"
            aria-label="Add actor Bryan Cranston to favorites"
          >
            <small>Actor</small>
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </button>
        </li>
      </ul>

      <h3>Details, avatar, secondary action and information</h3>
      <ul data-list>
        <li>
          <button type="button">
            <i class="material-icons" aria-hidden="true">
              person
            </i>
            <span>
              Bryan Cranston
              <small>Played Walter White in Breaking Bad.</small>
            </span>
          </button>
          <button
            type="button"
            aria-label="Add actor Bryan Cranston to favorites"
          >
            <small>Actor</small>
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </button>
        </li>
      </ul>
      <CodeExample code={actionRowsExample} />
    </DemoSection>

    <DemoSection id="list-complete" title="Complete list">
      <ul data-list>
        <li>
          <button type="button">
            <i class="material-icons bg-info" aria-hidden="true">
              person
            </i>
            <span>
              Bryan Cranston
              <small>Played Walter White in Breaking Bad.</small>
            </span>
          </button>
          <button
            type="button"
            aria-label="Add actor Bryan Cranston to favorites"
          >
            <small>Actor</small>
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </button>
        </li>
        <li>
          <button type="button">
            <i class="material-icons bg-primary" aria-hidden="true">
              person
            </i>
            <span>
              Aaron Paul
              <small>Played Jesse Pinkman in Breaking Bad.</small>
            </span>
          </button>
          <button type="button" aria-label="Add actor Aaron Paul to favorites">
            <small>Actor</small>
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </button>
        </li>
        <li>
          <button type="button">
            <i class="material-icons bg-success" aria-hidden="true">
              person
            </i>
            <span>
              Bob Odenkirk
              <small>Played Saul Goodman in Breaking Bad.</small>
            </span>
          </button>
          <button
            type="button"
            aria-label="Add actor Bob Odenkirk to favorites"
          >
            <small>Actor</small>
            <i class="material-icons" aria-hidden="true">
              star
            </i>
          </button>
        </li>
      </ul>
      <CodeExample code={completeListExample} />
    </DemoSection>

    <DemoSection id="list-ordered" title="Numbered list">
      <ol data-list>
        <li>
          <span>Create the project</span>
        </li>
        <li>
          <span>Invite the team</span>
        </li>
        <li>
          <span>Publish the first release</span>
        </li>
      </ol>
      <CodeExample code={orderedListExample} />
    </DemoSection>

    <DemoSection id="list-definitions" title="Definition list">
      <dl>
        <dt>Status</dt>
        <dd>Ready for review</dd>
        <dt>Owner</dt>
        <dd>Documentation team</dd>
      </dl>
      <CodeExample code={definitionListExample} />
    </DemoSection>

    <DemoSection id="list-api" title="API">
      <ApiTable caption="List elements and row regions" rows={listRows} />
    </DemoSection>
  </DocPage>
);
