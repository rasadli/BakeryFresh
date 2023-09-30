function getEvents() {
    fetch("https://localhost:44341/api/home/GetEvents").then(response => response.json()).then(data => {
        event_row.innerHTML = ""
        data.forEach(event => {
            event_row.innerHTML +=
                `
                <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div class="blog_post">
                        <a href="http://127.0.0.1:5500/pages/blog_details.html?event_id=${event.eventId}" class="blog_post_up">
                            <img src="${event.eventImg}" alt="Blog-Image">
                            <span class="blog_post_icon">
                                <svg width="30" height="30" viewBox="0 0 50 50" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.99 4.98c-1.924 0-3.197 1.352-3.92 2.567-.734 1.233-1.124 2.676-1.177 3.606-.102 1.85.175 3.47 1.098 4.64.96 1.22 2.4 1.687 4 1.687 1.622 0 3.057-.523 4.012-1.742.923-1.18 1.22-2.788 1.1-4.598-.057-.88-.452-2.315-1.185-3.553-.717-1.212-1.99-2.607-3.925-2.607h-.002zm-2.6 6.31c.026-.507.29-1.56.828-2.465.55-.92 1.163-1.345 1.775-1.345.598 0 1.213.43 1.775 1.377.543.925.813 1.983.843 2.446.097 1.5-.185 2.394-.575 2.894-.358.456-.963.783-2.045.783-1.125 0-1.705-.313-2.035-.735-.375-.475-.655-1.36-.568-2.955h.003zM12.5 20a5 5 0 00-5 5v15H6.25a1.25 1.25 0 000 2.5h37.5a1.25 1.25 0 000-2.5H42.5V25a5 5 0 00-5-5h-25zM40 40H10v-9.705l3.863 3.45a5.002 5.002 0 007.07-.405l2.2-2.475a2.502 2.502 0 013.737 0l2.197 2.475a5 5 0 007.073.407L40 30.296V40zm0-13.06l-5.528 4.942a2.5 2.5 0 01-3.535-.202l-2.2-2.475a5 5 0 00-7.474 0l-2.2 2.475a2.5 2.5 0 01-3.535.203L10 26.94V25a2.5 2.5 0 012.5-2.5h25A2.5 2.5 0 0140 25v1.94z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </a>
                        <div class="blog_post_content">
                            <ul class="blog_post_subtitle">
                                <li><a href="#">${event.tagName}</a></li>
                                <li>-</li>
                                <li><span>${event.eventDate}</span></li>
                            </ul>
                            <h3 class="blog_post_title">
                                <a href="">${event.eventHeading}</a>
                            </h3>
                            <a href="http://127.0.0.1:5500/pages/blog_details.html?event_id=${event.eventId}" class="blog_post_btn">
                                Read More 
                                <span class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 44 16">
                                        <path fill="currentColor" d="M43.707 8.707a1 1 0 0 0 0-1.414L37.343.929a1 1 0 1 0-1.414 1.414L41.586 8l-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM0 9h43V7H0v2z"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>            
            `
        })
    })
}
getEvents()