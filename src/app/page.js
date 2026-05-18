import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-card">
            <h1>SSF Koottilangadi Sector Sahityotsav</h1>

            <p className="muted">
              Celebrate literature, art and culture. View live results,
              leaderboards, and the gallery.
            </p>

            <div className="quick-links">
              <a href="/results">View Results</a>
              <a href="/leaderboard">Leaderboard</a>
              <a href="/gallery">Gallery</a>
              <a href="/events">Events</a>
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: "420px" }}>
            <Image
              src="/images/main-poster.jpg"
              alt="poster"
              width={420}
              height={600}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
              }}
            />
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "36px 20px" }}>
        <div className="card">
          <h2>About</h2>

          <p>
            SSF Koottilangadi Sahityotsav is a celebration of arts and
            literature. This site provides live results and a media gallery
            maintained by our team.
          </p>
        </div>
      </div>
    </>
  );
}