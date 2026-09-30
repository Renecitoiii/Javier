import { DayHistoryItem } from '../types';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseISODate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0); // Noon to prevent timezone drift
}

export function calculateConsecutiveStreak(completedDates: string[]): {
  currentStreak: number;
  isStudiedToday: boolean;
  studiedYesterday: boolean;
} {
  const dateSet = new Set(completedDates);
  const todayStr = getTodayDateString();
  const isStudiedToday = dateSet.has(todayStr);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDateToISO(yesterday);
  const studiedYesterday = dateSet.has(yesterdayStr);

  let streak = 0;

  if (isStudiedToday) {
    streak = 1;
    // Walk backwards starting from yesterday
    let checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - 1);

    while (true) {
      const checkStr = formatDateToISO(checkDate);
      if (dateSet.has(checkStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  } else if (studiedYesterday) {
    // Hasn't studied today yet, but streak is preserved from yesterday!
    streak = 1;
    let checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - 2);

    while (true) {
      const checkStr = formatDateToISO(checkDate);
      if (dateSet.has(checkStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  } else {
    // Neither today nor yesterday studied
    streak = 0;
  }

  return {
    currentStreak: streak,
    isStudiedToday,
    studiedYesterday,
  };
}

export function calculateAllTimeBestStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;

  const sorted = Array.from(new Set(completedDates)).sort();
  let maxStreak = 1;
  let currentRun = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = parseISODate(sorted[i - 1]);
    const curr = parseISODate(sorted[i]);

    // Difference in days
    const diffTime = curr.getTime() - prev.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentRun++;
      if (currentRun > maxStreak) {
        maxStreak = currentRun;
      }
    } else if (diffDays > 1) {
      currentRun = 1;
    }
  }

  return maxStreak;
}

const SPANISH_DAYS = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
const SPANISH_MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export function getLast7Days(completedDates: string[]): DayHistoryItem[] {
  const dateSet = new Set(completedDates);
  const todayStr = getTodayDateString();
  const items: DayHistoryItem[] = [];

  // Generate 6 days ago up to today (7 days total)
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateString = formatDateToISO(d);

    items.push({
      dateString,
      dayName: SPANISH_DAYS[d.getDay()],
      dayNumber: d.getDate(),
      monthName: SPANISH_MONTHS[d.getMonth()],
      isCompleted: dateSet.has(dateString),
      isToday: dateString === todayStr,
    });
  }

  return items;
}
