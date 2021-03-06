let svg = {
    logo: css => {
        return `
            <div class="${css}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 182">
                    <path d="M197.9 1.8h73.4v37.6h-9.2l-34.2 140.8h-68.6l-20.9-99h-2.3l-22 99H45.6L9.2 39.4H0V1.8h84.8v37.6h-8.7l8.9 58.5h2.3l21.8-96.1h66l20.2 96.1h2.3l8.9-58.5h-8.7V1.8z"/>
                    <path d="M278.6 180.2v-37.6H290V39.4h-11.5V1.8h137.1v59.4h-40.6V39.4h-20.9v38.1h34.6v26.1h-34.6v39h30v37.6H278.6z"/>
                    <path d="M423.5 142.6h11.5V39.6h-11.5V1.8h93.1c25.5 0 45.8 7 60.9 21C592.5 36.8 600 59.5 600 91c0 31.5-7.5 54.2-22.6 68.2 -15.1 14-35.3 21-60.9 21h-93.1V142.6zM512.4 142.6c5.2 0 9.1-1.4 11.7-4.1 2.6-2.8 3.9-7 3.9-12.8V56.4c0-11.3-5.2-17-15.6-17h-13.3v103.2H512.4z"/>
                </svg>
            </div>
        `
    },
    burger: css => {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <line class="${css}" x1="12.8" y1="20" x2="87.3" y2="20"/>
                <line class="${css}" x1="12.8" y1="50" x2="87.3" y2="50"/>
                <line class="${css}" x1="12.8" y1="80" x2="87.3" y2="80"/>
            </svg>
        `   
    },
    remove: css =>{
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <line class="${css}" x1="25" y1="25" x2="75" y2="75"/>
                <line class="${css}" x1="25" y1="75" x2="75" y2="25"/>
            </svg>    
        `
    },
    trash: css =>{
        return `
            <div class="${css}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 70">
                    <path d="M45.2 63.4c0 0.9-0.8 1.6-1.7 1.6h-32c-0.9 0-1.6-0.7-1.7-1.6L8 19.4C7.9 18 6.8 16.9 5.4 17S2.9 18.2 3 19.6l1.8 44C5 67.2 8 70 11.5 70h32c3.5 0 6.5-2.8 6.7-6.4l1.8-44c0.1-1.4-1-2.5-2.4-2.6 -1.4-0.1-2.5 1-2.6 2.4L45.2 63.4z"/>
                    <path d="M25.5 57.5c0 1.1 0.9 2 2 2s2-0.9 2-2v-34c0-1.1-0.9-2-2-2s-2 0.9-2 2V57.5z"/>
                    <path d="M15.5 57.6c0 1.1 1 2 2.1 1.9 1.1 0 2-1 1.9-2.1l-1-34c0-1.1-1-2-2.1-1.9 -1.1 0-2 1-1.9 2.1L15.5 57.6z"/>
                    <path d="M35.5 57.4c0 1.1 0.8 2 1.9 2.1 1.1 0 2-0.8 2.1-1.9l1-34c0-1.1-0.8-2-1.9-2.1 -1.1 0-2 0.8-2.1 1.9L35.5 57.4z"/>
                    <path d="M52.5 8.5H39.8l-1-3.3C38 2.2 35.1 0 32 0h-9c-3 0-6 2.2-6.9 5.2l-1 3.3H2.5C1.1 8.5 0 9.6 0 11s1.1 2.5 2.5 2.5h50c1.4 0 2.5-1.1 2.5-2.5S53.9 8.5 52.5 8.5zM20.4 8.5l0.6-2C21.2 5.8 22.2 5 23 5h9c0.8 0 1.8 0.8 2 1.5l0.6 2H20.4z"/>
                </svg>
            </div>
        `
    },
    checkout: (checkout="check-out", posStroke="stroke--ice", negStroke="stroke--cloud", fill="fill--ice") => {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <circle class="fill--cloud" cx="50" cy="50" r="50"/>
                <path class="${posStroke} ${checkout}" d="M16.3 25.3h8.2c0 0 4.5 23.9 6.1 31.8 0.6 3 0.8 9.3 8.2 9.3s32.5 0 32.5 0"/>
                <circle class="${fill}" cx="65.6" cy="77.6" r="6.9"/>
                <circle class="${fill}" cx="38.1" cy="77.6" r="6.9"/>
                <path class="fill--ice" d="M67 56.9H30.5l-3.4-24.7h51.4L71 54C70.4 55.7 68.8 56.9 67 56.9z"/>
                <circle class="fill--cloud" cx="65.7" cy="33.6" r="18"/>
                <circle class="${fill}" cx="65.7" cy="33.6" r="15"/>
                <polyline class="${negStroke} ${checkout}" points="57.4 33.6 63.1 39.3 74.1 28.3 "/>
            </svg>
        `
    },
    search: ()=>{
        return `
        <div class="ico ico--med ico--ice m-l-10 m-r-10 p-t-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.9 48">
                <path d="M46.9 41.3l-12-12c4.9-7.5 3.9-17.4-2.5-23.7C28.8 2 24.1 0 19 0S9.1 2 5.6 5.6C-1.9 13-1.9 25 5.6 32.4 9.1 36 13.9 38 19 38c3.7 0 7.2-1 10.3-3l12 12c0.7 0.7 1.5 1 2.5 1s1.8-0.4 2.5-1l0.7-0.7c0.7-0.7 1-1.5 1-2.5S47.6 41.9 46.9 41.3zM32 19c0 3.5-1.4 6.7-3.8 9.2S22.5 32 19 32c-3.5 0-6.7-1.4-9.2-3.8 -5.1-5.1-5.1-13.3 0-18.4C12.3 7.4 15.5 6 19 6c3.5 0 6.7 1.4 9.2 3.8C30.6 12.3 32 15.5 32 19z"/>
            </svg>
        </div>
        `
    },
    filter: () =>{
        return `
        <div class="ico ico--sm-med ico--ice filter-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <polygon points="22.3 0 215 315.8 215 430.1 296.9 512 296.9 315.8 489.7 0 "/>
            </svg>
        </div>
        `
    },
    plus: () => {
        return `
        <div class="ico ico--med ico--ice m-l-10 m-r-10 p-t-5" id="add">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">               
                <path d="M41.9 21H29V8.1c0-1.7-1.4-3-3-3h-2c-1.6 0-3 1.4-3 3V21H8.1c-1.7 0-3 1.4-3 3v2c0 1.6 1.4 3 3 3H21v12.9c0 1.7 1.4 3 3 3h2c1.7 0 3-1.4 3-3V29H42c1.7 0 3-1.4 3-3v-2C45 22.4 43.6 21 41.9 21z"/>
            </svg>
        </div>
        `
    }
}
