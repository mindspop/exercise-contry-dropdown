export default function cls(
  ...classNames: (string | boolean | undefined | null)[]
): string {
  return classNames.filter(Boolean).join(" ");
}
