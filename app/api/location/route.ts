export async function GET(req: Request) {
  try {
    // Try to parse real IP
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] ?? null;

    // If localhost, fallback to auto-detect
    const url = ip && ip !== "::1" && ip !== "127.0.0.1"
      ? `https://ipapi.co/${ip}/json/`
      : "https://ipapi.co/json/";

    const geoRes = await fetch(url);
    const geo = await geoRes.json();

    return Response.json({
      country: geo.country_name ?? "Unknown",
      countryCode: geo.country_code ?? "Unknown",
      ip: geo.ip ?? ip ?? "Unknown",
    });

  } catch (err) {
    return Response.json(
      { error: "Failed to detect location" },
      { status: 500 }
    );
  }
}
