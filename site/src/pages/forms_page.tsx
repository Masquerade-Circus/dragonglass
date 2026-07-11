import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Forms</h2>
    <hr />

    <form id="default-fields" data-card>
      <header>
        <h3>Default HTML fields</h3>
      </header>
      <section>
        <fieldset>
          <legend>Name</legend>
          <input type="text" placeholder="Ada Lovelace" />
          <small>Use a readable public name.</small>
        </fieldset>
        <fieldset>
          <legend>Email</legend>
          <input type="email" placeholder="ada@example.com" required />
          <small>Required email field with native validation.</small>
        </fieldset>
        <fieldset>
          <legend>Disabled field</legend>
          <input type="text" placeholder="Disabled" disabled />
          <small>Disabled fields keep their shape and reduce emphasis.</small>
        </fieldset>
        <fieldset>
          <legend>Invalid field</legend>
          <input type="text" value="Invalid value" aria-invalid="true" />
          <small>This field uses the aria-invalid attribute.</small>
        </fieldset>
        <fieldset>
          <legend>Message</legend>
          <textarea placeholder="Write a short message" />
          <small>Textarea grows vertically by default.</small>
        </fieldset>
        <fieldset>
          <legend>Role</legend>
          <select>
            <option disabled value="">
              Select an option
            </option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
          <small>Select keeps the same control rhythm.</small>
        </fieldset>
      </section>
      <footer>
        <nav aria-label="Default field actions">
          <button type="reset">Reset</button>
          <button type="submit" class="bg-primary">
            Submit
          </button>
        </nav>
      </footer>
    </form>

    <form id="floating-labels" data-card>
      <header>
        <h3>Floating labels</h3>
      </header>
      <section>
        <fieldset data-floating>
          <input type="text" placeholder="Label text" />
          <legend>Label text</legend>
          <small>This is a help-block</small>
        </fieldset>
        <fieldset data-floating>
          <input type="text" placeholder="Label text" />
          <legend>Label text</legend>
          <small>This field uses data-floating.</small>
        </fieldset>
        <fieldset data-floating>
          <input type="text" placeholder="Label text" value="Hola mundo" />
          <legend>Label text</legend>
          <small>This is a help-block</small>
        </fieldset>
        <fieldset data-floating data-field="warning">
          <input type="text" placeholder="Label text" value="Hola mundo" />
          <legend>Label text</legend>
          <small>This input has a warning</small>
        </fieldset>
        <fieldset data-floating data-field="success">
          <input type="text" placeholder="Label text" value="Hola mundo" />
          <legend>Label text</legend>
          <small>This input has success</small>
        </fieldset>
        <fieldset data-floating aria-invalid="true">
          <input type="text" placeholder="Label text" value="Hola mundo" />
          <legend>Label text</legend>
          <small>This input has an error</small>
        </fieldset>
        <fieldset data-floating>
          <textarea placeholder="Label text" cols="6" />
          <legend>Label text</legend>
          <small>This is a help-block</small>
        </fieldset>
        <fieldset data-floating>
          <select>
            <option disabled value="">
              Select an element
            </option>
            <option>val 1</option>
            <option>val 2</option>
            <option>val 3</option>
            <option>val 4</option>
            <option>val 5</option>
          </select>
          <legend>Label text</legend>
          <small>This is a help-block</small>
        </fieldset>
        <fieldset data-floating>
          <select multiple>
            <option disabled value="">
              Select an element
            </option>
            <option>val 1</option>
            <option>val 2</option>
            <option>val 3</option>
            <option>val 4</option>
            <option>val 5</option>
          </select>
          <legend>Label text</legend>
          <small>This is a help-block</small>
        </fieldset>
      </section>
    </form>

    <form id="selection-controls" data-card>
      <header>
        <h3>Selection controls</h3>
      </header>
      <section>
        <fieldset>
          <legend>Radio</legend>
          <input
            type="radio"
            name="radio-example"
            value="radio-example-1"
            id="radio-example-1"
          />
          <label for="radio-example-1">Radio 1</label>
          <input
            type="radio"
            name="radio-example"
            value="radio-example-2"
            id="radio-example-2"
          />
          <label for="radio-example-2">Radio 2</label>
        </fieldset>
        <fieldset>
          <legend>Checkbox</legend>
          <input
            type="checkbox"
            name="checkbox-example"
            value="checkbox-example"
            id="checkbox-example"
          />
          <label for="checkbox-example">Checkbox</label>
        </fieldset>
        <fieldset>
          <legend>Toggle</legend>
          <input
            type="checkbox"
            data-toggle
            name="toggle-example"
            value="toggle-example-1"
            id="toggle-example-1"
          />
          <label for="toggle-example-1">Toggle</label>
        </fieldset>
      </section>
    </form>

    <form id="sliders" data-card>
      <header>
        <h3>Sliders</h3>
      </header>
      <section>
        <fieldset>
          <legend>Volume</legend>
          <input type="range" min="0" max="100" value="60" />
        </fieldset>
        <fieldset>
          <legend>Disabled range</legend>
          <input type="range" min="0" max="100" value="20" disabled />
        </fieldset>
      </section>
    </form>

    <form id="native-pickers" data-card>
      <header>
        <h3>Native pickers</h3>
      </header>
      <section>
        <fieldset>
          <legend>Date</legend>
          <input type="date" />
        </fieldset>
        <fieldset>
          <legend>Time</legend>
          <input type="time" />
        </fieldset>
        <fieldset>
          <legend>Month</legend>
          <input type="month" />
        </fieldset>
        <fieldset>
          <legend>Week</legend>
          <input type="week" />
        </fieldset>
        <fieldset>
          <legend>Color</legend>
          <input type="color" value="#3366ff" />
        </fieldset>
        <fieldset>
          <legend>Native select</legend>
          <select>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </fieldset>
      </section>
    </form>

    <form id="colored-surfaces" data-card class="bg-primary">
      <header>
        <h3>Forms on colored surfaces</h3>
      </header>
      <section>
        <fieldset>
          <legend>Name</legend>
          <input type="text" placeholder="Ada Lovelace" />
          <small>Controls inherit the surrounding surface.</small>
        </fieldset>
        <fieldset data-floating>
          <input type="text" placeholder="Label text" />
          <legend>Floating label</legend>
          <small>Floating labels inherit the same surface.</small>
        </fieldset>
      </section>
      <footer>
        <nav aria-label="Colored surface actions">
          <button type="reset" class="text-white">
            Reset
          </button>
          <button type="submit" class="bg-white text-primary">
            Submit
          </button>
        </nav>
      </footer>
    </form>
  </Layout>
);
