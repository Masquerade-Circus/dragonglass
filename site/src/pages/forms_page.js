import Layout from './layout';

export default () => <Layout>
  <h2>Forms</h2>
  <hr/>
  <div>
    <form data-card>
      <section>
        <fieldset>
          <input type="text" placeholder="Label text" />
          <legend>Label text</legend>
          <small>This is a help-block</small>
        </fieldset>
        <fieldset>
          <input type="text" placeholder="Label text" value="Hola mundo" />
          <legend>Label text</legend>
          <small>This is a help-block</small>
        </fieldset>
        <fieldset class="has-warning">
          <input type="text" placeholder="Label text" value="Hola mundo" />
          <legend>Label text</legend>
          <small>This input has a warning</small>
        </fieldset>
        <fieldset class="has-success">
          <input type="text" placeholder="Label text" value="Hola mundo" />
          <legend>Label text</legend>
          <small>This input has success</small>
        </fieldset>
        <fieldset class="has-error">
          <input type="text" placeholder="Label text" value="Hola mundo" />
          <legend>Label text</legend>
          <small>This input has an error</small>
        </fieldset>
        <fieldset>
          <textarea placeholder="Label text" cols="6"></textarea>
          <legend>Label text</legend>
          <small>This is a help-block</small>
        </fieldset>
        <fieldset>
          <select placeholder="Label text">
            <option disabled value="">Select an element</option>
            <option>val 1</option>
            <option>val 2</option>
            <option>val 3</option>
            <option>val 4</option>
            <option>val 5</option>
          </select>
          <legend>Label text</legend>
          <small>This is a help-block</small>
        </fieldset>
        <fieldset>
          <select placeholder="Label text" multiple>
            <option disabled value="">Select an element</option>
            <option>val 1</option>
            <option>val 2</option>
            <option>val 3</option>
            <option>val 4</option>
            <option>val 5</option>
          </select>
          <legend>Label text</legend>
          <small>This is a help-block</small>
        </fieldset>
        <fieldset>
          <legend>Radio</legend>
          <input type="radio" name="radio-example" value="radio-example-1" id="radio-example-1" />
          <label for="radio-example-1">Radio 1</label>
          <input type="radio" name="radio-example" value="radio-example-2" id="radio-example-2" />
          <label for="radio-example-2">Radio 2</label>
        </fieldset>
        <fieldset>
          <legend>Checkbox</legend>
          <input type="checkbox" name="checkbox-example" value="checkbox-example" id="checkbox-example" />
          <label for="checkbox-example">Checkbox</label>
        </fieldset>
        <fieldset>
          <legend>Toggle</legend>
          <input type="checkbox" class="toggle" name="toggle-example" value="toggle-example-1" id="toggle-example-1" />
          <label for="toggle-example-1">Toggle</label>
        </fieldset>
      </section>
      <nav><input type="submit" /></nav>
    </form>
  </div>
</Layout>;
