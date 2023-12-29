export class Moderator {
    static moderate(text: string): string
    {
        if (text.includes('orange')) {
            return 'rejected'
        }

        return 'approved';
    }
}