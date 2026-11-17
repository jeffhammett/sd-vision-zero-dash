import axios from 'axios';
import type { Article } from '../api/types';

// Re-exported so existing component imports keep working.
export type { Article };

const API_BASE_URL: string = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5083';

export async function fetchArticles(): Promise<Article[]> {
    const response = await axios.get<Article[]>(`${API_BASE_URL}/articles`);
    return response.data;
};

export function daysSinceLastFatality(articles: Article[]): number {
    // sort articles by date, descending
    const sortedArticles: Article[] = [...articles].sort((a: Article, b: Article) => {
        const dateA: number = new Date(a.date_posted).getTime();
        const dateB: number = new Date(b.date_posted).getTime();
        return dateB - dateA; // descending order (most recent first)
    });

    // get the number of days between the most recent article and today
    if (sortedArticles.length === 0) {
        return 0;
    }

    const mostRecentDate: Date = new Date(sortedArticles[0].date_posted);
    const today: Date = new Date();
    const diffInMilliseconds: number = today.getTime() - mostRecentDate.getTime();
    const diffInDays: number = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    // return that number
    return diffInDays;
}
