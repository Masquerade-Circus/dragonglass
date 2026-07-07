import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Steppers</h2>
    <hr />

    <section aria-labelledby="stepper-basic-title">
      <h3 id="stepper-basic-title">Horizontal stepper</h3>
      <ol data-stepper>
        <li data-state="done">Account</li>
        <li aria-current="step">Billing</li>
        <li>Confirm</li>
      </ol>
    </section>

    <section aria-labelledby="stepper-error-title">
      <h3 id="stepper-error-title">Error state</h3>
      <ol data-stepper>
        <li data-state="done">Profile</li>
        <li data-state="error" aria-current="step">Payment</li>
        <li>Receipt</li>
      </ol>
    </section>

    <section aria-labelledby="stepper-vertical-title">
      <h3 id="stepper-vertical-title">Vertical stepper</h3>
      <ol data-stepper="vertical">
        <li data-state="done">Account</li>
        <li aria-current="step">Billing</li>
        <li>Confirm</li>
      </ol>
    </section>

    <section aria-labelledby="stepper-numbers-title">
      <h3 id="stepper-numbers-title">Numbers only</h3>
      <ol data-stepper="numbers">
        <li data-state="done">Account</li>
        <li aria-current="step">Billing</li>
        <li>Receipt</li>
      </ol>
    </section>

    <section data-card aria-labelledby="stepper-card-title">
      <section>
        <h3 id="stepper-card-title">Stepper inside a card</h3>
        <ol data-stepper>
          <li data-state="done">Draft</li>
          <li data-state="done">Review</li>
          <li aria-current="step">Publish</li>
        </ol>
      </section>
    </section>
  </Layout>
);
