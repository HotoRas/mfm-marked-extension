export namespace mfmFnToken {
    function parseTime(timeText: string): string {
        if(timeText.endsWith('s')) return timeText.replace('s', '');
        if(timeText.endsWith('m')) return (Number(timeText.replace('m', '')) * 60).toString();
        return '5';
    }
    
    export function tada(raw: string, style?: {[index: string]: string | boolean}): string {
        let speed: number; let delay: number | undefined;
        speed = style?.['speed'] && style['speed'] !== true 
            ? Number(parseTime(style['speed'])) : 5;

        return ``;
    }
};