const Layout = require("./layout");

module.exports = () => (
  <Layout>
    <h2>Lists</h2>
    <hr />
    <div>
      <h2>Simple list</h2>
      <hr />
      <ul>
        <li>Bryan Cranston</li>
        <li>Aaron Paul</li>
        <li>Bob Odenkirk</li>
      </ul>
      <h2>Data list</h2>
      <hr />
      <dl>
        <dt>
          <span>Bryan Cranston</span>
        </dt>
        <dt>
          <span>Aaron Paul</span>
        </dt>
        <dt>
          <span>Bob Odenkirk</span>
        </dt>
      </dl>

      <h2>List with avatar</h2>
      <hr />
      <dl>
        <dt>
          <i class="material-icons">person</i> Bryan Cranston
        </dt>
      </dl>

      <h2>List with icon</h2>
      <hr />
      <dl>
        <dt>
          <dd>Bryan Cranston</dd> <i class="material-icons">star</i>
        </dt>
      </dl>

      <h2>List with icon and info</h2>
      <hr />
      <dl>
        <dt>
          <dd>Bryan Cranston</dd>{" "}
          <dd>
            <small>Actor</small>
            <i class="material-icons">star</i>
          </dd>
        </dt>
      </dl>

      <h2>List with details</h2>
      <hr />
      <dl>
        <dt>
          <dd>
            Bryan Cranston <small>Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.</small>
          </dd>
        </dt>
      </dl>

      <h2>List with avatar and icon</h2>
      <hr />
      <dl>
        <dt>
          <dd>
            <i class="material-icons">person</i> Bryan Cranston
          </dd>{" "}
          <i class="material-icons">star</i>
        </dt>
      </dl>

      <h2>List with avatar, icon and info</h2>
      <hr />
      <dl>
        <dt>
          <dd>
            <i class="material-icons">person</i> Bryan Cranston
          </dd>{" "}
          <dd>
            <small>Actor</small>
            <i class="material-icons">star</i>
          </dd>
        </dt>
      </dl>

      <h2>List with details, avatar, icon and info</h2>
      <hr />
      <dl>
        <dt>
          <dd>
            <i class="material-icons">person</i>{" "}
            <span>
              Bryan Cranston <small>Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.</small>
            </span>
          </dd>
          <dd>
            <small>Actor</small>
            <i class="material-icons">star</i>
          </dd>
        </dt>
      </dl>
      <hr />
      <hr />
      <h2>List with actions</h2>
      <hr />
      <dl>
        <dt>
          <button>Bryan Cranston</button>
        </dt>
      </dl>

      <h2>List actions with avatar</h2>
      <hr />
      <dl>
        <dt>
          <button>
            <i class="material-icons">person</i> Bryan Cranston
          </button>
        </dt>
      </dl>

      <h2>List actions with secondary action</h2>
      <hr />
      <dl>
        <dt>
          <button>Bryan Cranston</button>{" "}
          <button>
            <i class="material-icons">star</i>
          </button>
        </dt>
      </dl>

      <h2>List actions with secondary action and info</h2>
      <hr />
      <dl>
        <dt>
          <button>Bryan Cranston</button>{" "}
          <button>
            <small>Actor</small>
            <i class="material-icons">star</i>
          </button>
        </dt>
      </dl>

      <h2>List actions with details</h2>
      <hr />
      <dl>
        <dt>
          <button>
            <span>
              Bryan Cranston <small>Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.</small>
            </span>
          </button>
        </dt>
      </dl>

      <h2>List actions with avatar and secondary action</h2>
      <hr />
      <dl>
        <dt>
          <button>
            <i class="material-icons">person</i> Bryan Cranston
          </button>{" "}
          <button>
            <i class="material-icons">star</i>
          </button>
        </dt>
      </dl>

      <h2>List actions with avatar, secondary action and info</h2>
      <hr />
      <dl>
        <dt>
          <button>
            <i class="material-icons">person</i> Bryan Cranston
          </button>{" "}
          <button>
            <small>Actor</small>
            <i class="material-icons">star</i>
          </button>
        </dt>
      </dl>

      <h2>List actions with details, avatar, secondary action and info</h2>
      <hr />
      <dl>
        <dt>
          <button>
            <i class="material-icons">person</i>
            <span>
              Bryan Cranston <small>Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.</small>
            </span>
          </button>{" "}
          <button>
            <small>Actor</small>
            <i class="material-icons">star</i>
          </button>
        </dt>
      </dl>

      <h2>Full example</h2>
      <hr />
      <dl>
        <dt>
          <button>
            <i class="material-icons bg-info">person</i>
            <p>
              Bryan Cranston
              <small>Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.</small>
            </p>
          </button>
          <button>
            <i class="material-icons">star</i>
          </button>
        </dt>
        <dt>
          <button>
            <i class="material-icons bg-primary">person</i>
            <p>
              Aaron Paul
              <small>Aaron Paul played the role of Jesse in Breaking Bad. He also featured in the "Need For Speed" Movie.</small>
            </p>
          </button>
          <a>
            <i class="material-icons">star</i>
          </a>
        </dt>
        <dt>
          <button>
            <i class="material-icons bg-success">person</i>
            <p>
              Bob Odenkirk
              <small>Bob Odinkrik played the role of Saul in Breaking Bad. Due to public fondness for the character, Bob stars in his own show now, called "Better Call Saul".</small>
            </p>
          </button>
          <button>
            <i class="material-icons">star</i>
          </button>
        </dt>
      </dl>
    </div>
  </Layout>
);
