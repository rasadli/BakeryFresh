function getTeam() {
    fetch("https://localhost:44341/api/home/GetTeam").then(response => response.json()).then(data => {
        team_row.innerHTML = ""
        data.forEach(member => {
            team_row.innerHTML +=
                `
                    <div class="col mb-5">
                        <div class="team_member">
                            <div class="team_member_img">
                                <img src="${member.image}"
                                    alt="Team-Image">
                            </div>
                            <div class="team_member_content">
                                <span class="team_member_name">${member.firstName + " " + member.lastName}</span>
                                <span class="team_member_designation">${member.designationName}</span>
                            </div>
                            <ul class="team_member_social">
                                <li>
                                    <a href="${member.facebook}"><i class="fa-brands fa-facebook-f"></i></a>
                                </li>
                                <li>
                                    <a href="${member.twitter}"><i class="fa-brands fa-twitter"></i></a>
                                </li>
                                <li>
                                    <a href="${member.pinterest}"><i class="fa-brands fa-pinterest-p"></i></a>
                                </li>
                                <li>
                                    <a href="${member.instagram}"><i class="fa-brands fa-instagram"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                `
        })
    })
}
getTeam()