function fetchGitHubProfile() {
    const username = document.getElementById("githubUser").value;
    const profileTable = document.getElementById("profileTable");
    const profilePicture = document.getElementById("profilePicture");

    if (!username) {
        console.error("Please enter a GitHub username.");
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub user not found: ${username}`);
            }
            return response.json();
        })
        .then(data => {
            profileTable.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Blog</th>
                    <th>Created At</th>
                </tr>
                <tr>
                    <td>${data.name || "N/A"}</td>
                    <td><a href="${data.blog}" target="_blank">${data.blog || "N/A"}</a></td>
                    <td>${new Date(data.created_at).toLocaleDateString()}</td>
                </tr>
            `;

            profilePicture.innerHTML = `<img src="${data.avatar_url}" alt="Profile Picture" class="profile-img">`;
        })
        .catch(error => {
            console.error("Error fetching GitHub profile:", error);
        });
}
