type DemoSectionProps = {
  id: string;
  title: string;
  children?: any;
};

const DemoSection = ({ id, title }: DemoSectionProps, ...children: any[]) => (
  <section aria-labelledby={id}>
    <h2 id={id}>{title}</h2>
    {children}
  </section>
);

export default DemoSection;
export { type DemoSectionProps };
