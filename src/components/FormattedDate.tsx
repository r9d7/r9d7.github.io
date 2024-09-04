export type FormattedDateProps = { date: Date };

export function FormattedDate(props: FormattedDateProps) {
  return (
    <time datetime={props.date.toISOString()}>
      {[
        props.date.toLocaleDateString("en-uk", {
          day: "numeric",
          month: "long",
        }),
        props.date.toLocaleDateString("en-uk", {
          year: "numeric",
        }),
      ].join(", ")}
    </time>
  );
}
