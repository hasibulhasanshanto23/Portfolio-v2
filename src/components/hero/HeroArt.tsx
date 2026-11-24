import { distanceKm } from "@/lib/utils";
import Globe from "./Globe";

const KM = distanceKm([23.81, 90.41], [33.26, 130.3]).toLocaleString("en-US");

/** Rotating globe (Bangladesh to Japan) with its caption. */
export default function HeroArt() {
  return (
    <div className="hero-art" data-parallax="-0.05">
      <figure className="globe" role="img" aria-label="A rotating globe with an arc of data travelling from Bangladesh to Japan">
        <Globe />
      </figure>
      <p className="globe-cap">
        <span>Bangladesh</span> <i aria-hidden="true">→</i> <span>Japan</span>
        <em>{KM} km apart · building, learning, connecting</em>
      </p>
    </div>
  );
}
