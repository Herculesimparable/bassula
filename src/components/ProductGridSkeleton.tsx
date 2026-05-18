interface Props {
  count?: number
}

export function ProductGridSkeleton({ count = 8 }: Props) {
  return (
    <div className="product-grid product-grid--skeleton" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="grid-card grid-card--skeleton">
          <div className="skeleton-block skeleton-block--img" />
          <div className="skeleton-block skeleton-block--title" />
          <div className="skeleton-block skeleton-block--price" />
          <div className="skeleton-block skeleton-block--btn" />
        </div>
      ))}
    </div>
  )
}
