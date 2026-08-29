const words = [
  'Burgers',
  'Shawarma',
  'Fresh Juices',
  'Platters',
  'Desserts',
  'Street Food',
  'Family Meals',
]

export default function Marquee() {
  const track = [...words, ...words]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((w, i) => (
          <span key={i}>
            <i>·</i> {w}
          </span>
        ))}
      </div>
    </div>
  )
}