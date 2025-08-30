

export default function combineUnavailableTimes(unavailableTimes) {
    if (!Array.isArray(unavailableTimes) || unavailableTimes.length === 0) return [];

    const usesSnakeCase = Object.prototype.hasOwnProperty.call(unavailableTimes[0], 'start_time');
    const startKey = usesSnakeCase ? 'start_time' : 'startTime';
    const endKey = usesSnakeCase ? 'end_time' : 'endTime';

    const parseTimeToMinutes = (timeStr) => {
        if (!timeStr || typeof timeStr !== 'string') return null;
        const s = timeStr.trim().toLowerCase();
        const ampmMatch = s.match(/^\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*$/i);
        if (ampmMatch) {
            let hours = parseInt(ampmMatch[1], 10);
            const minutes = ampmMatch[2] ? parseInt(ampmMatch[2], 10) : 0;
            const suffix = ampmMatch[3];
            if (hours === 12) hours = 0;
            if (suffix === 'pm') hours += 12;
            return hours * 60 + minutes;
        }
        const twentyFourMatch = s.match(/^(\d{1,2}):(\d{2})$/);
        if (twentyFourMatch) {
            const hours = parseInt(twentyFourMatch[1], 10);
            const minutes = parseInt(twentyFourMatch[2], 10);
            return hours * 60 + minutes;
        }
        return null;
    };

    const minutesToHHMM = (minutes) => {
        const m = Math.max(0, Math.min(23 * 60 + 59, minutes));
        const hh = String(Math.floor(m / 60)).padStart(2, '0');
        const mm = String(m % 60).padStart(2, '0');
        return `${hh}:${mm}`;
    };

    const intervals = unavailableTimes
        .map((t) => {
            const start = parseTimeToMinutes(t[startKey]);
            const end = parseTimeToMinutes(t[endKey]);
            return start === null || end === null ? null : { start, end };
        })
        .filter(Boolean)
        .sort((a, b) => a.start - b.start);

    if (intervals.length === 0) return [];

    const merged = [];
    let current = { ...intervals[0] };

    for (let i = 1; i < intervals.length; i += 1) {
        const next = intervals[i];
        if (next.start <= current.end) {
            current.end = Math.max(current.end, next.end);
        } else {
            merged.push(current);
            current = { ...next };
        }
    }
    merged.push(current);

    return merged.map(({ start, end }) => ({
        [startKey]: minutesToHHMM(start),
        [endKey]: minutesToHHMM(end),
    }));
}