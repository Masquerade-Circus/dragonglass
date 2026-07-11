type CodeExampleProps = {
  code: string;
};

const CodeExample = ({ code }: CodeExampleProps) => (
  <pre>
    <code>{code}</code>
  </pre>
);

export default CodeExample;
export { type CodeExampleProps };
