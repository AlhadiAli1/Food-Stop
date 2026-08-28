const words = ['Burgers', 'Shawarma', 'Fresh Juices', 'Platters', 'Desserts', 'Hookah', 'Family Meals']

export default function Marquee() {
  const track = [...words, ...words]
  return (
    <div className="marquee">
      <div className="marquee-track">
        {track.map((w, i) => (
          <span key={i}>
            {i % 2 === 0 ? <b>✦</b> : null} {w}
          </span>
        ))}
      </div>
    </div>
  )
}
