let svg = {
   burger: function(style){
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <line class="${style}" x1="12.8" y1="20" x2="87.3" y2="20"/>
                <line class="${style}" x1="12.8" y1="50" x2="87.3" y2="50"/>
                <line class="${style}" x1="12.8" y1="80" x2="87.3" y2="80"/>
            </svg>
        `   
    },

}
