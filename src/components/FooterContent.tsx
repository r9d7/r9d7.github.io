import dayjs from "dayjs";

export function FooterContent() {
  return (
    <p class="text-center text-sm uppercase text-muted-foreground font-medium">
      © {dayjs().year()} Radu Dascalu. All rights reserved. Have a nice day!
    </p>
  );
}
