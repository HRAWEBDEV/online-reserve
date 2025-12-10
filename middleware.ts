import { NextRequest, NextResponse } from "next/server";
import { locales } from "./app/localization/locales";

function middleware(request: NextRequest) {
  const pathWithSearch = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const pathSegments = request.nextUrl.pathname.split("/");
  if (request.nextUrl.pathname.includes(".")) return;
  if (pathSegments[1] == "api") return;
  // * localizing app
  const matchedLocale = Object.keys(locales).find(
    (locale) => locale == pathSegments[1],
  );
  const defaultLocale = "fa";
  const userLocale = request.cookies.get("locale")?.value || defaultLocale;
  if (!matchedLocale) {
    return NextResponse.redirect(
      new URL(`/${userLocale}/${pathWithSearch}`, request.url),
    );
  }
  if (
    request.nextUrl.pathname === `/${userLocale}` &&
    process.env.NEXT_PUBLIC_HOTELID
  ) {
    return NextResponse.redirect(
      new URL(`/${userLocale}/search/hotel`, request.url),
    );
  }
}

const config = {
  matcher: ["/((?!_next).*)"],
};

export { middleware, config };
