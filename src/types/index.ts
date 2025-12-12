export interface Document {
  name: string;
  versions: Version[];
  created: string;
  last_updated: string;
}

export interface Version {
  version: number;
  timestamp: string;
  file_name: string;
  file_size: number;
  file_extension: string;
  modified: boolean;
  modification_detected?: boolean;
  diff_summary?: DiffSummary;
  path?: string;
}

export interface DiffSummary {
  type: 'text' | 'image';
  additions?: number;
  deletions?: number;
  total_changes?: number;
  changed_pixels?: number;
  total_pixels?: number;
  change_percentage?: number;
}

export interface Comparison {
  document_name: string;
  version_1: number;
  version_2: number;
  file_type: string;
  modifications_detected: boolean;
  comparison_type: 'text' | 'image';
  summary: DiffSummary;
}

export interface TextDiffResult {
  diff: string[];
  old_version: number;
  new_version: number;
  file_type: string;
  metrics: TextDiffMetrics;
  old_text_length: number;
  new_text_length: number;
  old_line_count: number;
  new_line_count: number;
}

export interface TextDiffMetrics {
  additions: number;
  deletions: number;
  total_changes: number;
  unchanged?: number;
  context_lines?: number;
  total_lines?: number;
  change_percentage?: number;
  severity?: string;
  added_characters?: number;
  removed_characters?: number;
  net_character_change?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Comment {
  id: string;
  version: number;
  user: string;
  text: string;
  timestamp: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  document: string;
  details?: string;
}

export interface Stats {
  total_documents: number;
  total_versions: number;
  total_size_mb: number;
  timestamp: string;
}
