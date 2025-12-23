export default function Footer() {
  return (
    <footer className="bg-neutral-200 text-primary-foreground">
      <div className="container py-2">
        <div className="flex justify-end">
          <a
            className="size-28"
            target="_blank"
            href={
              "https://trustseal.enamad.ir/?id=690246&Code=RY1LetjZRJ0stnxZfW88jXpYCEJbLtwj"
            }
          >
            <img
              referrerPolicy={"origin"}
              src={
                "https://trustseal.enamad.ir/logo.aspx?id=690246&Code=RY1LetjZRJ0stnxZfW88jXpYCEJbLtwj"
              }
              alt=""
              style={{ cursor: "pointer" }}
              // @ts-expect-error
              code="RY1LetjZRJ0stnxZfW88jXpYCEJbLtwj"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
