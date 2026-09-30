export interface DayHistoryItem {
  dateString: string; // 'YYYY-MM-DD'
  dayName: string; // 'LUN', 'MAR', etc.
  dayNumber: number; // 1-31
  monthName: string; // 'Sep', 'Oct', etc.
  isCompleted: boolean;
  isToday: boolean;
}

export interface Quote {
  id: number;
  text: string;
  author: string;
}

export interface StreakData {
  completedDates: string[]; // List of 'YYYY-MM-DD' strings
  bestStreak: number;
  lastQuoteId: number;
}
