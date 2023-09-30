function getEventDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event_id');

    event_detail.innerHTML = ""
    fetch(`https://localhost:44341/api/home/GetEventDetail/${eventId}`).then(response => response.json()).then(data => {
        event_detail.innerHTML = `
            <div class="blog_detail_img">
                <img src="${data.eventImg}" alt="Single-Blog">
             </div>
            <div class="blog_post-content">
                <ul class="blog_post_subtitle">
                    <li><a href="#">${data.tagName}</a></li>
                    <li>-</li>
                    <li><span>${data.eventDate}</span></li>
                </ul>
                <h2 class="blog_post_title">${data.eventHeading}</h2>
                <p class="about_middle_text">${data.eventDetail}</p>

                <div class="blog_detail_bottom">
                    <div class="col-auto">
                        <div class="blog_detail_tags">
                            <span class="label">Tags:</span>
                            <ul>
                                <li><a href="blog-details.html">${data.tagName}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="blog_detail_share">
                            <span class="label">Share:</span>
                            <div class="social">
                                <a href="https://www.facebook.com"><i class="fa-brands fa-facebook-f"></i></a>
                                <a href="https://www.instagram.com"><i class="fa-brands fa-twitter"></i></a>
                                <a href="https://www.twitter.com"><i class="fa-brands fa-pinterest-p"></i></a>
                                <a href="https://www.pinterest.com"><i class="fa-brands fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        `
    })

}
getEventDetail()