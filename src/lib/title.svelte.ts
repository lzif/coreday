let title = $state("");

export function getTitle(): string {
  return title;
}
export function setTitle(text: string) {
  title = text;
}
