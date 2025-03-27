// This is using TypeScript to make sure that the props are correct
type Props = {
  title: string;
  description: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};
export function ContentLayout({ title, description, children, action }: Props) {
  return (
    <>
      <header className="mb-8 flex items-center justify-between">
        <div>
          {/* tracking tight decreases the letter spacing */}
          <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {action}
      </header>
      {children}
    </>
  );
}
