import HeroCopy from "./HeroCopy";
import HeroArt from "./HeroArt";

export default function Hero() {
  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-title">
      <HeroCopy />
      <HeroArt />
      <a className="scroll-cue" href="#about" aria-label="Scroll to About">
        <span aria-hidden="true" />
      </a>
    </section>
  );
}
