export interface BREvent {
  id: string;
  name: string;
  date: string;
  display: string;
}

export const BR_EVENTS: BREvent[] = [
  { id: 'br1', name: 'Battle Royale 1', date: '2026-11-21', display: 'Nov 21, 2026' },
  { id: 'br2', name: 'Battle Royale 2', date: '2027-01-23', display: 'Jan 23, 2027' },
  { id: 'br3', name: 'Battle Royale 3', date: '2027-04-24', display: 'Apr 24, 2027' },
  { id: 'br4', name: 'Battle Royale 4', date: '2027-06-12', display: 'Jun 12, 2027' },
];

