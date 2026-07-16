type CodeExampleProps = {
  code: string;
};

const CodeExample = ({ code }: CodeExampleProps) => (
  <pre data-markdown="include">
    <code>{code}</code>
  </pre>
);

export default CodeExample;
export { type CodeExampleProps };
