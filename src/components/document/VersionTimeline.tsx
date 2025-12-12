import React from 'react';
import VersionCard from './VersionCard';
import type { Version } from '../../types';

interface VersionTimelineProps {
  versions: Version[];
  onVersionSelect?: (version: Version) => void;
}

const VersionTimeline: React.FC<VersionTimelineProps> = ({
  versions,
  onVersionSelect,
}) => {
  const sortedVersions = [...versions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-2">
      {sortedVersions.map((version, index) => (
        <VersionCard
          key={version.version}
          version={version}
          isLatest={index === 0}
          onClick={() => onVersionSelect?.(version)}
        />
      ))}
    </div>
  );
};

export default VersionTimeline;
