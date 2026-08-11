function SkeletonLine({ width, height, style }) {
  return <div className="skeleton" style={{ width, height, ...style }}></div>;
}

export function AdminRowSkeleton({ rows = 5 }) {
  return (
    <div className="admin-skeleton-rows">
      {Array.from({ length: rows }).map((_, i) => (
        <div className="glass-card admin-row admin-row-skeleton" key={i}>
          <div className="admin-row-main">
            <SkeletonLine width="45%" height="1rem" />
            <SkeletonLine width="25%" height="0.8rem" style={{ marginTop: '0.5rem' }} />
          </div>
          <div className="admin-row-actions">
            {[0, 1, 2, 3].map(j => (
              <div className="skeleton" key={j} style={{ width: '32px', height: '32px', borderRadius: '8px' }}></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminStatSkeleton({ cards = 7 }) {
  return (
    <div className="admin-stat-grid">
      {Array.from({ length: cards }).map((_, i) => (
        <div className="glass-card admin-stat-card admin-stat-skeleton" key={i}>
          <div className="skeleton" style={{ width: '42px', height: '42px', borderRadius: '12px' }}></div>
          <div className="admin-stat-info">
            <SkeletonLine width="60%" height="1.25rem" />
            <SkeletonLine width="40%" height="0.8rem" style={{ marginTop: '0.5rem' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminFormSkeleton({ lines = 5 }) {
  return (
    <div className="admin-skeleton-form">
      {Array.from({ length: lines }).map((_, i) => (
        <div className="admin-form-group" key={i}>
          <SkeletonLine width="30%" height="0.8rem" />
          <SkeletonLine width="100%" height="2.4rem" style={{ marginTop: '0.35rem' }} />
        </div>
      ))}
    </div>
  );
}
