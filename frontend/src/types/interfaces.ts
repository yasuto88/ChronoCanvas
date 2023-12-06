// src/types/diaryInterfaces.ts

export interface DiaryRatings {
  focusLevel: number;
  progressMeter: number;
  growthIndex: number;
  stressScale: number;
}

export interface DiaryEntry {
  entryId: string;
  title: string;
  content: string;
  entryDate: string;
  studyTime: number;
  tags: string[];
  ratings: DiaryRatings;
}

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
}

export interface Tag {
  tagId: string;
  name: string;
}

export interface Draft {
  draftId: string;
  title: string;
  content: string;
  entryDate: string;
  lastEdited: string;
  tags: string[];
}

export interface DiaryAppState {
  diaryEntries: DiaryEntry[];
  events: Event[];
  tags: Tag[];
  drafts: Draft[];
}
